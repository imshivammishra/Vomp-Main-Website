"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, Send, X } from "lucide-react";
import { conciergeReply, QUICK_QUESTIONS, type BotLink, type ChatVenue } from "@/lib/concierge";
import { submitEnquiry } from "@/lib/api";
import type { Venue } from "@/types";

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
  venues?: ChatVenue[];
  links?: BotLink[];
}

type LeadStep = "idle" | "awaitName" | "awaitPhone" | "awaitCity";

let seq = 1;

function VenueMini({ v }: { v: ChatVenue }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-3">
      <p className="text-[13px] font-semibold leading-snug text-[#1d1d1f]">{v.name}</p>
      <p className="mt-0.5 text-[12px] text-[#6e6e73]">
        {v.city} · {v.type}
      </p>
      <p className="mt-0.5 text-[12px] font-medium text-[#424245]">
        {v.capacityMin}–{v.capacityMax} guests{v.priceHint ? ` · ${v.priceHint}` : ""}
      </p>
      <div className="mt-2 flex gap-4">
        <Link
          href={`/venues/${v.slug}`}
          className="text-[12px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black"
        >
          View venue &rsaquo;
        </Link>
        <Link
          href={`/contact?message=${encodeURIComponent(`Hi, please share availability and a quote for ${v.name}.`)}`}
          className="text-[12px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black"
        >
          Get quote &rsaquo;
        </Link>
      </div>
    </div>
  );
}

