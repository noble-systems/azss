import { inquiry } from "../content/site.ts";

/**
 * Shared form validation.
 *
 * The exact same rules run in the browser (for instant, inline feedback) and
 * again in the API route, so a submitted payload is never trusted.
 */

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string>;

export type Rule = {
  field: string;
  label: string;
  required?: boolean;
  kind?: "text" | "email" | "phone" | "select";
  min?: number;
  max?: number;
  oneOf?: readonly string[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

export function validate(rules: readonly Rule[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const rule of rules) {
    const raw = values[rule.field] ?? "";
    const value = raw.trim();

    if (rule.required && !value) {
      const noun = rule.label.toLowerCase();
      const article = /^[aeiou]/.test(noun) ? "an" : "a";
      errors[rule.field] =
        rule.kind === "select"
          ? `Please choose ${article} ${noun}.`
          : `${rule.label} is required.`;
      continue;
    }

    if (!value) continue;

    if (rule.kind === "email" && !EMAIL_RE.test(value)) {
      errors[rule.field] = "Enter a valid email address.";
      continue;
    }

    if (rule.kind === "phone" && !PHONE_RE.test(value)) {
      errors[rule.field] = "Enter a valid phone number, or leave it blank.";
      continue;
    }

    if (rule.oneOf && !rule.oneOf.includes(value)) {
      errors[rule.field] = "Choose one of the listed options.";
      continue;
    }

    if (rule.min && value.length < rule.min) {
      errors[rule.field] =
        `Please add a little more detail (at least ${rule.min} characters).`;
      continue;
    }

    if (rule.max && value.length > rule.max) {
      errors[rule.field] =
        `${rule.label} is too long (max ${rule.max} characters).`;
    }
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/* The inquiry form                                                            */
/* -------------------------------------------------------------------------- */

export const EVENT_TYPES = inquiry.eventTypes;

export const INQUIRY_RULES: readonly Rule[] = [
  { field: "name", label: "Name", required: true, max: 120 },
  { field: "email", label: "Email", required: true, kind: "email", max: 200 },
  { field: "phone", label: "Phone", kind: "phone" },
  {
    field: "eventType",
    label: "event type",
    required: true,
    kind: "select",
    oneOf: EVENT_TYPES,
  },
  { field: "eventDate", label: "Date", max: 80 },
  { field: "location", label: "Location", max: 160 },
  { field: "message", label: "Message", required: true, min: 20, max: 2000 },
];
