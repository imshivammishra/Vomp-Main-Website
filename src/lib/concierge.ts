import type { Venue } from "@/types";

export interface ChatVenue {
  name: string;
  city: string;
  slug: string;
  type: string;
  priceHint?: string;
  capacityMin: number;
  capacityMax: number;
}

export interface BotLink {
  label: string;
  href: string;
}

export interface BotReply {
  text: string;
  venues?: ChatVenue[];
  links?: BotLink[];
  suggest?: string[];
}

export const QUICK_QUESTIONS = [
  "Wedding venues in Udaipur",
  "What are prices like?",
  "How do I book?",
  "Check availability",
  "Best season for weddings?",
  "Talk to a human",
];

const slim = (v: Venue): ChatVenue => ({
  name: v.name,
  city: v.city,
  slug: v.slug,
  type: v.type,
  priceHint: v.priceHint,
  capacityMin: v.capacityMin,
  capacityMax: v.capacityMax,
});

const CONTACT_LINKS: BotLink[] = [
  { label: "Request bespoke proposal", href: "/contact" },
  { label: "Call +91 94624 60555", href: "tel:+919462460555" },
];

function topVenues(venues: Venue[], n = 3): ChatVenue[] {
  const feat = venues.filter((v) => v.featured);
  return (feat.length > 0 ? feat : venues).slice(0, n).map(slim);
}

function venuesInCity(venues: Venue[], city: string): Venue[] {
  const c = city.toLowerCase();
  return venues.filter(
    (v) =>
      v.city.toLowerCase() === c ||
      v.city.toLowerCase().includes(c) ||
      c.includes(v.city.toLowerCase())
  );
}

function cityNames(venues: Venue[]): string[] {
  return [...new Set(venues.map((v) => v.city))];
}

function matchCity(input: string, venues: Venue[]): string | null {
  const known = [
    ...cityNames(venues),
    "Udaipur",
    "Jaipur",
    "Jodhpur",
    "Jaisalmer",
    "Sawai Madhopur",
    "Goa",
  ];
  const low = input.toLowerCase();
  for (const c of known) {
    if (low.includes(c.toLowerCase())) return c;
  }
  return null;
}

