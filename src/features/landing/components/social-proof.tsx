"use client";

import { socialProof } from "../content/landing-copy";
import {
  landingPad,
  landingSectionCompactY,
  landingStackAfterHeading,
} from "./landing-layout";

export function SocialProof() {
  const loop = [...socialProof.orgs, ...socialProof.orgs];

  return (
    <section
      className={`border-y border-landing-ink/8 bg-landing-surface ${landingSectionCompactY}`}
    >
      <div className={landingPad}>
        <p className="landing-eyebrow text-center">{socialProof.eyebrow}</p>
        <h2 className="mt-(--landing-stack-sm) text-center font-landing-display text-xl font-bold tracking-tight text-landing-ink text-balance sm:text-3xl">
          {socialProof.headline}
        </h2>
      </div>

      <div className={`relative overflow-hidden ${landingStackAfterHeading}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-landing-surface to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-landing-surface to-transparent sm:w-28" />
        <div className="animate-landing-marquee flex w-max items-center gap-(--landing-stack-sm) whitespace-nowrap px-(--landing-gutter) sm:gap-(--landing-stack-md)">
          {loop.map((org, i) => (
            <span
              key={`${org}-${i}`}
              className="inline-flex items-center gap-(--landing-stack-sm) sm:gap-(--landing-stack-md)"
            >
              <span className="font-landing-display text-base font-semibold text-landing-ink/30 sm:text-xl sm:transition-all sm:duration-300 sm:hover:scale-105 sm:hover:text-landing-ink/55">
                {org}
              </span>
              <span
                className="size-1.5 shrink-0 rounded-full bg-landing-primary/35"
                aria-hidden
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
