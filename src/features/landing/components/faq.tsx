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
    <section id="faq" className={`scroll-mt-20 bg-landing-bg py-(--landing-section-y)`}>
      <div className="w-full px-(--landing-gutter)">
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.headline}
          description={faq.support}
        />

        <Reveal className="mt-(--landing-stack-lg)" delayMs={40}>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-xl border border-landing-ink/10 bg-landing-surface px-(--landing-stack-md) sm:px-(--landing-stack-lg)"
          >
            {faq.items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-landing-ink/10"
              >
                <AccordionTrigger className="min-h-12 py-(--landing-stack-md) text-left font-landing-display text-[0.95rem] font-semibold text-landing-ink touch-manipulation hover:no-underline hover:text-landing-primary sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-(--landing-stack-md) text-sm leading-relaxed text-landing-ink-muted sm:text-base">
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
