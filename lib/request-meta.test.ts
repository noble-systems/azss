import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  buildRequestMeta,
  clientIp,
  describeSource,
  parseCampaign,
  parseUserAgent,
} from "./request-meta.ts";

const h = (init: Record<string, string>) => new Headers(init);

describe("clientIp", () => {
  test("takes the first entry of x-forwarded-for", () => {
    assert.equal(
      clientIp(
        h({ "x-forwarded-for": "203.0.113.7, 70.41.3.18, 150.172.238.178" }),
      ),
      "203.0.113.7",
    );
  });

  test("strips a port but leaves bare IPv6 alone", () => {
    assert.equal(
      clientIp(h({ "x-forwarded-for": "203.0.113.7:54321" })),
      "203.0.113.7",
    );
    assert.equal(
      clientIp(h({ "x-forwarded-for": "2001:db8:85a3::8a2e:370:7334" })),
      "2001:db8:85a3::8a2e:370:7334",
    );
  });

  test("unwraps bracketed IPv6 with a port", () => {
    assert.equal(
      clientIp(h({ "x-forwarded-for": "[2001:db8::1]:443" })),
      "2001:db8::1",
    );
  });

  test("falls back through the other headers", () => {
    assert.equal(clientIp(h({ "x-real-ip": "198.51.100.4" })), "198.51.100.4");
    assert.equal(
      clientIp(h({ "cloudfront-viewer-address": "198.51.100.9:1234" })),
      "198.51.100.9",
    );
  });

  test("returns undefined when there is nothing to read", () => {
    assert.equal(clientIp(h({})), undefined);
    assert.equal(clientIp(h({ "x-forwarded-for": "   " })), undefined);
  });

  test("caps absurdly long values", () => {
    const ip = clientIp(h({ "x-forwarded-for": "9".repeat(500) }));
    assert.ok(ip && ip.length <= 45);
  });
});

describe("parseUserAgent", () => {
  const cases: Array<[string, string, string, string, string]> = [
    [
      "iPhone Safari",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
      "Safari 17",
      "iOS",
      "Phone",
    ],
    [
      "Android Chrome",
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
      "Chrome 126",
      "Android 14",
      "Phone",
    ],
    [
      "Windows Edge",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
      "Edge 126",
      "Windows",
      "Desktop",
    ],
    [
      "Googlebot",
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Bot",
      "Unknown",
      "Bot",
    ],
  ];

  for (const [label, ua, browser, os, device] of cases) {
    test(label, () => {
      assert.deepEqual(parseUserAgent(ua), { browser, os, device });
    });
  }

  test("empty input is Unknown across the board", () => {
    assert.deepEqual(parseUserAgent(undefined), {
      browser: "Unknown",
      os: "Unknown",
      device: "Unknown",
    });
  });
});

describe("parseCampaign", () => {
  test("reads utm tags from the page query string", () => {
    assert.deepEqual(
      parseCampaign("/?utm_source=instagram&utm_medium=bio&utm_campaign=launch"),
      { utmSource: "instagram", utmMedium: "bio", utmCampaign: "launch" },
    );
  });

  test("a page with no query yields nothing", () => {
    assert.deepEqual(parseCampaign("/"), {});
    assert.deepEqual(parseCampaign(undefined), {});
  });
});

describe("buildRequestMeta", () => {
  test("strips control characters and drops empty keys", () => {
    const meta = buildRequestMeta(
      h({
        "user-agent": "Mozilla/5.0 (Windows NT 10.0) Firefox/127.0",
        "x-forwarded-for": "203.0.113.7",
      }),
      { page: "/?utm_source=poster", referrer: 42 },
    );
    assert.equal(meta.ip, "203.0.113.7");
    assert.equal(meta.page, "/?utm_source=poster");
    assert.equal(meta.utmSource, "poster");
    assert.equal(meta.browser, "Firefox 127");
    assert.equal("referrer" in meta, false);
    assert.equal("country" in meta, false);
  });
});

describe("describeSource", () => {
  test("prefers the campaign, then the referrer host, then Direct", () => {
    assert.equal(
      describeSource({ utmSource: "ig", utmCampaign: "may" }),
      "ig / may",
    );
    assert.equal(
      describeSource({ referrer: "https://www.ra.co/events/1" }),
      "ra.co",
    );
    assert.equal(describeSource({}), "Direct");
    assert.equal(describeSource(undefined), "Unknown");
  });
});
