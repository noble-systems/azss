import { randomUUID } from "node:crypto";
import { LEGAL_VERSION } from "@/content/site";
import type { RequestMeta } from "@/lib/request-meta";
import type { InquiryRecord } from "@/lib/types";
import { dynamoStore } from "./dynamo";
import { localStore } from "./local";
import type { Store } from "./types";

/**
 * Driver selection
 * ----------------
 *   DynamoDB  when SUBMISSIONS_TABLE is set (deployed)
 *   local     otherwise, in development only
 *
 * In production without the variable we throw a clear error rather than
 * silently writing to a filesystem that Lambda will discard.
 */
export function store(): Store {
  if (process.env.SUBMISSIONS_TABLE) return dynamoStore;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SUBMISSIONS_TABLE is not set. Deploy infra/azss-infra.yaml and add the outputs to the Amplify environment variables.",
    );
  }

  return localStore;
}

export function storeKind(): "dynamodb" | "local" | "unconfigured" {
  try {
    return store().kind;
  } catch {
    return "unconfigured";
  }
}

export async function recordInquiry(
  values: Record<string, string>,
  meta?: RequestMeta,
): Promise<InquiryRecord> {
  const now = new Date().toISOString();

  const record: InquiryRecord = {
    pk: `inquiry#${randomUUID()}`,
    type: "inquiry",
    email: (values.email ?? "").trim().toLowerCase(),
    name: values.name ?? "",
    phone: values.phone || undefined,
    eventType: values.eventType || undefined,
    eventDate: values.eventDate || undefined,
    location: values.location || undefined,
    message: values.message || undefined,
    termsVersion: LEGAL_VERSION,
    createdAt: now,
    updatedAt: now,
    meta,
  };

  return store().putInquiry(record);
}

export async function listInquiries(): Promise<InquiryRecord[]> {
  return store().listInquiries();
}
