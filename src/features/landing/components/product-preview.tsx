"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { productShowcase } from "../content/landing-copy";

const previewByTab: Record<
  string,
  { rows: { label: string; meta: string; status: string; tone: string }[] }
> = {
  festivals: {
    rows: [
      {
        label: "AeroTech Summit 2026",
        meta: "Mar 12–14 · Main Auditorium",
        status: "Published",
        tone: "bg-emerald-500/15 text-emerald-700",
      },
      {
        label: "CodeSprint Hackathon",
        meta: "Apr 2–3 · Innovation Lab",
        status: "Draft",
        tone: "bg-amber-500/15 text-amber-800",
      },
      {
        label: "Robotics Expo",
        meta: "May 8 · Engineering Block",
        status: "Published",
        tone: "bg-emerald-500/15 text-emerald-700",
      },
    ],
  },
  activities: {
    rows: [
      {
        label: "Drone Workshop",
        meta: "Capacity 40 · 28 registered",
        status: "Open",
        tone: "bg-landing-accent-soft text-landing-primary",
      },
      {
        label: "AI Ethics Panel",
        meta: "Capacity 120 · Waitlist 14",
        status: "Full",
        tone: "bg-rose-500/10 text-rose-700",
      },
      {
        label: "Hardware Sprint",
        meta: "Capacity 60 · 41 registered",
        status: "Open",
        tone: "bg-landing-accent-soft text-landing-primary",
      },
    ],
  },
  attendance: {
    rows: [
      {
        label: "Neha Sharma",
        meta: "Drone Workshop · Check-in",
        status: "Present",
        tone: "bg-emerald-500/15 text-emerald-700",
      },
      {
        label: "Jordan Lee",
        meta: "AI Ethics Panel · Check-in",
        status: "Present",
        tone: "bg-emerald-500/15 text-emerald-700",
      },
      {
        label: "Samir Patel",
        meta: "Hardware Sprint · Check-in",
        status: "Absent",
        tone: "bg-landing-muted text-landing-ink-muted",
      },
    ],
  },
  analytics: {
    rows: [
      {
        label: "Registrations this week",
        meta: "+18% vs last week",
        status: "342",
        tone: "bg-landing-accent-soft text-landing-primary",
      },
      {
        label: "Activities at capacity",
        meta: "3 of 12 sessions",
        status: "25%",
        tone: "bg-amber-500/15 text-amber-800",
      },
      {
        label: "Check-in rate",
        meta: "Across live sessions",
        status: "91%",
        tone: "bg-emerald-500/15 text-emerald-700",
      },
    ],
  },
};

const chartHeights = [40, 65, 48, 82, 56, 90, 70];

type ProductPreviewProps = {
  className?: string;
  interactive?: boolean;
  activeTab?: string;
  onTabChange?: (id: string) => void;
};

export function ProductPreview({
  className,
  interactive = false,
  activeTab,
  onTabChange,
}: ProductPreviewProps) {
  const [internalActive, setInternalActive] = useState(
    productShowcase.tabs[0].id
  );
  const active = activeTab ?? internalActive;
  const setActive = (id: string) => {
    onTabChange?.(id);
    if (activeTab === undefined) setInternalActive(id);
  };
  const data = previewByTab[active] ?? previewByTab.festivals;
  const currentTitle =
    productShowcase.tabs.find((t) => t.id === active)?.title ??
    productShowcase.tabs[0].title;

  return (
    <div
      className={cn(
        "overflow-hidden border border-landing-ink/10 bg-landing-surface shadow-[0_28px_90px_-36px_rgba(20,24,32,0.5)] ring-1 ring-black/[0.03]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-landing-ink/8 bg-gradient-to-b from-landing-muted to-landing-muted/70 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate font-landing-body text-xs text-landing-ink-muted">
          app.techfestapp.com / dashboard
        </span>
      </div>

      <div className="grid min-h-[300px] grid-cols-[7.25rem_1fr] sm:min-h-[380px] sm:grid-cols-[11rem_1fr]">
        <aside className="border-r border-white/5 bg-landing-ink px-2.5 py-4 text-white sm:px-3">
          <p className="mb-5 px-2 font-landing-display text-sm font-semibold tracking-tight">
            TechFestApp
          </p>
          <ul className="space-y-1">
            {productShowcase.tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && setActive(tab.id)}
                  className={cn(
                    "w-full rounded-md px-2 py-2 text-left text-[11px] font-medium transition-colors sm:text-sm",
                    active === tab.id
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-white/50",
                    interactive &&
                      active !== tab.id &&
                      "hover:bg-white/5 hover:text-white/80",
                    !interactive && "cursor-default"
                  )}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="bg-landing-bg/90 p-3.5 sm:p-5">
          <div
            key={active}
            className="animate-landing-fade-swap mb-4 flex items-end justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-landing-primary sm:text-xs">
                Live overview
              </p>
              <h3 className="mt-1 truncate font-landing-display text-base font-semibold text-landing-ink sm:text-xl">
                {currentTitle}
              </h3>
            </div>
            <div
              className="hidden h-9 w-28 items-end gap-1 sm:flex"
              aria-hidden
            >
              {chartHeights.map((h, i) => (
                <span
                  key={`${active}-${i}`}
                  className="animate-landing-bar-rise w-2.5 rounded-sm bg-landing-primary/75"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 40}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          <ul key={`rows-${active}`} className="animate-landing-fade-swap space-y-2.5">
            {data.rows.map((row, index) => (
              <li
                key={row.label}
                className="group flex items-center justify-between gap-3 border border-landing-ink/8 bg-landing-surface px-3 py-3 transition-colors duration-200 hover:border-landing-primary/25 hover:bg-landing-accent-soft/40 sm:px-4"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-landing-ink">
                    {row.label}
                  </p>
                  <p className="truncate text-xs text-landing-ink-muted">
                    {row.meta}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-sm px-2 py-1 text-[11px] font-semibold",
                    row.tone
                  )}
                >
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
