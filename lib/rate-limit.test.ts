import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import {
  RATE_LIMITS,
  consume,
  evaluateWindow,
  resetLocalRateLimits,
  type RateLimitRule,
} from "./rate-limit.ts";

const RULE: RateLimitRule = { limit: 3, windowSeconds: 60 };
const NOW = 1_700_000_000_000;

describe("evaluateWindow", () => {
  test("allows up to the limit from empty", () => {
    let stamps: number[] = [];
    for (let i = 1; i <= RULE.limit; i++) {
      const d = evaluateWindow(stamps, NOW + i, RULE);
      assert.equal(d.allowed, true, `request ${i} should be allowed`);
      stamps = d.timestamps;
    }
    assert.equal(stamps.length, RULE.limit);
  });

  test("denies the one after the limit", () => {
    const stamps = [NOW - 3000, NOW - 2000, NOW - 1000];
    const d = evaluateWindow(stamps, NOW, RULE);
    assert.equal(d.allowed, false);
    assert.equal(d.remaining, 0);
    assert.ok(d.retryAfterSeconds > 0);
  });

  test("entries older than the window do not count", () => {
    const old = [NOW - 61_000, NOW - 62_000, NOW - 63_000];
    const d = evaluateWindow(old, NOW, RULE);
    assert.equal(d.allowed, true);
    assert.equal(d.timestamps.length, 1);
  });

  test("it slides: capacity returns gradually, not all at once", () => {
    const stamps = [NOW - 50_000, NOW - 30_000, NOW - 10_000];
    assert.equal(evaluateWindow(stamps, NOW, RULE).allowed, false);

    const later = NOW + 11_000;
    const d = evaluateWindow(stamps, later, RULE);
    assert.equal(d.allowed, true);
    assert.equal(d.remaining, 0, "one slot back, not three");
  });

  test("retryAfter points at when the oldest entry expires", () => {
    const stamps = [NOW - 20_000, NOW - 10_000, NOW - 5_000];
    assert.equal(evaluateWindow(stamps, NOW, RULE).retryAfterSeconds, 40);
  });

  test("retryAfter is never zero when denied", () => {
    const stamps = [NOW - 59_999, NOW - 100, NOW - 50];
    const d = evaluateWindow(stamps, NOW, RULE);
    assert.equal(d.allowed, false);
    assert.ok(d.retryAfterSeconds >= 1);
  });

  test("future timestamps are ignored rather than trusted", () => {
    const skewed = [NOW + 10_000, NOW + 20_000, NOW + 30_000];
    const d = evaluateWindow(skewed, NOW, RULE);
    assert.equal(d.allowed, true);
    assert.equal(d.timestamps.length, 1);
  });

  test("junk stored values cannot break the decision", () => {
    const junk = [NaN, Infinity, -Infinity] as number[];
    const d = evaluateWindow(junk, NOW, RULE);
    assert.equal(d.allowed, true);
    assert.deepEqual(d.timestamps, [NOW]);
  });
});

describe("consume, against the development fallback", () => {
  afterEach(() => resetLocalRateLimits());

  test("blocks after the configured number of form posts", async () => {
    const key = "198.51.100.7";
    const limit = RATE_LIMITS.form.limit;

    for (let i = 1; i <= limit; i++) {
      const r = await consume("form", key);
      assert.equal(r.allowed, true, `post ${i} of ${limit}`);
    }

    const blocked = await consume("form", key);
    assert.equal(blocked.allowed, false);
    assert.ok(blocked.retryAfterSeconds > 0);
  });

  test("separate keys do not share an allowance", async () => {
    for (let i = 0; i < RATE_LIMITS.form.limit; i++) {
      await consume("form", "203.0.113.1");
    }
    assert.equal((await consume("form", "203.0.113.1")).allowed, false);
    assert.equal((await consume("form", "203.0.113.2")).allowed, true);
  });

  test("capacity comes back once the window passes", async () => {
    const key = "198.51.100.13";
    const rule = RATE_LIMITS.form;
    const start = Date.now();

    for (let i = 0; i < rule.limit; i++) await consume("form", key, start);
    assert.equal((await consume("form", key, start)).allowed, false);

    const afterWindow = start + rule.windowSeconds * 1000 + 1;
    assert.equal((await consume("form", key, afterWindow)).allowed, true);
  });
});
