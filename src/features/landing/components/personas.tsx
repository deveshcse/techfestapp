import { personas } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Personas() {
  return (
    <section className="landing-section bg-landing-ink text-white">
      <div className="landing-container">
        <SectionHeading
          eyebrow={personas.eyebrow}
          title={personas.headline}
          description={personas.support}
          light
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {personas.items.map((item, index) => (
            <Reveal key={item.role} delayMs={index * 80}>
              <article className="group relative h-full overflow-hidden border border-white/10 bg-white/[0.04] p-6 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] sm:p-7">
                <div
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-landing-primary transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="font-landing-display text-xs font-bold uppercase tracking-[0.16em] text-orange-300/80">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-landing-display text-xl font-bold">
                  {item.role}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/68">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
