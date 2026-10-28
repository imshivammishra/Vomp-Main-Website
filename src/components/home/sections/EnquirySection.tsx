"use client";

import FAQ from "@/components/forms/FAQ";
import Reveal from "@/components/ui/Reveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import SectionHeading from "@/components/home/SectionHeading";

type Faq = { question: string; answer: string };

export default function EnquirySection({
  faqs,
  heading,
}: {
  faqs: Faq[];
  heading: { eyebrow: string; title: string; copy?: string };
}) {
  return (
    <section aria-labelledby="enquiry-heading" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow={heading.eyebrow} title={heading.title} copy={heading.copy} />
            <h2 id="enquiry-heading" className="sr-only">Enquiry form</h2>
            <div className="mt-8">
              <FAQ faqs={faqs} />
            </div>
          </div>
          <div className="h-fit rounded-[18px] bg-white p-6 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/5 md:p-8 lg:sticky lg:top-24">
            <EnquiryForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
