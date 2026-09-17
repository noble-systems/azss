import {
  SESv2Client,
  SendEmailCommand,
  type SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";
import { brand, contact, notifications } from "../content/site.ts";
import { describeSource } from "./request-meta.ts";
import type { InquiryRecord } from "./types.ts";

/**
 * Transactional email via Amazon SES.
 *
 * Two messages go out when the form is submitted:
 *   1. an acknowledgement to the person who asked
 *   2. the inquiry itself, to the team
 *
 * Both are best-effort. `notifyInquiry` never throws and never blocks the API
 * response: a failed send must not lose the inquiry, which is already safely
 * written to DynamoDB by the time this runs.
 */

const region = () =>
  process.env.APP_AWS_REGION ?? process.env.AWS_REGION ?? "us-west-1";

/**
 * The From header, with a display name. A bare address leaves the client to
 * invent a sender name (Gmail uses the local part, so everything shows up as
 * "hello"). An env value that already carries a display name is left alone.
 */
const FROM = () => {
  const raw = process.env.SES_FROM_ADDRESS?.trim();
  if (!raw) return undefined;
  return raw.includes("<") ? raw : `${brand.name} <${raw}>`;
};

const CONFIG_SET = () => process.env.SES_CONFIGURATION_SET?.trim();

/**
 * Where replies to the acknowledgement land. These messages are automated; a
 * reply is almost always meant for a person, so it goes to the contact
 * address rather than a mailbox nobody reads.
 */
const REPLY_TO = () => process.env.SES_REPLY_TO?.trim() || contact.email;

/**
 * Internal recipients. The environment variable wins when set, so staging can
 * point at a test inbox; otherwise the defaults in content/site.ts apply.
 */
export function recipients(): string[] {
  const override = process.env.INQUIRY_NOTIFY_ADDRESS;
  const list =
    override !== undefined ? override.split(",") : [...notifications.inquiry];
  return list.map((address) => address.trim()).filter(Boolean);
}

/**
 * The physical address shown in every email footer. Commercial email rules
 * require one, so when it is missing the footer says so rather than quietly
 * omitting it and looking compliant.
 */
function postalLine(): string {
  return (
    contact.postalAddress ??
    `${brand.name}, ${brand.region} (postal address not yet configured)`
  );
}

export function siteUrl(): string {
  return (process.env.SITE_URL ?? brand.domain).replace(/\/+$/, "");
}

export type EmailStatus = {
  /** Acknowledgements are being sent to people who submit the form. */
  sender: boolean;
  /** Internal notifications are being sent. */
  team: boolean;
  /** Human-readable reason when something is off. */
  detail: string;
};

export function emailStatus(): EmailStatus {
  const from = FROM();
  const inboxes = recipients();

  if (!from) {
    return {
      sender: false,
      team: false,
      detail:
        "SES_FROM_ADDRESS is not set, so no email is sent. Inquiries are still recorded.",
    };
  }

  const team = inboxes.length > 0;
  return {
    sender: true,
    team,
    detail: team
      ? `Sending from ${from}. Inquiries go to ${inboxes.join(", ")}.`
      : `Sending from ${from}. No internal recipients are configured.`,
  };
}

let ses: SESv2Client | null = null;
function client(): SESv2Client {
  if (!ses) ses = new SESv2Client({ region: region() });
  return ses;
}

async function send(input: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const from = FROM();
  if (!from) return;

  const message: SendEmailCommandInput = {
    FromEmailAddress: from,
    Destination: { ToAddresses: input.to },
    ReplyToAddresses: input.replyTo ? [input.replyTo] : undefined,
    ConfigurationSetName: CONFIG_SET(),
    Content: {
      Simple: {
        Subject: { Data: input.subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: input.html, Charset: "UTF-8" },
          Text: { Data: input.text, Charset: "UTF-8" },
        },
      },
    },
  };

  await client().send(new SendEmailCommand(message));
}

/* -------------------------------------------------------------------------- */
/* Templates                                                                   */
/* -------------------------------------------------------------------------- */

const BONE = "#f4ede2";
const INK = "#191713";
const MUTED = "#6b6355";
const SUN = "#e2a233";
const NIGHT = "#0b0a09";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function factRows(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(25,23,19,0.10);font:500 11px/1.3 Helvetica,Arial,sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(25,23,19,0.10);font:400 15px/1.4 Helvetica,Arial,sans-serif;color:${INK};text-align:right;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
}

/**
 * Table-based, inline-styled layout with a plain-text alternative, the
 * lowest-common-denominator that renders correctly in Outlook and Gmail alike.
 * No webfonts.
 */
