"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "../content/landing-copy";
import { landingPad } from "./landing-layout";

const ProductPreview = dynamic(
  () =>
    import("./product-preview").then((m) => ({ default: m.ProductPreview })),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[280px] animate-pulse rounded-xl border border-landing-ink/10 bg-landing-surface sm:min-h-[360px] sm:rounded-2xl"
        aria-hidden
      />
    ),
  }
);

export const Hero = () => {
  return (
    <section
      className="landing-atmosphere relative overflow-hidden pb-0"
      style={{ paddingTop: "var(--landing-hero-top)" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-48 w-[min(100vw,22rem)] -translate-x-1/2 rounded-full bg-landing-primary/20 blur-3xl animate-landing-glow-breathe sm:top-24 sm:h-64 sm:w-[36rem]"
        aria-hidden
      />

      <div className={landingPad}>
        <div className="w-full text-center">
          <p
            className="animate-landing-hero-rise font-landing-display text-[2.15rem] font-extrabold tracking-tight text-landing-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0ms" }}
          >
            {hero.brand}
          </p>
          <h1
            className="animate-landing-hero-rise mt-[var(--landing-stack-md)] font-landing-display text-[1.65rem] font-bold tracking-tight text-landing-ink text-balance sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            style={{ animationDelay: "80ms" }}
          >
            {hero.headline}
          </h1>
          <p
            className="animate-landing-hero-rise mx-auto mt-[var(--landing-stack-md)] w-full font-landing-body text-[0.95rem] leading-relaxed text-landing-ink-muted text-pretty sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {hero.support}
          </p>
          <div
            className="animate-landing-hero-rise mt-[var(--landing-stack-lg)] flex w-full flex-col items-stretch gap-[var(--landing-stack-sm)] sm:flex-row sm:items-center sm:justify-center"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href={hero.primaryCta.href}
              className="landing-btn-primary group w-full touch-manipulation sm:w-auto"
            >
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="landing-btn-secondary group w-full touch-manipulation sm:w-auto"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {hero.secondaryCta.label}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-[var(--landing-stack-xl)] w-full">
        <div
          className="animate-landing-hero-rise"
          style={{ animationDelay: "320ms" }}
        >
          <div className={landingPad}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-x-8 -top-10 hidden h-40 rounded-full bg-landing-primary/15 blur-3xl animate-landing-glow-breathe sm:block"
                aria-hidden
              />
              <div className="relative sm:transition-transform sm:duration-700 sm:ease-out sm:hover:-translate-y-1">
                <ProductPreview className="rounded-xl border shadow-[0_18px_50px_-28px_rgba(20,24,32,0.45)] sm:rounded-2xl sm:shadow-[0_28px_90px_-36px_rgba(20,24,32,0.5)]" />
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-landing-bg via-landing-bg/85 to-transparent sm:h-28"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
};
