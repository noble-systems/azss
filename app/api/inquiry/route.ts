import { NextResponse } from "next/server";
import { notifyInquiry } from "@/lib/email";
import { consume } from "@/lib/rate-limit";
import { buildRequestMeta, clientIp } from "@/lib/request-meta";
import { listInquiries, recordInquiry } from "@/lib/store";
import { INQUIRY_RULES, validate, type FormValues } from "@/lib/validation";

/**
 * POST /api/inquiry
 *
 * The contact form. The payload is re-validated here with the same rules the
 * browser used, so a crafted request can't bypass the client, then written to
 * DynamoDB, then emailed.
 */

type Payload = {
  values?: unknown;
  /** Page and referrer as seen by the browser. Untrusted; sanitised on read. */
  context?: { page?: unknown; referrer?: unknown };
};

export async function POST(request: Request) {
  const ip = clientIp(request.headers) ?? "unknown";

  const throttle = await consume("form", ip);
  if (!throttle.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "That's a lot of messages. Give it a few minutes and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(throttle.retryAfterSeconds) },
      },
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't read that. Please try again." },
      { status: 400 },
    );
  }

  const { values, context } = payload;

  if (typeof values !== "object" || values === null) {
    return NextResponse.json(
      { ok: false, message: "That submission looked malformed. Please try again." },
      { status: 400 },
    );
  }

  const raw = values as Record<string, unknown>;

  // Honeypot: real people never fill this in. Answer as if it worked so a bot
  // learns nothing.
  if (typeof raw.companyWebsite === "string" && raw.companyWebsite.trim()) {
    return NextResponse.json({ ok: true });
  }

  const clean: FormValues = {};
  for (const rule of INQUIRY_RULES) {
    const value = raw[rule.field];
    clean[rule.field] = typeof value === "string" ? value.trim() : "";
  }

  const errors = validate(INQUIRY_RULES, clean);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        errors,
        message: "Please check the highlighted fields and try again.",
      },
      { status: 400 },
    );
  }

  let record;
  try {
    const meta = buildRequestMeta(request.headers, context ?? {});
    record = await recordInquiry(clean, meta);
  } catch (error) {
    console.error("[azss] could not save inquiry", error);
    return NextResponse.json(
      {
        ok: false,
        message: "We couldn't save that just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  // Email is best-effort and deliberately after the write: the inquiry is
  // already safe, so a bounced or misconfigured send must never fail the
  // request.
  try {
    const total = (await listInquiries()).length;
    await notifyInquiry(record, total);
  } catch (error) {
    console.error("[azss] notification step failed", error);
  }

  return NextResponse.json({ ok: true });
}
