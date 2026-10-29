"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { CITIES, EVENT_TYPES, GUEST_BANDS } from "@/lib/validations";

export default function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (eventType) params.set("event", eventType);
    if (guests) params.set("guests", guests);
    if (date) params.set("date", date);
    const qs = params.toString();
    router.push(`/venues${qs ? `?${qs}` : ""}`);
  }

  const field =
    "w-full bg-transparent text-[13px] text-[#1a0a0d] focus:outline-none cursor-pointer placeholder:text-[#8c736f]";
  const labelCls = "block text-[10px] font-semibold tracking-[0.2em] text-[#8c736f] uppercase";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search venues"
      className="w-full rounded-[20px] border border-[#e8ded2] bg-white p-3 text-left shadow-[0_24px_48px_-16px_rgba(15,8,10,0.06)] md:rounded-[24px]"
    >
      <div className="grid gap-2 md:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] md:items-center md:divide-x md:divide-[#e8ded2]">
        <label className="rounded-[14px] px-5 py-3 transition hover:bg-[#fffaf0] md:rounded-full">
          <span className={labelCls}>Location</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" className={`${field} mt-0.5`}>
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="rounded-[14px] px-5 py-3 transition hover:bg-[#fffaf0] md:rounded-full">
          <span className={labelCls}>Occasion</span>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)} aria-label="Event type" className={`${field} mt-0.5`}>
            <option value="">Wedding, corporate…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="rounded-[14px] px-5 py-3 transition hover:bg-[#fffaf0] md:rounded-full">
          <span className={labelCls}>Guests</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} aria-label="Guests" className={`${field} mt-0.5`}>
            <option value="">Any size</option>
            {GUEST_BANDS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="rounded-[14px] px-5 py-3 transition hover:bg-[#fffaf0] md:rounded-full">
          <span className={labelCls}>Dates</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Event date" className={`${field} mt-0.5`} />
        </label>
        <div className="p-1">
          <button type="submit" className="lux-btn flex min-h-[52px] w-full items-center justify-center gap-2 px-8 py-3 text-[13px] whitespace-nowrap md:w-auto">
            <Search size={16} strokeWidth={1.6} />
            Search venues
          </button>
        </div>
      </div>
    </form>
  );
}
