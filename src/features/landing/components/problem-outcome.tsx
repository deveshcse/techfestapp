"use client";

import { motion } from "motion/react";
import { problemOutcome } from "../content/landing-copy";
import { fadeLeft, fadeRight } from "./landing-motion";
import {
  landingGap,
  landingGapLg,
  landingPad,
  landingSectionY,
  landingStackAfterHeading,
} from "./landing-layout";
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

  const enter = isMobile ? fadeUp : fadeLeft;
  const enterAlt = isMobile ? fadeUp : fadeRight;

  return (
    <section className={`bg-landing-bg ${landingSectionY}`}>
      <div className={landingPad}>
        <SectionHeading
          eyebrow={problemOutcome.eyebrow}
          title={problemOutcome.headline}
          description={problemOutcome.support}
        />

        <div
          className={`grid lg:grid-cols-2 ${landingGapLg} ${landingStackAfterHeading}`}
        >
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.p
              variants={enter}
              transition={transition}
              className="mb-[var(--landing-stack-md)] text-sm font-semibold uppercase tracking-[0.14em] text-landing-ink-muted"
            >
              Before
            </motion.p>
            <ul className={`flex flex-col ${landingGap}`}>
              {problemOutcome.pains.map((item) => (
                <motion.li
                  key={item.title}
                  variants={enter}
                  transition={transition}
                  whileHover={
                    prefersReducedMotion || isMobile ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion || !isMobile
                      ? undefined
                      : { scale: 0.99 }
                  }
                  className="rounded-r-md border-l-2 border-landing-ink/15 bg-landing-muted/40 py-[var(--landing-stack-md)] pl-[var(--landing-stack-md)] pr-[var(--landing-stack-sm)] touch-manipulation transition-colors duration-300 hover:bg-landing-muted/70"
                >
                  <h3 className="font-landing-display text-base font-semibold text-landing-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-[var(--landing-stack-xs)] text-sm leading-relaxed text-landing-ink-muted">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.p
              variants={enterAlt}
              transition={transition}
              className="mb-[var(--landing-stack-md)] text-sm font-semibold uppercase tracking-[0.14em] text-landing-primary"
            >
              With TechFestApp
            </motion.p>
            <ul className={`flex flex-col ${landingGap}`}>
              {problemOutcome.outcomes.map((item) => (
                <motion.li
                  key={item.title}
                  variants={enterAlt}
                  transition={transition}
                  whileHover={
                    prefersReducedMotion || isMobile ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion || !isMobile
                      ? undefined
                      : { scale: 0.99 }
                  }
                  className="rounded-r-md border-l-2 border-landing-primary bg-landing-accent-soft/50 py-[var(--landing-stack-md)] pl-[var(--landing-stack-md)] pr-[var(--landing-stack-sm)] touch-manipulation transition-colors duration-300 hover:bg-landing-accent-soft"
                >
                  <h3 className="font-landing-display text-base font-semibold text-landing-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-[var(--landing-stack-xs)] text-sm leading-relaxed text-landing-ink-muted">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