function shell(options: {
  preheader: string;
  heading: string;
  body: string;
  footer: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(options.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${BONE};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(options.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BONE};padding:24px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">
      <tr>
        <td style="background:${NIGHT};padding:18px 22px;border-radius:10px 10px 0 0;">
          <img src="${siteUrl()}/media/logo.png" width="44" height="44" alt="${escapeHtml(brand.name)}" style="display:block;height:44px;width:44px;border:0;border-radius:6px;" />
        </td>
      </tr>
      <tr>
        <td style="height:3px;background:${SUN};"></td>
      </tr>
      <tr>
        <td style="height:20px;"></td>
      </tr>
      <tr>
        <td style="padding:0 0 4px;">
          <h1 style="margin:0 0 16px;font:600 22px/1.3 Helvetica,Arial,sans-serif;letter-spacing:-0.01em;color:${INK};">${escapeHtml(options.heading)}</h1>
          ${options.body}
        </td>
      </tr>
      <tr>
        <td style="padding:24px 0 0;font:400 12px/1.6 Helvetica,Arial,sans-serif;color:${MUTED};">
          ${options.footer}
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function facts(record: InquiryRecord): Array<[string, string]> {
  return [
    ["Event", record.eventType || "Not given"],
    ["Date", record.eventDate || "Not given"],
    ["Location", record.location || "Not given"],
  ];
}

/** The acknowledgement to the person who asked for a quote. */
export function renderSenderEmail(record: InquiryRecord) {
  const firstName = record.name.trim().split(/\s+/)[0] || "there";

  const body = `
    <p style="margin:0 0 16px;font:400 16px/1.65 Helvetica,Arial,sans-serif;color:${INK};">Thanks ${escapeHtml(firstName)}, your message reached us.</p>
    <p style="margin:0 0 26px;font:400 16px/1.65 Helvetica,Arial,sans-serif;color:${MUTED};">A real person reads every inquiry and replies with a quote and any questions about the site, usually the same day. If it's urgent, call ${escapeHtml(contact.phone)}.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(25,23,19,0.10);">
      ${factRows(facts(record))}
    </table>`;

  const footer = `
    <p style="margin:0 0 8px;">${escapeHtml(postalLine())}</p>
    <p style="margin:0;">You're getting this because you asked ${escapeHtml(brand.name)} for a quote. Reply to this email to reach us.</p>`;

  const text = [
    `Thanks ${firstName}, your message reached us.`,
    "",
    `A real person reads every inquiry and replies with a quote, usually the same day. If it's urgent, call ${contact.phone}.`,
    "",
    ...facts(record).map(([label, value]) => `${label}: ${value}`),
    "",
    siteUrl(),
    "",
    postalLine(),
  ].join("\n");

  return {
    subject: `Your quote request to ${brand.shortName}`,
    html: shell({
      preheader: "We have your request and will come back with a quote.",
      heading: "Message received.",
      body,
      footer,
    }),
    text,
  };
}

/** The inquiry itself, forwarded to the team. */
export function renderTeamEmail(record: InquiryRecord, total: number) {
  const rows: Array<[string, string]> = [
    ["Name", record.name || "Not given"],
    ["Email", record.email],
    ["Phone", record.phone || "Not given"],
    ...facts(record),
    ["Source", describeSource(record.meta)],
    ["Inquiries so far", String(total)],
  ];

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(25,23,19,0.10);">
      ${factRows(rows)}
    </table>
    ${
      record.message
        ? `<div style="margin:24px 0 0;padding:18px 20px;background:rgba(25,23,19,0.04);border-radius:14px;">
             <p style="margin:0 0 8px;font:500 11px/1.3 Helvetica,Arial,sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};">Their message</p>
             <p style="margin:0;font:400 15px/1.6 Helvetica,Arial,sans-serif;color:${INK};white-space:pre-wrap;">${escapeHtml(record.message)}</p>
           </div>`
        : ""
    }
    <p style="margin:26px 0 0;">
      <a href="mailto:${escapeHtml(record.email)}" style="display:inline-block;background:${INK};color:${BONE};text-decoration:none;font:500 15px/1 Helvetica,Arial,sans-serif;padding:14px 24px;border-radius:999px;">Reply to ${escapeHtml(record.name || record.email)}</a>
    </p>`;

  const text = [
    `New quote request, ${record.eventType || "type not given"}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    record.message ? `Their message:\n${record.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Quote request, ${record.name || record.email}${record.eventType ? `, ${record.eventType}` : ""}`,
    html: shell({
      preheader: `${record.name || record.email} asked for a quote. ${total} total.`,
      heading: "New quote request.",
      body,
      footer: `<p style="margin:0;">Sent to the ${escapeHtml(brand.shortName)} team. Recipients are set in content/site.ts under <code>notifications.inquiry</code>, or via INQUIRY_NOTIFY_ADDRESS. Hit reply to answer them directly.</p>`,
    }),
    text,
  };
}

/* -------------------------------------------------------------------------- */

async function trySend(
  label: string,
  to: string[],
  message: { subject: string; html: string; text: string },
  replyTo?: string,
): Promise<void> {
  if (to.length === 0) return;
  try {
    await send({ to, ...message, replyTo });
  } catch (error) {
    console.error(`[azss] ${label} email failed`, error);
  }
}

/**
 * Fire-and-forget. Every path swallows its errors and logs them; each send is
 * isolated so one failure never prevents the other.
 */
export async function notifyInquiry(
  record: InquiryRecord,
  total: number,
): Promise<void> {
  await trySend(
    "acknowledgement",
    [record.email],
    renderSenderEmail(record),
    REPLY_TO(),
  );
  await trySend(
    "team notification",
    recipients(),
    renderTeamEmail(record, total),
    // Replying to the notification replies to the person who asked.
    record.email,
  );
}
