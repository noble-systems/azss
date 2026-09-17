import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { contact } from "../content/site.ts";
import {
  emailStatus,
  escapeHtml,
  recipients,
  renderSenderEmail,
  renderTeamEmail,
} from "./email.ts";
import type { InquiryRecord } from "./types.ts";

const record: InquiryRecord = {
  pk: "inquiry#x",
  type: "inquiry",
  email: "alex@example.com",
  name: "Alex Moreno",
  phone: "(602) 555-0142",
  eventType: "Warehouse or after-hours",
  eventDate: "14 March",
  location: "Downtown Phoenix",
  message: "About 300 people, <b>no house power</b> on site.",
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
};

describe("acknowledgement", () => {
  test("carries the physical postal address in both parts", () => {
    const { html, text } = renderSenderEmail(record);
    const address = contact.postalAddress as string;
    assert.ok(address, "no postal address configured");
    assert.ok(html.includes(address));
    assert.ok(text.includes(address));
  });

  test("names the phone number so an urgent request has a route", () => {
    const { html, text } = renderSenderEmail(record);
    assert.ok(html.includes(contact.phone));
    assert.ok(text.includes(contact.phone));
  });

  test("greets by first name", () => {
    assert.match(renderSenderEmail(record).text, /^Thanks Alex,/);
  });
});

describe("team notification", () => {
  test("escapes the message so a form field can never inject markup", () => {
    const { html } = renderTeamEmail(record, 3);
    assert.ok(!html.includes("<b>no house power</b>"));
    assert.ok(html.includes("&lt;b&gt;no house power&lt;/b&gt;"));
  });

  test("includes every field and the running total", () => {
    const { text } = renderTeamEmail(record, 3);
    for (const needle of [
      "Alex Moreno",
      "alex@example.com",
      "(602) 555-0142",
      "Warehouse or after-hours",
      "14 March",
      "Downtown Phoenix",
      "Inquiries so far: 3",
    ]) {
      assert.ok(text.includes(needle), `missing ${needle}`);
    }
  });

  test("subject leads with the sender so the inbox reads at a glance", () => {
    assert.equal(
      renderTeamEmail(record, 1).subject,
      "Quote request, Alex Moreno, Warehouse or after-hours",
    );
  });
});

describe("configuration", () => {
  test("no from address means nothing sends and the reason says so", () => {
    delete process.env.SES_FROM_ADDRESS;
    const status = emailStatus();
    assert.equal(status.sender, false);
    assert.equal(status.team, false);
    assert.match(status.detail, /SES_FROM_ADDRESS/);
  });

  test("the notify override replaces the defaults, and empty means nobody", () => {
    process.env.INQUIRY_NOTIFY_ADDRESS = " a@example.com , b@example.com ";
    assert.deepEqual(recipients(), ["a@example.com", "b@example.com"]);
    process.env.INQUIRY_NOTIFY_ADDRESS = "";
    assert.deepEqual(recipients(), []);
    delete process.env.INQUIRY_NOTIFY_ADDRESS;
    assert.deepEqual(recipients(), [contact.email]);
  });
});

describe("escapeHtml", () => {
  test("escapes the four characters that matter", () => {
    assert.equal(
      escapeHtml(`<a href="x">&</a>`),
      "&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;",
    );
  });
});
