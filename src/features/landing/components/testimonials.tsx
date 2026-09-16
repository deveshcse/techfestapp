import { testimonials } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section className="landing-section bg-landing-muted/45">
      <div className="landing-container">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.headline}
          description={testimonials.support}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {testimonials.items.map((item, index) => (
            <Reveal key={item.name} delayMs={index * 80}>
              <blockquote className="flex h-full flex-col border-t-2 border-landing-primary pt-6 transition-[padding] duration-300 hover:pt-7">
                <p className="flex-1 text-base leading-relaxed text-landing-ink sm:text-[1.05rem]">
                  <span className="font-landing-display text-3xl leading-none text-landing-primary/40">
                    “
                  </span>
                  {item.quote}
                </p>
                <footer className="mt-8 flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-landing-accent-soft font-landing-display text-sm font-bold text-landing-primary"
                    aria-hidden
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-landing-ink">{item.name}</p>
                    <p className="mt-0.5 text-sm text-landing-ink-muted">
                      {item.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
