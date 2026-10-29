"use client";

import { Globe, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, useTransition } from "react";

const GUEST_OPTIONS = ["", "Under 100", "100–300", "300–600", "600–1000", "1000+"];
const EVENT_OPTIONS = [
  "Wedding",
  "Reception",
  "Sangeet",
  "Birthday / Anniversary",
  "Corporate event",
  "Private party",
];

type CountryOption = { code: string; name: string };

export default function VenueFilters({
  cities,
  types,
  countries = [],
}: {
  cities: string[];
  types: string[];
  countries?: CountryOption[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [localQ, setLocalQ] = useState(params.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      // Reset city when country changes
      if (key === "country") next.delete("city");
      startTransition(() => {
        router.push(`${pathname}${next.toString() ? `?${next.toString()}` : ""}`, { scroll: false });
      });
    },
    [params, pathname, router]
  );

  function handleSearch(value: string) {
    setLocalQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => set("q", value.trim()), 400);
  }

  function clearAll() {
    setLocalQ("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }

  const hasFilters =
    params.get("country") || params.get("city") || params.get("guests") ||
    params.get("type") || params.get("event") || params.get("q");

  const filterLabel = "text-[11px] font-semibold tracking-[0.14em] text-[#86868b] uppercase";
  const filterSelect =
    "rounded-xl border border-[#e8e8ed] bg-white px-3.5 py-2 text-[14px] text-[#1d1d1f] shadow-sm transition focus:border-[#7f0f2e] focus:outline-none focus:ring-2 focus:ring-[#7f0f2e]/10 hover:border-[#c8c8cc] cursor-pointer";

  return (
    <div className="space-y-4" role="search" aria-label="Filter venues">
      {/* Text search */}
      <div className="relative max-w-sm">
        <Search
          size={15}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search venues by name or location…"
          value={localQ}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search venues"
          className="input-elegant pl-10 pr-10 rounded-xl"
        />
        {localQ && (
          <button
            type="button"
            onClick={() => handleSearch("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#86868b] transition hover:text-[#1d1d1f]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown filters */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Country filter — only shown when multiple countries have venues */}
        {countries.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <label className={filterLabel}>
              <span className="flex items-center gap-1.5"><Globe size={11} aria-hidden="true" />Country</span>
            </label>
            <select
              className={filterSelect}
              value={params.get("country") ?? ""}
              onChange={(e) => set("country", e.target.value)}
              aria-label="Country"
            >
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className={filterLabel}>City</label>
          <select
            className={filterSelect}
            value={params.get("city") ?? ""}
            onChange={(e) => set("city", e.target.value)}
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={filterLabel}>Guests</label>
          <select
            className={filterSelect}
            value={params.get("guests") ?? ""}
            onChange={(e) => set("guests", e.target.value)}
          >
            {GUEST_OPTIONS.map((g) => (
              <option key={g || "any"} value={g}>{g || "Any size"}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={filterLabel}>Type</label>
          <select
            className={filterSelect}
            value={params.get("type") ?? ""}
            onChange={(e) => set("type", e.target.value)}
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={filterLabel}>Occasion</label>
          <select
            className={filterSelect}
            value={params.get("event") ?? ""}
            onChange={(e) => set("event", e.target.value)}
          >
            <option value="">All occasions</option>
            {EVENT_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1.5 self-end rounded-xl border border-[#e8e8ed] bg-[#fdf9f4] px-4 py-2 text-[13px] font-medium text-[#7f0f2e] transition hover:border-[#7f0f2e]/30 hover:bg-white"
          >
            <X size={13} aria-hidden="true" />
            Clear all
          </button>
        )}

        {isPending && (
          <span className="self-end pb-2 text-[13px] text-[#86868b]" aria-live="polite">
            Updating…
          </span>
        )}
      </div>
    </div>
  );
}
