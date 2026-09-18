"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/site";
import { EVENT_TYPES, INQUIRY_RULES } from "@/lib/validation";
import {
  Field,
  FormAlert,
  FormSuccess,
  Honeypot,
  Select,
  Spinner,
  TextArea,
  TextInput,
} from "./Fields";
import { useForm } from "./useForm";

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  message: "",
};

export function InquiryForm() {
  const [trap, setTrap] = useState("");
  const { values, errors, status, errorMessage, setField, reset, handleSubmit } =
    useForm(INQUIRY_RULES, INITIAL);

  if (status === "success") {
    return (
      <FormSuccess
        title="Got it."
        body={`We'll read it and get back to you with a price. If it's urgent, call ${contact.phone}.`}
        actionLabel="Send another message"
        onAction={reset}
      />
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      <Honeypot value={trap} onChange={setTrap} />

      {status === "error" && errorMessage ? (
        <FormAlert message={errorMessage} />
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inq-name" label="Name" error={errors.name}>
          <TextInput
            id="inq-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            error={errors.name}
            disabled={busy}
            onChange={(event) => setField("name", event.target.value)}
          />
        </Field>

        <Field id="inq-email" label="Email" error={errors.email}>
          <TextInput
            id="inq-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            error={errors.email}
            disabled={busy}
            onChange={(event) => setField("email", event.target.value)}
          />
        </Field>

        <Field id="inq-phone" label="Phone" optional error={errors.phone}>
          <TextInput
            id="inq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Best number to reach you"
            value={values.phone}
            error={errors.phone}
            disabled={busy}
            onChange={(event) => setField("phone", event.target.value)}
          />
        </Field>

        <Field id="inq-type" label="Type of event" error={errors.eventType}>
          <Select
            id="inq-type"
            name="eventType"
            options={EVENT_TYPES}
            placeholder="What are you putting on?"
            value={values.eventType}
            error={errors.eventType}
            disabled={busy}
            onChange={(event) => setField("eventType", event.target.value)}
          />
        </Field>

        <Field id="inq-date" label="Date" optional error={errors.eventDate}>
          <TextInput
            id="inq-date"
            name="eventDate"
            autoComplete="off"
            placeholder="Saturday, March 14"
            value={values.eventDate}
            error={errors.eventDate}
            disabled={busy}
            onChange={(event) => setField("eventDate", event.target.value)}
          />
        </Field>

        <Field id="inq-location" label="Location" optional error={errors.location}>
          <TextInput
            id="inq-location"
            name="location"
            autoComplete="off"
            placeholder="Venue, address or area"
            value={values.location}
            error={errors.location}
            disabled={busy}
            onChange={(event) => setField("location", event.target.value)}
          />
        </Field>
      </div>

      <Field
        id="inq-message"
        label="About the event"
        error={errors.message}
        hint="How many people, indoors or out, whether there's power, anything else we should know."
      >
        <TextArea
          id="inq-message"
          name="message"
          rows={6}
          placeholder="About 300 people in a warehouse downtown, no house power…"
          value={values.message}
          error={errors.message}
          disabled={busy}
          onChange={(event) => setField("message", event.target.value)}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg" disabled={busy}>
          {busy ? <Spinner /> : null}
          {busy ? "Sending…" : "Send"}
        </Button>
        <p className="text-ink/65 text-[0.8125rem] leading-relaxed">
          By sending this you agree to the{" "}
          <Link
            href="/privacy"
            className="text-terracotta-deep underline underline-offset-4"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
