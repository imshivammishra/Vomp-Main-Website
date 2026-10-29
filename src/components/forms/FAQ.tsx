import type { Faq } from "@/types";

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {faqs.map((f) => (
        <details key={f.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[17px] font-semibold text-[#1d1d1f] [&::-webkit-details-marker]:hidden">
            {f.question}
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/5 text-[18px] font-light text-[#1d1d1f] transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="faq-a">
            <div>
              <p className="max-w-3xl pt-3 text-[15px] leading-relaxed text-[#424245]">
                {f.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
