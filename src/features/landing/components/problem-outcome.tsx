import { problemOutcome } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ProblemOutcome() {
  return (
    <section className="landing-section bg-landing-bg">
      <div className="landing-container">
        <SectionHeading
          eyebrow={problemOutcome.eyebrow}
          title={problemOutcome.headline}
          description={problemOutcome.support}
        />

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-landing-ink-muted">
              Before
            </p>
            <ul className="space-y-5">
              {problemOutcome.pains.map((item) => (
                <li
                  key={item.title}
                  className="rounded-r-md border-l-2 border-landing-ink/15 bg-landing-muted/40 py-4 pl-5 pr-4 transition-colors hover:bg-landing-muted/70"
                >
                  <h3 className="font-landing-display text-lg font-semibold text-landing-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-landing-ink-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-landing-primary">
              With TechFestApp
            </p>
            <ul className="space-y-5">
              {problemOutcome.outcomes.map((item) => (
                <li
                  key={item.title}
                  className="rounded-r-md border-l-2 border-landing-primary bg-landing-accent-soft/50 py-4 pl-5 pr-4 transition-colors hover:bg-landing-accent-soft"
                >
                  <h3 className="font-landing-display text-lg font-semibold text-landing-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-landing-ink-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
