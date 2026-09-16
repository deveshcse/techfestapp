import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "../content/landing-copy";
import { ProductPreview } from "./product-preview";

export const Hero = () => {
  return (
    <section className="landing-atmosphere relative overflow-hidden pt-28 pb-0 sm:pt-32 lg:pt-36">
      <div className="landing-container">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="animate-landing-hero-rise font-landing-display text-4xl font-extrabold tracking-tight text-landing-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0ms" }}
          >
            {hero.brand}
          </p>
          <h1
            className="animate-landing-hero-rise mt-5 font-landing-display text-[1.85rem] font-bold tracking-tight text-landing-ink sm:mt-6 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            style={{ animationDelay: "90ms" }}
          >
            {hero.headline}
          </h1>
          <p
            className="animate-landing-hero-rise mx-auto mt-6 max-w-2xl font-landing-body text-base leading-relaxed text-landing-ink-muted sm:text-lg"
            style={{ animationDelay: "170ms" }}
          >
            {hero.support}
          </p>
          <div
            className="animate-landing-hero-rise mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "250ms" }}
          >
            <Link href={hero.primaryCta.href} className="landing-btn-primary group">
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="landing-btn-secondary"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="animate-landing-hero-rise relative mt-14 w-full sm:mt-16 lg:mt-20"
        style={{ animationDelay: "340ms" }}
      >
        <div className="landing-container px-0 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-8 -top-10 hidden h-40 rounded-full bg-landing-primary/10 blur-3xl sm:block"
              aria-hidden
            />
            <ProductPreview className="relative rounded-none border-x-0 sm:rounded-t-2xl sm:border-x" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-landing-bg via-landing-bg/80 to-transparent"
          aria-hidden
        />
      </div>
    </section>
  );
};
