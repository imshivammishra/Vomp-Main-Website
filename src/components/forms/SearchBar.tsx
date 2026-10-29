"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CITIES } from "@/lib/validations";

const CATEGORY_OPTIONS = [
  { label: "Venues", value: "" },
  { label: "Wedding Venues", value: "Wedding" },
  { label: "Birthday Venues", value: "Birthday / Anniversary" },
  { label: "Corporate Venues", value: "Corporate event" },
  { label: "Sangeet & Haldi", value: "Pre-wedding / Haldi / Sangeet" },
];

export default function SearchBar() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("event", category);
    if (city) params.set("city", city);
    const qs = params.toString();
    router.push(`/venues${qs ? `?${qs}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search venues"
      className="flex w-full flex-col border border-[#d8d8d8] bg-white shadow-[0_8px_26px_-14px_rgba(0,0,0,0.35)] sm:flex-row sm:items-stretch sm:rounded-[4px]"
    >
      <label className="relative flex min-w-0 flex-1 cursor-pointer flex-col justify-center border-b border-[#e6e6e6] px-5 py-3 text-left sm:border-r sm:border-b-0">
        <span className="block text-[9px] font-semibold tracking-[0.16em] text-[#8a8a8a] uppercase">
          Category
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Venue category"
          className="mt-0.5 w-full cursor-pointer bg-transparent pr-5 text-[14px] font-semibold text-[#141414] focus:outline-none md:text-[15px]"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="relative flex min-w-0 flex-1 cursor-pointer flex-col justify-center border-b border-[#e6e6e6] px-5 py-3 text-left sm:border-r sm:border-b-0">
        <span className="block text-[9px] font-semibold tracking-[0.16em] text-[#8a8a8a] uppercase">
          Location
        </span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City"
          className="mt-0.5 w-full cursor-pointer bg-transparent pr-5 text-[14px] font-semibold text-[#141414] focus:outline-none md:text-[15px]"
        >
          <option value="">City, state</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div className="p-2">
        <button
          type="submit"
          className="flex h-[48px] w-full items-center justify-center bg-[#7f0f2e] px-9 text-[11px] font-bold tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#5c0a20] sm:h-full sm:min-h-[54px]"
        >
          Search
        </button>
      </div>
    </form>
  );
}
