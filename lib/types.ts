import type { RequestMeta } from "./request-meta.ts";

/**
 * The one record this site stores: a quote request from the contact form.
 */
export type InquiryRecord = {
  /** `inquiry#<uuid>`. Every submission is kept; nothing is deduplicated. */
  pk: string;
  type: "inquiry";
  email: string;
  name: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  /** Version of the privacy policy live at submit time. */
  termsVersion?: string;
  /** IP, device and campaign captured at submit time. See lib/request-meta.ts. */
  meta?: RequestMeta;
};
