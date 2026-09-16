"use client";

import { features } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useLandingMotionPrefs } from "./use-landing-motion";

export const Features = () => {
  const { delayMs } = useLandingMotionPrefs();

  return (
    <section id="features" className="landing-section scroll-mt-20 bg-landing-bg">
      <div className="landing-container">
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.headline}
          description={features.support}
        />

        <div className="mt-10 divide-y divide-landing-ink/10 border-y border-landing-ink/10 sm:mt-16">
          {features.items.map((feature, index) => (
            <Reveal
              key={feature.title}
              delayMs={delayMs(index * 45)}
              as="article"
            >
              <div className="group grid gap-2.5 py-5 transition-colors duration-200 active:bg-landing-muted/35 sm:grid-cols-[1fr_1.45fr_0.85fr] sm:items-baseline sm:gap-8 sm:py-8 sm:pl-3 sm:pr-2 sm:hover:bg-landing-muted/35">
                <div className="flex items-baseline gap-3">
                  <span className="font-landing-display text-xs font-bold text-landing-primary/70 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-landing-display text-lg font-semibold text-landing-ink transition-colors group-active:text-landing-primary sm:text-xl sm:group-hover:text-landing-primary">
                    {feature.title}
                  </h3>
                </div>
                <p className="pl-7 text-sm leading-relaxed text-landing-ink-muted sm:pl-0 sm:text-base">
                  {feature.description}
                </p>
                <p className="pl-7 text-sm font-semibold text-landing-primary sm:pl-0 sm:text-right">
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
