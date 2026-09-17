import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { EVENT_TYPES, INQUIRY_RULES, validate } from "./validation.ts";

const good = {
  name: "Alex Moreno",
  email: "alex@example.com",
  phone: "(602) 555-0142",
  eventType: EVENT_TYPES[0],
  eventDate: "Saturday 14 March",
  location: "A warehouse in downtown Phoenix",
  message: "About 300 people, indoors, no house power on site.",
};

describe("validate", () => {
  test("flags every missing required field", () => {
    const errors = validate(INQUIRY_RULES, {});
    assert.deepEqual(Object.keys(errors).sort(), [
      "email",
      "eventType",
      "message",
      "name",
    ]);
  });

  test("passes a complete, well-formed submission", () => {
    assert.deepEqual(validate(INQUIRY_RULES, good), {});
  });

  test("phone is optional but must look like a number when given", () => {
    assert.deepEqual(validate(INQUIRY_RULES, { ...good, phone: "" }), {});
    assert.ok(validate(INQUIRY_RULES, { ...good, phone: "call me" }).phone);
  });

  test("rejects a malformed email", () => {
    assert.ok(validate(INQUIRY_RULES, { ...good, email: "not-an-email" }).email);
  });

  test("the event type must be one of the listed options", () => {
    assert.ok(validate(INQUIRY_RULES, { ...good, eventType: "Wedding" }).eventType);
  });

  test("a message that is too short is sent back for more", () => {
    const errors = validate(INQUIRY_RULES, { ...good, message: "hi" });
    assert.match(errors.message, /at least 20/);
  });

  test("caps runaway lengths", () => {
    const errors = validate(INQUIRY_RULES, { ...good, name: "a".repeat(121) });
    assert.match(errors.name, /too long/);
  });

  test("trims before it checks, so whitespace is not content", () => {
    const errors = validate(INQUIRY_RULES, { ...good, name: "   " });
    assert.equal(errors.name, "Name is required.");
  });
});
