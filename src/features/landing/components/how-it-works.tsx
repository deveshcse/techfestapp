"use client";

import { howItWorks } from "../content/landing-copy";
import { SectionHeading } from "./section-heading";

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className={`scroll-mt-20 bg-landing-surface py-(--landing-section-y)`}
    >
      <div className="w-full px-(--landing-gutter)">
        <SectionHeading
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.headline}
          description={howItWorks.support}
        />

        <ol
          className="mt-(--landing-stack-lg) grid lg:grid-cols-3 lg:gap-x-(--landing-gap-lg)"
          aria-label="How TechFestApp works"
        >
          {howItWorks.steps.map((step, index) => {
            const isLast = index === howItWorks.steps.length - 1;
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <li
                key={step.title}
                className="relative flex gap-(--landing-stack-md) lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Mobile stepper */}
                <div className="flex w-8 shrink-0 flex-col items-center lg:hidden">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-landing-primary bg-landing-surface font-landing-display text-xs font-bold text-landing-primary">
                    {index + 1}
                  </span>
                  {!isLast && (
                    <span
                      className="mt-2 w-px flex-1 bg-landing-primary/35"
                      aria-hidden
                    />
                  )}
                </div>

                {/* Desktop node — centered so the track hits each circle */}
                <div className="relative mb-(--landing-stack-md) hidden w-full justify-center lg:flex">
                  {!isLast && (
                    <span
                      className="absolute top-1/2 left-1/2 h-px w-[calc(100%+var(--landing-gap-lg))] -translate-y-1/2 bg-landing-primary/30"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-1 flex size-12 items-center justify-center rounded-full border-2 border-landing-primary bg-landing-surface font-landing-display text-sm font-bold text-landing-primary ring-[6px] ring-landing-surface">
                    {stepNumber}
                  </span>
                </div>

                <div
                  className={
                    isLast
                      ? "min-w-0 flex-1 lg:max-w-[18rem]"
                      : "min-w-0 flex-1 pb-(--landing-stack-xl) lg:max-w-[18rem] lg:pb-0"
                  }
                >
                  <p className="landing-eyebrow">{step.cue}</p>
                  <h3 className="mt-(--landing-stack-xs) font-landing-display text-xl font-bold tracking-tight text-landing-ink lg:mt-(--landing-stack-sm) lg:text-[1.65rem] lg:leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-(--landing-stack-sm) text-[0.9375rem] leading-relaxed text-landing-ink-muted lg:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
