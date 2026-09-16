import { socialProof } from "../content/landing-copy";
import { Reveal } from "./reveal";

export function SocialProof() {
  const loop = [...socialProof.orgs, ...socialProof.orgs];

  return (
    <section className="border-y border-landing-ink/8 bg-landing-surface py-12 sm:py-16">
      <div className="landing-container">
        <Reveal>
          <p className="landing-eyebrow text-center">{socialProof.eyebrow}</p>
          <h2 className="mt-3 text-center font-landing-display text-2xl font-bold tracking-tight text-landing-ink sm:text-3xl">
            {socialProof.headline}
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-landing-surface to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-landing-surface to-transparent sm:w-28" />
        <div className="animate-landing-marquee flex w-max items-center gap-3 whitespace-nowrap px-4 sm:gap-4">
          {loop.map((org, i) => (
            <span
              key={`${org}-${i}`}
              className="inline-flex items-center gap-3 sm:gap-4"
            >
              <span className="font-landing-display text-lg font-semibold text-landing-ink/30 transition-colors duration-300 hover:text-landing-ink/55 sm:text-xl">
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
