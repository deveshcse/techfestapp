import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cta } from "../content/landing-copy";
import { Reveal } from "./reveal";

export const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-landing-primary py-20 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 14px, rgba(0,0,0,0.07) 14px, rgba(0,0,0,0.07) 15px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-black/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-landing-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            {cta.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-landing-body text-base leading-relaxed text-white/88 sm:text-lg">
            {cta.support}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href={cta.primaryCta.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-landing-ink px-8 text-base font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-landing-ink/90 hover:shadow-xl active:scale-[0.98]"
            >
              {cta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={cta.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/45 bg-transparent px-8 text-base font-semibold text-white transition-[background-color,border-color,transform] duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98]"
            >
              {cta.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">{cta.note}</p>
        </Reveal>
      </div>
    </section>
  );
};
