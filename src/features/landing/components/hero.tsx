"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { hero } from "../content/landing-copy";
import { ProductPreview } from "./product-preview";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 96]);
  const previewScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      ref={sectionRef}
      className="landing-atmosphere relative overflow-hidden pt-28 pb-0 sm:pt-32 lg:pt-36"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-landing-primary/20 blur-3xl animate-landing-glow-breathe"
        style={prefersReducedMotion ? undefined : { y: glowY }}
        aria-hidden
      />

      <motion.div
        className="landing-container"
        style={
          prefersReducedMotion
            ? undefined
            : { y: copyY, opacity: copyOpacity }
        }
      >
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="animate-landing-hero-rise font-landing-display text-4xl font-extrabold tracking-tight text-landing-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0ms" }}
          >
            {hero.brand}
          </p>
          <h1
            className="animate-landing-hero-rise mt-5 font-landing-display text-[1.85rem] font-bold tracking-tight text-landing-ink sm:mt-6 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            style={{ animationDelay: "100ms" }}
          >
            {hero.headline}
          </h1>
          <p
            className="animate-landing-hero-rise mx-auto mt-6 max-w-2xl font-landing-body text-base leading-relaxed text-landing-ink-muted sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {hero.support}
          </p>
          <div
            className="animate-landing-hero-rise mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <Link href={hero.primaryCta.href} className="landing-btn-primary group">
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="landing-btn-secondary group"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {hero.secondaryCta.label}
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative mt-14 w-full sm:mt-16 lg:mt-20"
        style={
          prefersReducedMotion
            ? undefined
            : { y: previewY, scale: previewScale }
        }
      >
        <div
          className="animate-landing-hero-rise"
          style={{ animationDelay: "420ms" }}
        >
          <div className="landing-container px-0 sm:px-6 lg:px-8">
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-x-8 -top-10 hidden h-40 rounded-full bg-landing-primary/15 blur-3xl animate-landing-glow-breathe sm:block"
                aria-hidden
              />
              <div className="relative transition-transform duration-700 ease-out hover:-translate-y-1">
                <ProductPreview className="rounded-none border-x-0 sm:rounded-t-2xl sm:border-x" />
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-landing-bg via-landing-bg/80 to-transparent"
            aria-hidden
          />
        </div>
      </motion.div>
    </section>
  );
};
