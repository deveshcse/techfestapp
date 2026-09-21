"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { testimonials } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section className={`bg-landing-muted/45 py-(--landing-section-y)`}>
      <div className="w-full px-(--landing-gutter)">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.headline}
          description={testimonials.support}
        />

        <div
          className={`grid md:grid-cols-3 gap-(--landing-gap-lg) mt-(--landing-stack-lg)`}
        >
          {testimonials.items.map((item, index) => (
            <Reveal
              key={item.name}
              delayMs={isMobile ? Math.min(index * 80, 100) : index * 80}
              as="blockquote"
              className="flex h-full flex-col border-t-2 border-landing-primary pt-(--landing-stack-md) sm:transition-colors sm:duration-300 sm:hover:border-landing-primary/70"
            >
              <p className="flex-1 text-base leading-relaxed text-landing-ink sm:text-[1.05rem]">
                <span className="font-landing-display text-3xl leading-none text-landing-primary/40">
                  “
                </span>
                {item.quote}
              </p>
              <footer className="mt-(--landing-stack-lg) flex items-center gap-(--landing-stack-sm)">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-landing-accent-soft font-landing-display text-sm font-bold text-landing-primary"
                  aria-hidden
                >
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-landing-ink">{item.name}</p>
                  <p className="mt-0.5 text-sm text-landing-ink-muted">
                    {item.role}
                  </p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
