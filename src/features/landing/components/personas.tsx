"use client";

import { motion, useReducedMotion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { personas } from "../content/landing-copy";
import {
  landingCardPad,
  landingGap,
  landingPad,
  landingSectionY,
  landingStackAfterHeading,
} from "./landing-layout";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Personas() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className={`bg-landing-ink text-white ${landingSectionY}`}>
      <div className={landingPad}>
        <SectionHeading
          eyebrow={personas.eyebrow}
          title={personas.headline}
          description={personas.support}
          light
        />

        <div
          className={`grid md:grid-cols-3 ${landingGap} ${landingStackAfterHeading}`}
        >
          {personas.items.map((item, index) => (
            <Reveal
              key={item.role}
              delayMs={isMobile ? Math.min(index * 80, 100) : index * 80}
            >
              <motion.article
                whileHover={
                  prefersReducedMotion || isMobile
                    ? undefined
                    : { y: -4, borderColor: "rgba(255,255,255,0.2)" }
                }
                whileTap={
                  prefersReducedMotion || !isMobile
                    ? undefined
                    : { scale: 0.99 }
                }
                transition={{ duration: 0.25 }}
                className={`group relative h-full overflow-hidden border border-white/10 bg-white/[0.04] touch-manipulation ${landingCardPad}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-landing-primary transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="font-landing-display text-xs font-bold uppercase tracking-[0.16em] text-orange-300/80">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-(--landing-stack-md) font-landing-display text-xl font-bold">
                  {item.role}
                </h3>
                <p className="mt-(--landing-stack-md) text-sm leading-relaxed text-white/68">
                  {item.description}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
