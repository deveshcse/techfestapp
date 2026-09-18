"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { productShowcase } from "../content/landing-copy";
import { landingEase } from "./landing-motion";

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
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
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

  const renderTabs = (layout: "mobile" | "desktop") => (
    <ul
      className={
        layout === "mobile"
          ? "flex w-max min-w-full snap-x snap-mandatory gap-1.5 overflow-x-auto px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "flex flex-col space-y-1"
      }
    >
      {productShowcase.tabs.map((tab) => (
        <li
          key={`${layout}-${tab.id}`}
          className={layout === "mobile" ? "snap-start" : undefined}
        >
          <motion.button
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setActive(tab.id)}
            whileHover={
              interactive &&
              !prefersReducedMotion &&
              layout === "desktop" &&
              active !== tab.id
                ? { x: 2 }
                : undefined
            }
            whileTap={
              interactive && !prefersReducedMotion ? { scale: 0.97 } : undefined
            }
            className={cn(
              "rounded-md font-medium touch-manipulation transition-colors",
              layout === "mobile"
                ? "whitespace-nowrap px-3 py-2 text-xs"
                : "w-full px-2 py-2 text-left text-sm",
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
          </motion.button>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "overflow-hidden border border-landing-ink/10 bg-landing-surface shadow-[0_28px_90px_-36px_rgba(20,24,32,0.5)] ring-1 ring-black/[0.03]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-landing-ink/8 bg-gradient-to-b from-landing-muted to-landing-muted/70 px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="size-2 rounded-full bg-[#FF5F57] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#FEBC2E] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#28C840] sm:size-2.5" />
        <span className="ml-2 truncate font-landing-body text-[10px] text-landing-ink-muted sm:ml-3 sm:text-xs">
          app.techfestapp.com / dashboard
        </span>
      </div>

      <div className="border-b border-white/5 bg-landing-ink text-white md:hidden">
        {renderTabs("mobile")}
      </div>

      <div className="grid min-h-[260px] grid-cols-1 sm:min-h-[340px] md:min-h-[380px] md:grid-cols-[11rem_1fr]">
        <aside className="hidden border-r border-white/5 bg-landing-ink px-3 py-4 text-white md:block">
          <p className="mb-5 px-2 font-landing-display text-sm font-semibold tracking-tight">
            TechFestApp
          </p>
          {renderTabs("desktop")}
        </aside>

        <div className="bg-landing-bg/90 p-3 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: isMobile ? 6 : 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? undefined : { opacity: 0, y: -6 }
              }
              transition={{ duration: isMobile ? 0.22 : 0.3, ease: landingEase }}
            >
              <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-landing-primary sm:text-xs">
                    Live overview
                  </p>
                  <p className="mt-1 truncate font-landing-display text-sm font-semibold text-landing-ink sm:text-xl">
                    {currentTitle}
                  </p>
                </div>
                <div
                  className="hidden h-9 w-28 items-end gap-1 sm:flex"
                  aria-hidden
                >
                  {chartHeights.map((h, i) => (
                    <motion.span
                      key={`${active}-${i}`}
                      className="w-2.5 rounded-sm bg-landing-primary/75"
                      initial={
                        prefersReducedMotion
                          ? false
                          : { scaleY: 0, opacity: 0 }
                      }
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: landingEase,
                        delay: i * 0.04,
                      }}
                      style={{
                        height: `${h}%`,
                        originY: 1,
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-2.5">
                {data.rows.map((row, index) => (
                  <motion.li
                    key={row.label}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: isMobile ? 6 : 0, x: isMobile ? 0 : 8 }
                    }
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: landingEase,
                      delay: 0.04 + index * (isMobile ? 0.03 : 0.04),
                    }}
                    className="group flex items-center justify-between gap-2 border border-landing-ink/8 bg-landing-surface px-2.5 py-2.5 transition-colors duration-200 active:bg-landing-accent-soft/40 sm:gap-3 sm:px-4 sm:py-3 sm:hover:border-landing-primary/25 sm:hover:bg-landing-accent-soft/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-landing-ink sm:text-sm">
                        {row.label}
                      </p>
                      <p className="truncate text-[11px] text-landing-ink-muted sm:text-xs">
                        {row.meta}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold sm:px-2 sm:py-1 sm:text-[11px]",
                        row.tone
                      )}
                    >
                      {row.status}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
