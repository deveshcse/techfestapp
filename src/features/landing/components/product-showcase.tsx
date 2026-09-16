"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { productShowcase } from "../content/landing-copy";
import { ProductPreview } from "./product-preview";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ProductShowcase() {
  const [active, setActive] = useState(productShowcase.tabs[0].id);
  const current =
    productShowcase.tabs.find((t) => t.id === active) ?? productShowcase.tabs[0];

  return (
    <section id="product" className="landing-section scroll-mt-20 bg-landing-muted/55">
      <div className="landing-container">
        <SectionHeading
          eyebrow={productShowcase.eyebrow}
          title={productShowcase.headline}
          description={productShowcase.support}
        />

        <Reveal className="mt-12" delayMs={80}>
          <div
            role="tablist"
            aria-label="Product areas"
            className="flex flex-wrap justify-center gap-2"
          >
            {productShowcase.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "rounded-md px-4 py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200",
                  active === tab.id
                    ? "bg-landing-ink text-white shadow-md shadow-landing-ink/20"
                    : "bg-landing-surface text-landing-ink-muted hover:text-landing-ink"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div key={active} className="animate-landing-fade-swap">
              <h3 className="font-landing-display text-2xl font-bold text-landing-ink sm:text-[1.75rem]">
                {current.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-landing-ink-muted">
                {current.description}
              </p>
              <div className="mt-6 h-px w-16 bg-landing-primary" aria-hidden />
            </div>
            <ProductPreview
              interactive
              activeTab={active}
              onTabChange={setActive}
              className="rounded-xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
