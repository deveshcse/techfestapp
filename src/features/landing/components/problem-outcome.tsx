"use client";

import { motion } from "motion/react";
import { problemOutcome } from "../content/landing-copy";
import { SectionHeading } from "./section-heading";
import { useLandingMotionPrefs } from "./use-landing-motion";

export function ProblemOutcome() {
  const {
    prefersReducedMotion,
    isMobile,
    viewport,
    transition,
    fadeUp,
    stagger,
  } = useLandingMotionPrefs();

  return (
    <section className={`bg-landing-bg py-(--landing-section-y)`}>
      <div className="w-full px-(--landing-gutter)">
        <SectionHeading
          eyebrow={problemOutcome.eyebrow}
          title={problemOutcome.headline}
          description={problemOutcome.support}
        />

        <motion.div
          className={`grid lg:grid-cols-2 gap-(--landing-gap-lg) mt-(--landing-stack-lg)`}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <div className="min-w-0">
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-(--landing-stack-md) text-sm font-semibold uppercase tracking-[0.14em] text-landing-ink"
            >
              Before
            </motion.p>
            <ul className={`flex flex-col gap-(--landing-gap)`}>
              {problemOutcome.pains.map((item) => (
                <motion.li
                  key={item.title}
                  variants={fadeUp}
                  transition={transition}
                  whileHover={
                    prefersReducedMotion || isMobile ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion || !isMobile
                      ? undefined
                      : { scale: 0.99 }
                  }
                  className="rounded-r-md border border-landing-ink/12 border-l-[3px] border-l-landing-ink/45 bg-landing-surface py-(--landing-stack-md) pl-(--landing-stack-md) pr-(--landing-stack-sm) shadow-[0_1px_0_hsl(var(--landing-ink)/0.04)] touch-manipulation transition-colors duration-300 hover:bg-landing-muted/60"
                >
                  <h3 className="font-landing-display text-base font-semibold text-landing-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-(--landing-stack-xs) text-sm leading-relaxed text-landing-ink-muted">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 border-t border-landing-ink/10 pt-(--landing-stack-lg) lg:border-t-0 lg:pt-0">
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-(--landing-stack-md) text-sm font-semibold uppercase tracking-[0.14em] text-landing-primary"
            >
              With TechFestApp
            </motion.p>
            <ul className={`flex flex-col gap-(--landing-gap)`}>
              {problemOutcome.outcomes.map((item) => (
                <motion.li
                  key={item.title}
                  variants={fadeUp}
                  transition={transition}
                  whileHover={
                    prefersReducedMotion || isMobile ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion || !isMobile
                      ? undefined
                      : { scale: 0.99 }
                  }
                  className="rounded-r-md border border-landing-primary/15 border-l-[3px] border-l-landing-primary bg-landing-accent-soft/70 py-(--landing-stack-md) pl-(--landing-stack-md) pr-(--landing-stack-sm) touch-manipulation transition-colors duration-300 hover:bg-landing-accent-soft"
                >
                  <h3 className="font-landing-display text-base font-semibold text-landing-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-(--landing-stack-xs) text-sm leading-relaxed text-landing-ink-muted">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
