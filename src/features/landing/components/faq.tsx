"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Faq() {
  return (
    <section id="faq" className="landing-section scroll-mt-20 bg-landing-bg">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.headline}
          description={faq.support}
        />

        <Reveal className="mt-8 sm:mt-12" delayMs={40}>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-xl border border-landing-ink/10 bg-landing-surface px-3 sm:px-6"
          >
            {faq.items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-landing-ink/10"
              >
                <AccordionTrigger className="min-h-12 py-4 text-left font-landing-display text-[0.95rem] font-semibold text-landing-ink touch-manipulation hover:no-underline hover:text-landing-primary sm:py-5 sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-landing-ink-muted sm:pb-5 sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