export default function ConciergeChat({ venues: initialVenues = [] }: { venues?: Venue[] }) {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<string[]>(QUICK_QUESTIONS);
  const [nudge, setNudge] = useState(false);
  const [lead, setLead] = useState<LeadStep>("idle");

  // Fetch venues client-side so layout.tsx doesn't block on getVenues()
  useEffect(() => {
    if (initialVenues.length > 0) return;
    fetch("/api/v1/public/venues?limit=500")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.data?.length) setVenues(d.data);
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [leadData, setLeadData] = useState({ name: "", phone: "", city: "" });
  const bodyRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  const pushBot = useCallback((m: Omit<Msg, "id" | "from">, suggest?: string[]) => {
    setMsgs((p) => [...p, { ...m, id: seq++, from: "bot" }]);
    if (suggest) setChips(suggest);
  }, []);

  const answer = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMsgs((p) => [...p, { id: seq++, from: "user", text: trimmed }]);
      setInput("");

      // Lead-capture flow takes precedence
      if (lead !== "idle") {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          if (lead === "awaitName") {
            setLeadData((d) => ({ ...d, name: trimmed }));
            setLead("awaitPhone");
            pushBot({
              text: `Lovely to meet you, ${trimmed.split(" ")[0]}. What is the best 10-digit mobile number to reach you on?`,
            });
          } else if (lead === "awaitPhone") {
            const digits = trimmed.replace(/\D/g, "").replace(/^(91|0)/, "");
            if (!/^[6-9]\d{9}$/.test(digits)) {
              pushBot({
                text: "That number does not look quite right — please share a 10-digit Indian mobile number.",
              });
            } else {
              setLeadData((d) => ({ ...d, phone: digits }));
              setLead("awaitCity");
              pushBot({ text: "Noted. And which city is the celebration in?" });
              setChips(["Udaipur", "Jaipur", "Jodhpur", "Jaisalmer", "Goa", "Somewhere else"]);
            }
          } else if (lead === "awaitCity") {
            const done = { ...leadData, city: trimmed };
            setLead("idle");
            // Forward lead to the workspace API (same-origin in production).
            submitEnquiry({
              name: done.name,
              phone: done.phone,
              email: "not-provided@venueonmyplate.in",
              city: done.city,
              eventType: "Wedding",
              eventDate: "Flexible",
              guestCount: "Not specified",
              message: `Hi, please call me about venues in ${done.city}. (via concierge chat)`,
            }).catch(() => {});
            const q = new URLSearchParams({
              name: done.name,
              phone: done.phone,
              city: done.city,
              message: `Hi, please call me about venues in ${done.city}. (via concierge chat)`,
            }).toString();
            pushBot(
              {
                text: `Perfect — ${done.name}, our venue expert will call ${done.phone} about ${done.city} venues within one business day. Tap below to send your details instantly, or just wait for our call.`,
                links: [{ label: "Send my details now", href: `/contact?${q}` }],
              },
              ["What are prices like?", "See all venues"]
            );
          }
        }, 900);
        return;
      }

      // Callback intent enters lead flow
      if (/request callback|call me back|call back|callback/.test(trimmed.toLowerCase())) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setLead("awaitName");
          pushBot({
            text: "With pleasure — I will arrange a callback from our team. What is your name?",
          });
        }, 800);
        return;
      }

      setTyping(true);
      const delay = 700 + Math.min(900, trimmed.length * 12);
      setTimeout(() => {
        setTyping(false);
        const r = conciergeReply(trimmed, venues);
        pushBot({ text: r.text, venues: r.venues, links: r.links }, r.suggest);
      }, delay);
    },
    [lead, leadData, pushBot, venues]
  );

  // Greet on first open
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        pushBot(
          {
            text: "Namaste! I am Plate, your venue expert. Ask me about venues by city, pricing, availability, visits — anything celebration. What are you planning?",
          },
          QUICK_QUESTIONS
        );
      }, 700);
    }
  }, [open, pushBot]);

  // Proactive nudge
  useEffect(() => {
    if (open || greeted.current) return;
    const t = setTimeout(() => setNudge(true), 12000);
    return () => clearTimeout(t);
  }, [open]);

  // Autoscroll
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  return (
    <>
      {/* Nudge bubble */}
      {nudge && !open && (
        <button
          type="button"
          onClick={() => {
            setNudge(false);
            setOpen(true);
          }}
          className="chat-pop fixed right-4 bottom-24 z-50 max-w-[240px] rounded-2xl rounded-br-md bg-white p-3 text-left shadow-[0_20px_50px_-16px_rgba(92,10,32,0.4)] ring-1 ring-[#d4a437]/50 md:right-6 md:bottom-24"
        >
          <span className="text-[13px] font-semibold text-[#1d1d1f]">Looking for a venue?</span>
          <span className="mt-0.5 block text-[12px] leading-snug text-[#424245]">
            I can shortlist, price and plan visits — ask me anything.
          </span>
        </button>
      )}

      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setNudge(false);
            setOpen(true);
          }}
          aria-label="Chat with our venue expert"
          className="group fixed right-4 bottom-6 z-50 md:right-6"
        >
          <span className="relative grid h-[76px] w-[76px] place-items-center">
            <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-[0_18px_44px_-12px_rgba(166,124,26,0.5)] ring-1 ring-[#d4a437]/70">
              <Image
                src="/images/brand-mark.png"
                alt=""
                width={70}
                height={70}
                className="h-[70px] w-[70px] object-contain"
              />
            </span>
          </span>
          <span className="mt-1 block rounded-full bg-black/70 px-2.5 py-1 text-center text-[10px] font-semibold tracking-wider text-white uppercase opacity-0 backdrop-blur transition group-hover:opacity-100">
            Venue expert
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <section
          aria-label="Venue expert chat"
          className="chat-pop fixed inset-x-4 bottom-24 z-50 flex max-h-[72vh] min-h-[480px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_36px_90px_-24px_rgba(92,10,32,0.4)] ring-1 ring-[#d4a437]/40 md:inset-x-auto md:right-6 md:bottom-6 md:w-[392px]"
        >
          {/* Header */}
          <div
            className="px-4 py-3.5 text-white"
            style={{ backgroundImage: "linear-gradient(135deg, #5c0a20, #7f0f2e)" }}
          >
            <div className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#fffaf0]">
                <Image
                  src="/images/brand-mark.png"
                  alt=""
                  width={44}
                  height={44}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-tight">Plate · Venue Expert</p>
                <p className="flex items-center gap-1.5 text-[12px] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online · replies
                  instantly
                </p>
              </div>
              <a
                href="tel:+919462460555"
                aria-label="Call concierge"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black"
              >
                <Phone size={16} />
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f5f5f7] px-4 py-4">
            {msgs.map((m) =>
              m.from === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[#7f0f2e] px-4 py-2.5 text-[14px] leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[92%] space-y-2">
                    <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                      <p className="text-[14px] leading-relaxed text-[#1d1d1f]">{m.text}</p>
                      {m.links && m.links.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {m.links.map((l) =>
                            l.href.startsWith("tel:") ? (
                              <a
                                key={l.label}
                                href={l.href}
                                className="s-btn-dark btn-sheen rounded-full px-4 py-1.5 text-[13px]"
                              >
                                {l.label}
                              </a>
                            ) : (
                              <Link
                                key={l.label}
                                href={l.href}
                                className="rounded-full bg-black px-4 py-1.5 text-[13px] text-white transition hover:bg-neutral-800"
                              >
                                {l.label}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    {m.venues?.map((v) => (
                      <VenueMini key={v.slug} v={v} />
                    ))}
                  </div>
                </div>
              )
            )}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm"
                  aria-label="Concierge is typing"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="typing-dot h-2 w-2 rounded-full bg-[#86868b]"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick chips */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-black/10 bg-white px-3 py-2.5">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => answer(c)}
                className="shrink-0 rounded-full bg-[#f5f5f7] px-3.5 py-1.5 text-[13px] whitespace-nowrap text-[#1d1d1f] transition hover:bg-[#e8e8ed]"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              answer(input);
            }}
            className="flex items-center gap-2 border-t border-black/10 bg-white px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about venues, prices, dates…"
              aria-label="Type your message"
              className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2.5 text-[14px] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-black focus:outline-none focus:ring-4 focus:ring-black/10"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="s-btn-dark btn-sheen grid h-10 w-10 shrink-0 place-items-center rounded-full"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
