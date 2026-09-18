"use client";

import { features } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useLandingMotionPrefs } from "./use-landing-motion";

export const Features = () => {
  const { delayMs } = useLandingMotionPrefs();

  return (
    <section id="features" className={`scroll-mt-20 bg-landing-bg py-(--landing-section-y)`}>
      <div className="w-full px-(--landing-gutter)">
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.headline}
          description={features.support}
        />

        <div
          className={`divide-y divide-landing-ink/10 border-y border-landing-ink/10 mt-(--landing-stack-lg)`}
        >
          {features.items.map((feature, index) => (
            <Reveal
              key={feature.title}
              delayMs={delayMs(index * 45)}
              as="article"
            >
              <div className="group grid gap-(--landing-stack-sm) py-(--landing-stack-md) transition-colors duration-200 active:bg-landing-muted/35 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)] sm:items-baseline sm:gap-(--landing-gap-lg) sm:py-(--landing-stack-lg) sm:hover:bg-landing-muted/35">
                <div className="flex items-baseline gap-(--landing-stack-sm)">
                  <span className="font-landing-display text-xs font-bold text-landing-primary/70 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-landing-display text-lg font-semibold text-landing-ink transition-colors group-active:text-landing-primary sm:text-xl sm:group-hover:text-landing-primary">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-landing-ink-muted sm:text-base">
                  {feature.description}
                </p>
                <p className="text-sm font-semibold text-landing-primary sm:text-right">
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
