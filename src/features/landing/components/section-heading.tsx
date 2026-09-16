import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "landing-eyebrow",
          light && "text-orange-300"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "landing-title mt-3",
          light && "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "landing-lede mt-4",
            light && "text-white/65",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
