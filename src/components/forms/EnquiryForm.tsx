"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/lib/api";
import { CITIES, enquirySchema, EVENT_TYPES, GUEST_BANDS } from "@/lib/validations";

type Status = "idle" | "sending" | "success" | "error";

export default function EnquiryForm({ venueName }: { venueName?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const params = useSearchParams();
  const q = (k: string) => params.get(k) ?? "";
  // Prefill from query (e.g. concierge chat handoff): ?name=&phone=&city=&event=&guests=&date=&message=
  const initialMessage = venueName ? `[${venueName}] ${q("message")}`.trim() : q("message");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    const raw = Object.fromEntries(data.entries()) as Record<string, string>;
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    const message =
      venueName && !raw.message.startsWith(`[${venueName}]`)
        ? `[${venueName}] ${raw.message ?? ""}`
        : raw.message;
    const result = await submitEnquiry(venueName ? { ...parsed.data, message } : parsed.data);
    setStatus(result.ok ? "success" : "error");
    if (result.ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[18px] border border-black/10 bg-white p-8 text-center shadow-sm md:p-12"
      >
        <div aria-hidden="true" className="lux-ornament">
          <span />
        </div>
        <p className="mt-4 text-[28px] font-bold tracking-tight text-[#1d1d1f] md:text-4xl">
          Thank you.
        </p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-[#3d4357]">
          We&apos;ve received your request. Our team will review your requirements and get back to
          you shortly.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#1d1d1f] shadow-none transition placeholder:text-[#86868b] focus:border-black focus:outline-none focus:ring-4 focus:ring-black/10";
  const err = (k: string) =>
    errors[k] ? <span className="mt-1 block text-xs text-red-800">{errors[k]}</span> : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Venue enquiry form" className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
            Name *
          </span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            defaultValue={q("name")}
            className={input}
          />
          {err("name")}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
            Phone *
          </span>
          <input
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 …"
            defaultValue={q("phone")}
            className={input}
          />
          {err("phone")}
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
          Email *
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={input}
        />
        {err("email")}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
            City *
          </span>
          <select name="city" className={input} defaultValue={q("city") || ""}>
            <option value="" disabled>
              Select city
            </option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("city")}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
            Event type *
          </span>
          <select name="eventType" className={input} defaultValue={q("event") || ""}>
            <option value="" disabled>
              Select event
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("eventType")}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
            Event date *
          </span>
          <input
            name="eventDate"
            placeholder="e.g. Dec 2026 (flexible)"
            defaultValue={q("date")}
            className={input}
          />
          {err("eventDate")}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
            Guests *
          </span>
          <select name="guestCount" className={input} defaultValue={q("guests") || ""}>
            <option value="" disabled>
              Select range
            </option>
            {GUEST_BANDS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {err("guestCount")}
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[11px] tracking-[0.2em] text-[#3d4357] uppercase">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Anything that matters — budget, functions, must-haves…"
          defaultValue={initialMessage}
          className={input}
        />
        {err("message")}
      </label>
      {status === "error" && (
        <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          Something went wrong sending your enquiry. Please try again, or write to us at
          contact@venueonmyplate.in.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="s-btn-dark btn-sheen rounded-full px-8 py-3 text-[15px] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Get my venue options"}
      </button>
      <p className="text-xs leading-relaxed text-[#3d4357]/80">
        By submitting, you agree to be contacted about your enquiry. We never share your details
        without consent.
      </p>
    </form>
  );
}
