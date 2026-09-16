"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "../content/landing-copy";
import { ProductPreview } from "./product-preview";
import { useLandingMotionPrefs } from "./use-landing-motion";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { enableParallax, prefersReducedMotion, isMobile } =
    useLandingMotionPrefs();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -24 : -72]
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, isMobile ? 0.7 : 0.55],
    [1, isMobile ? 0.35 : 0]
  );
  const previewY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? 32 : 96]
  );
  const previewScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isMobile ? 0.98 : 0.94]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 16 : 48]);

  return (
    <section
      ref={sectionRef}
      className="landing-atmosphere relative overflow-hidden pt-24 pb-0 sm:pt-32 lg:pt-36"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-20 h-48 w-[min(100vw,22rem)] -translate-x-1/2 rounded-full bg-landing-primary/20 blur-3xl animate-landing-glow-breathe sm:top-24 sm:h-64 sm:w-[36rem]"
        style={enableParallax ? { y: glowY } : undefined}
        aria-hidden
      />

      <motion.div
        className="landing-container"
        style={
          enableParallax
            ? { y: copyY, opacity: copyOpacity }
            : prefersReducedMotion
              ? undefined
              : isMobile
                ? { opacity: copyOpacity }
                : undefined
        }
      >
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="animate-landing-hero-rise font-landing-display text-[2.15rem] font-extrabold tracking-tight text-landing-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0ms" }}
          >
            {hero.brand}
          </p>
          <h1
            className="animate-landing-hero-rise mt-4 font-landing-display text-[1.65rem] font-bold tracking-tight text-landing-ink sm:mt-6 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            style={{ animationDelay: "80ms" }}
          >
            {hero.headline}
          </h1>
          <p
            className="animate-landing-hero-rise mx-auto mt-4 max-w-xl px-1 font-landing-body text-[0.95rem] leading-relaxed text-landing-ink-muted sm:mt-6 sm:max-w-2xl sm:px-0 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {hero.support}
          </p>
          <div
            className="animate-landing-hero-rise mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href={hero.primaryCta.href}
              className="landing-btn-primary group min-h-12 w-full touch-manipulation sm:w-auto"
            >
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="landing-btn-secondary group min-h-12 w-full touch-manipulation sm:w-auto"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {hero.secondaryCta.label}
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative mt-10 w-full sm:mt-16 lg:mt-20"
        style={enableParallax ? { y: previewY, scale: previewScale } : undefined}
      >
        <div
          className="animate-landing-hero-rise"
          style={{ animationDelay: "320ms" }}
        >
          <div className="landing-container px-0 sm:px-6 lg:px-8">
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-x-8 -top-10 hidden h-40 rounded-full bg-landing-primary/15 blur-3xl animate-landing-glow-breathe sm:block"
                aria-hidden
              />
              <div className="relative sm:transition-transform sm:duration-700 sm:ease-out sm:hover:-translate-y-1">
                <ProductPreview className="rounded-none border-x-0 shadow-[0_18px_50px_-28px_rgba(20,24,32,0.45)] sm:rounded-t-2xl sm:border-x sm:shadow-[0_28px_90px_-36px_rgba(20,24,32,0.5)]" />
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-landing-bg via-landing-bg/85 to-transparent sm:h-28"
            aria-hidden
          />
        </div>
      </motion.div>
    </section>
  );
};
