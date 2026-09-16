"use client";

import { motion, useReducedMotion } from "motion/react";
import { howItWorks } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export const HowItWorks = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="landing-section scroll-mt-20 bg-landing-surface"
    >
      <div className="landing-container">
        <SectionHeading
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.headline}
          description={howItWorks.support}
        />

        <div className="relative mt-14 grid gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {howItWorks.steps.map((step, index) => (
            <Reveal
              key={step.title}
              delayMs={index * 90}
              className="relative"
            >
              {index < howItWorks.steps.length - 1 && (
                <div
                  className="absolute top-6 left-[calc(50%+2.75rem)] right-[calc(-50%+2.75rem)] hidden h-px lg:block"
                  aria-hidden
                >
                  <svg className="h-full w-full" preserveAspectRatio="none">
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      strokeDasharray="1,10"
                      className="animate-dash stroke-landing-primary/40 stroke-[2]"
                    />
                  </svg>
                </div>
              )}
              <div className="group flex flex-col items-start text-left">
                <motion.span
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.06 }
                  }
                  className="flex size-12 items-center justify-center border border-landing-primary bg-landing-accent-soft font-landing-display text-lg font-bold text-landing-primary transition-[background-color,color] duration-300 group-hover:bg-landing-primary group-hover:text-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <h3 className="mt-6 font-landing-display text-xl font-bold text-landing-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-landing-ink-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
