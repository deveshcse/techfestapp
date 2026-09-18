import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
  compact?: boolean;
  /** Icon tile size */
  size?: "sm" | "md";
};

function BrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none">
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
  );
}

export function BrandMark({
  href = "/",
  className,
  compact,
  size = "md",
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 text-landing-ink transition-opacity hover:opacity-90",
        className
      )}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-lg bg-landing-primary text-landing-primary-foreground shadow-sm shadow-landing-primary/25 transition-transform duration-200 group-hover:scale-105",
          size === "sm" ? "size-7" : "size-8"
        )}
        aria-hidden
      >
        <BrandIcon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </span>
      {!compact && (
        <span className="font-landing-display text-lg font-bold tracking-tight">
          TechFestApp
        </span>
      )}
    </Link>
  );
}

export { BrandIcon };