function matchVenue(input: string, venues: Venue[]): Venue | null {
  const low = input.toLowerCase().replace(/^(cost|price|rate|charges|fee)( of| for)?\s*/, "");
  const words = low.split(/\s+/).filter((w) => w.length > 3);
  let best: Venue | null = null;
  let bestScore = 0;
  for (const v of venues) {
    const name = v.name.toLowerCase();
    if (low.includes(name)) return v;
    let score = 0;
    for (const w of words) if (name.includes(w)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }
  return bestScore >= 2 ? best : null;
}

function guestCount(input: string): number | null {
  const m = input.replace(/,/g, "").match(/(\d{2,5})\s*(guests?|people|pax|persons?)?/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return n >= 20 && n <= 10000 ? n : null;
}

const has = (low: string, ...words: string[]) => words.some((w) => low.includes(w));

export function conciergeReply(raw: string, venues: Venue[]): BotReply {
  const input = raw.trim();
  const low = input.toLowerCase();

  // 1. Specific venue (incl. "cost of X")
  const venue = matchVenue(input, venues);
  if (venue) {
    const costAsked = has(low, "cost", "price", "rate", "charge", "fee", "budget", "rent");
    return {
      text: costAsked
        ? `${venue.name} in ${venue.area ?? venue.city} is marked ${venue.priceHint ?? "On request"} and hosts ${venue.capacityMin}–${venue.capacityMax} guests. Final quotes move with date, functions and rooms — share your brief and we will get you a private, written quote within one business day.`
        : `${venue.name} is a ${venue.type} in ${venue.area ?? venue.city}, ${venue.city} for ${venue.capacityMin}–${venue.capacityMax} guests (${venue.setting}). ${venue.shortDescription} Want me to check availability or arrange a visit?`,
      venues: [slim(venue)],
      links: [
        { label: `View ${venue.name}`, href: `/venues/${venue.slug}` },
        {
          label: "Check availability",
          href: `/contact?message=${encodeURIComponent(`Hi, please check availability for ${venue.name}.`)}`,
        },
      ],
      suggest: ["Request callback", `Venues in ${venue.city}`, "How do I book?"],
    };
  }

  // 2. City venues
  const city = matchCity(input, venues);
  if (
    city &&
    has(
      low,
      "venue",
      "wedding",
      "place",
      "hall",
      "resort",
      "palace",
      "lawn",
      "show",
      "list",
      "option",
      "best",
      "top",
      "udaipur",
      "jaipur",
      "goa",
      "delhi",
      "mumbai",
      "bangalore",
      "jodhpur"
    )
  ) {
    const list = venuesInCity(venues, city);
    if (list.length > 0) {
      return {
        text: `In ${city} I would shortlist these first — all visited or vetted by our team. Tell me your guest count and date and I will narrow it further.`,
        venues: list.slice(0, 3).map(slim),
        links: [{ label: `All ${city} venues`, href: `/venues?city=${encodeURIComponent(city)}` }],
        suggest: ["What are prices like?", "Check availability", "Best season for weddings?"],
      };
    }
    return {
      text: `${city} is one of our strongest circuits — palaces, resorts and garden venues. Our full ${city} board lives here, and an expert shortlist takes one business day.`,
      links: [{ label: `Explore ${city}`, href: `/cities` }, ...CONTACT_LINKS],
      suggest: ["What are prices like?", "Request callback"],
    };
  }

  // 3. Greetings
  if (
    has(
      low,
      "hello",
      "hi",
      "hey",
      "namaste",
      "good morning",
      "good evening",
      "good afternoon",
      "ram ram"
    )
  ) {
    return {
      text: "Namaste! I am Plate, your venue expert. I can suggest venues by city and budget, explain pricing, check availability, plan visits — or connect you to a human. What are you celebrating?",
      links: [{ label: "Browse all venues", href: "/venues" }],
      suggest: ["Wedding venues in Udaipur", "What are prices like?", "How do I book?"],
    };
  }

  // 4. Price / cost
  if (
    has(
      low,
      "price",
      "pricing",
      "cost",
      "rate",
      "charge",
      "budget",
      "expensive",
      "cheap",
      "fee",
      "rent"
    )
  ) {
    return {
      text: "Every venue here is quote-led, not fixed-price: the final number moves with your date, guest count, functions, rooms and menu. As a guide, heritage palaces and luxury resorts sit at the Premium–Luxury end, while banquet estates are friendlier for large guest lists. A 20–30% advance usually locks your date. Share your city and budget and I will point you at the right set.",
      links: CONTACT_LINKS,
      suggest: ["Venues in Jaipur", "How do I book?", "Is advance refundable?", "Request callback"],
    };
  }

  // 5. Availability / dates
  if (
    has(
      low,
      "availab",
      "available",
      "free on",
      "booked",
      "dates?",
      "december",
      "january",
      "february",
      "november",
      "wedding date",
      "slot"
    )
  ) {
    return {
      text: "Peak dates (Nov–Feb weekends) sell out 6–9 months ahead, especially in Udaipur and Jaipur. If you tell me your city and tentative date, our team will confirm real availability with 2–3 matching venues within one business day — free.",
      links: CONTACT_LINKS,
      suggest: ["Request callback", "Best season for weddings?", "How do I book?"],
    };
  }

  // 6. Booking process
  if (
    has(
      low,
      "how do i book",
      "how to book",
      "booking process",
      "process",
      "how it works",
      "steps",
      "procedure"
    )
  ) {
    return {
      text: "Three refined steps: (1) share your brief — city, date, guests, mood; (2) receive a bespoke shortlist with private quotes in one business day; (3) visit with us and confirm with a written quote and advance. I can start step one right now.",
      links: CONTACT_LINKS,
      suggest: ["Request callback", "Can I visit first?", "What advance is needed?"],
    };
  }

  // 7. Capacity
  const guests = guestCount(input);
  if (guests || has(low, "capacity", "accommodate", "pax", "guest")) {
    if (guests) {
      const fit = venues.filter((v) => v.capacityMin <= guests && guests <= v.capacityMax * 1.25);
      const cityFit = city ? fit.filter((v) => venuesInCity(venues, city).includes(v)) : fit;
      const picks = (cityFit.length > 0 ? cityFit : fit).slice(0, 3).map(slim);
      if (picks.length > 0) {
        return {
          text: `For around ${guests} guests${city ? ` in ${city}` : ""}, these fit beautifully with room to breathe:`,
          venues: picks,
          links: CONTACT_LINKS,
          suggest: ["What are prices like?", "Check availability", "Request callback"],
        };
      }
    }
    return {
      text: "Tell me your expected guest count (a number is perfect, e.g. 300) and your city — I will match venues whose capacity fits with comfortable elbow room, not just the fire-code maximum.",
      suggest: ["500 guests in Goa", "Venues in Jaipur", "What are prices like?"],
    };
  }

  // 8. Visit
  if (has(low, "visit", "site visit", "see the venue", "tour", "recce")) {
    return {
      text: "Yes — we coordinate accompanied site visits on working days and weekends. Carry your function flow (haldi, sangeet, pheras) and a rough guest count; we will line up 2–3 venues in one route so you compare fairly. Weekday mornings show venues at their honest best.",
      links: CONTACT_LINKS,
      suggest: ["Request callback", "How do I book?", "Talk to a human"],
    };
  }

  // 9. Advance / payment
  if (has(low, "advance", "token", "booking amount", "payment", "pay", "installment", "emi")) {
    return {
      text: "A 20–30% advance typically locks your date, with the balance on milestones leading to the event. Always insist on a written quote covering dates, spaces, rooms, menu and service ratios before paying. We review every quote line-by-line for our families.",
      links: CONTACT_LINKS,
      suggest: ["Is advance refundable?", "How do I book?", "Request callback"],
    };
  }

  // 10. Cancellation / refund / postpone
  if (has(low, "cancel", "refund", "postpone", "rain", "reschedule")) {
    return {
      text: "Policies vary by venue: most allow one good-faith postponement, while outright cancellation usually forfeits part of the advance. This is exactly why we negotiate postponement and force-majeure clauses into your written confirmation before you pay a rupee.",
      links: CONTACT_LINKS,
      suggest: ["How do I book?", "Talk to a human"],
    };
  }

  // 11. Catering / food / menu
  if (
    has(
      low,
      "food",
      "cater",
      "menu",
      "veg",
      "non-veg",
      "nonveg",
      "jain",
      "sattvik",
      "cuisine",
      "dinner",
      "lunch",
      "breakfast",
      "chaat",
      "live counter"
    )
  ) {
    return {
      text: "Catering is in-house or through preferred partners at most luxury venues, with tastings arranged before you confirm. Jain, sattvik and continental formats are planned per function. Live counters and chaat stations are crowd favourites for sangeet evenings — confirm kitchen placement and staff ratios in your written quote.",
      links: CONTACT_LINKS,
      suggest: ["Venues with lawns", "What are prices like?", "Request callback"],
    };
  }

  // 12. Rooms / stay
  if (
    has(
      low,
      "room",
      "stay",
      "accommodat",
      "suite",
      "bridal suite",
      "villa",
      "guest rooms",
      "night halt"
    )
  ) {
    return {
      text: "Most palace and resort venues bundle bridal suites plus room blocks for family; city banquets partner with nearby hotels. Always lock the room count, check-in times and complimentary suites in writing — wedding mornings live or die by this.",
      links: CONTACT_LINKS,
      suggest: ["Venues in Udaipur", "What are prices like?"],
    };
  }

  // 13. Decor / mandap / flowers
  if (
    has(
      low,
      "decor",
      "mandap",
      "flower",
      "floral",
      "stage",
      "theme",
      "lighting",
      "entry",
      "varmala"
    )
  ) {
    return {
      text: "Venues offer in-house decor panels and also allow outside decorators. Floral mandaps, pastel sangeet stages and mirrored entries photograph best in daylight venues; confirm load-in times, power points and open-flame rules in advance.",
      links: [{ label: "See decor inspiration", href: "/blogs" }, ...CONTACT_LINKS],
      suggest: ["Haldi venue ideas", "Sangeet venues", "What are prices like?"],
    };
  }

  // 14. Season / weather
  if (
    has(
      low,
      "season",
      "best time",
      "weather",
      "monsoon",
      "summer",
      "winter",
      "month",
      "october",
      "peak"
    )
  ) {
    return {
      text: "October–March is peak for Rajasthan (cool evenings, clear skies); Goa shines November–February. June–September brings monsoon discounts of up to 30% at indoor-capable venues, and May–early-June has the sharpest deals if your guests can handle the heat.",
      links: [{ label: "Explore destinations", href: "/cities" }],
      suggest: ["Venues in Goa", "Check availability", "What are prices like?"],
    };
  }

  // 15. Sangeet / dance / music / baraat
  if (
    has(
      low,
      "sangeet",
      "dance",
      "music",
      "dj",
      "baraat",
      "bharat",
      "dhol",
      "singer",
      "concert",
      "party"
    )
  ) {
    const sangeet = venues
      .filter((v) => v.eventTypes.some((e) => /sangeet|reception|cocktail/i.test(e)))
      .slice(0, 3)
      .map(slim);
    return {
      text: "For sangeet nights pick ballrooms or sound-permitted lawns — many cities enforce a 10pm outdoor music curfew, so indoor after-parties matter. These handle sangeet beautifully:",
      venues: sangeet.length > 0 ? sangeet : topVenues(venues),
      links: [{ label: "All sangeet venues", href: "/venues?event=Sangeet" }],
      suggest: ["Haldi venue ideas", "What are prices like?", "Request callback"],
    };
  }

  // 16. Haldi
  if (has(low, "haldi", "morning function", "mehendi", "mehndi")) {
    return {
      text: "Haldi loves morning light — open lawns, courtyards and poolsides with marigold and white drapes. Keep it to 2–3 hours and confirm washroom access near the venue lawn for the cleanup.",
      links: [{ label: "Venues with lawns", href: "/venues" }],
      suggest: ["Sangeet venues", "Venues in Jaipur"],
    };
  }

  // 17. Corporate
  if (
    has(
      low,
      "corporate",
      "conference",
      "offsite",
      "meeting",
      "mice",
      "team",
      "workshop",
      "dealer meet"
    )
  ) {
    return {
      text: "For corporate offsites prioritise pillarless halls, AV, strong Wi-Fi and room inventory over sheer beauty — day packages with conferencing + lunch often beat wedding quotes. Tell me headcount and I will shortlist.",
      links: [
        { label: "Corporate venues", href: "/venues?event=Corporate%20event" },
        ...CONTACT_LINKS,
      ],
      suggest: ["Venues in Jodhpur", "Request callback"],
    };
  }

  // 18. Birthday / anniversary / private party
  if (
    has(
      low,
      "birthday",
      "anniversary",
      "private party",
      "roka",
      "engagement",
      "bachelor",
      "cocktail"
    )
  ) {
    return {
      text: "Milestone celebrations shine in intimate formats — 80–250 guests in villas, terraces and boutique ballrooms. Rooftops at golden hour plus a live counter beat a half-empty big hall every time.",
      links: [
        { label: "Private party venues", href: "/venues?event=Birthday%20%2F%20Anniversary" },
      ],
      suggest: ["Venues in Jaisalmer", "What are prices like?"],
    };
  }

  // 19. Photographer / vendors
  if (
    has(
      low,
      "photograph",
      "videograph",
      "makeup",
      "mua",
      "vendor",
      "planner",
      "outside vendor",
      "photo",
      "candid",
      "traditional"
    )
  ) {
    return {
      text: "We work with candid and traditional photography teams, makeup artists and planners in every circuit — briefed on your venues and light before the day. Share your city and functions and we will suggest 2–3 options inside your budget.",
      links: CONTACT_LINKS,
      suggest: ["How do I book?", "Request callback", "What are prices like?"],
    };
  }

  // 20. Budget optimisation / negotiation
  if (
    has(
      low,
      "negotiat",
      "better price",
      "discount",
      "deal",
      "offers?",
      "price beat",
      "best deal",
      "benchmark",
      "budget optim"
    )
  ) {
    return {
      text: "That is our favourite part — share any quote you already have and we will benchmark it across 2–3 comparable venues and negotiate inclusions (rooms, decor, sound, taxes), not just the headline number. Peak dates have less room; off-season has plenty.",
      links: CONTACT_LINKS,
      suggest: ["Request callback", "What are prices like?", "Is advance refundable?"],
    };
  }

  // 22. Human / contact
  if (
    has(
      low,
      "human",
      "agent",
      "person",
      "call me",
      "phone",
      "number",
      "contact",
      "talk",
      "callback",
      "whatsapp",
      "email",
      "address",
      "office"
    )
  ) {
    return {
      text: "Of course — our team takes every enquiry personally: +91 94624 60555 (Mon–Sat, 10am–7pm IST). We reply within one business day, usually much faster. Or leave your details and we will call you.",
      links: CONTACT_LINKS,
      suggest: ["Request callback", "How do I book?"],
    };
  }

  // 23. Thanks / bye
  if (has(low, "thank", "thanks", "shukriya", "dhanyavad")) {
    return {
      text: "Anytime! When your date firms up, come back and I will check availability across your shortlist. Wishing you a spectacular celebration.",
      links: [{ label: "Browse venues", href: "/venues" }],
      suggest: ["Check availability", "Best season for weddings?"],
    };
  }
  if (has(low, "bye", "see you", "good night", "alright")) {
    return {
      text: "Goodbye for now — I will be right here when the planning begins. Our expert line +91 94624 60555 is open Mon–Sat, 10am–7pm.",
      suggest: ["See all venues"],
    };
  }

  // 24. Fallback
  return {
    text: "I want to get this exactly right — could you tell me a little more? Your city, occasion and guest count work beautifully. Or pick a topic below.",
    links: CONTACT_LINKS,
    suggest: [
      "Wedding venues in Udaipur",
      "What are prices like?",
      "How do I book?",
      "Talk to a human",
    ],
  };
}
