"use client";

import { features } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export const Features = () => {
  return (
    <section id="features" className="landing-section scroll-mt-20 bg-landing-bg">
      <div className="landing-container">
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.headline}
          description={features.support}
        />

        <div className="mt-14 divide-y divide-landing-ink/10 border-y border-landing-ink/10 sm:mt-16">
          {features.items.map((feature, index) => (
            <Reveal key={feature.title} delayMs={index * 45} as="article">
              <div className="group grid gap-3 py-7 transition-colors duration-200 hover:bg-landing-muted/35 sm:grid-cols-[1fr_1.45fr_0.85fr] sm:items-baseline sm:gap-8 sm:py-8 sm:pl-3 sm:pr-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-landing-display text-xs font-bold text-landing-primary/70 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-landing-display text-xl font-semibold text-landing-ink transition-colors group-hover:text-landing-primary">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-landing-ink-muted sm:pl-0 pl-8">
                  {feature.description}
                </p>
                <p className="pl-8 text-sm font-semibold text-landing-primary sm:pl-0 sm:text-right">
                  {feature.outcome}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
