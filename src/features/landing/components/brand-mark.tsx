import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function BrandMark({ href = "/", className, compact }: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 text-landing-ink transition-opacity hover:opacity-90",
        className
      )}
    >
      <span
        className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-landing-primary text-landing-primary-foreground shadow-sm shadow-landing-primary/25 transition-transform duration-200 group-hover:scale-105"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M5 17.5L12 5l7 12.5H5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 13.5h5.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="font-landing-display text-lg font-bold tracking-tight">
          TechFestApp
        </span>
      )}
    </Link>
  );
}
