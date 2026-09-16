"use client";

import { motion } from "motion/react";
import { problemOutcome } from "../content/landing-copy";
import { fadeLeft, fadeRight } from "./landing-motion";
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
    <section className="landing-section bg-landing-bg">
      <div className="landing-container">
        <SectionHeading
          eyebrow={problemOutcome.eyebrow}
          title={problemOutcome.headline}
          description={problemOutcome.support}
        />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.p
              variants={enter}
              transition={transition}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-landing-ink-muted sm:mb-6"
            >
              Before
            </motion.p>
            <ul className="space-y-4 sm:space-y-5">
              {problemOutcome.pains.map((item) => (
                <motion.li
                  key={item.title}
                  variants={enter}
                  transition={transition}
                  whileHover={
                    prefersReducedMotion || isMobile ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion || !isMobile ? undefined : { scale: 0.99 }
                  }
                  className="rounded-r-md border-l-2 border-landing-ink/15 bg-landing-muted/40 py-4 pl-4 pr-3 touch-manipulation transition-colors duration-300 hover:bg-landing-muted/70 sm:pl-5 sm:pr-4"
                >
                  <h3 className="font-landing-display text-base font-semibold text-landing-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-landing-ink-muted">
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
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-landing-primary sm:mb-6"
            >
              With TechFestApp
            </motion.p>
            <ul className="space-y-4 sm:space-y-5">
              {problemOutcome.outcomes.map((item) => (
                <motion.li
                  key={item.title}
                  variants={enterAlt}
                  transition={transition}
                  whileHover={
                    prefersReducedMotion || isMobile ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion || !isMobile ? undefined : { scale: 0.99 }
                  }
                  className="rounded-r-md border-l-2 border-landing-primary bg-landing-accent-soft/50 py-4 pl-4 pr-3 touch-manipulation transition-colors duration-300 hover:bg-landing-accent-soft sm:pl-5 sm:pr-4"
                >
                  <h3 className="font-landing-display text-base font-semibold text-landing-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-landing-ink-muted">
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
