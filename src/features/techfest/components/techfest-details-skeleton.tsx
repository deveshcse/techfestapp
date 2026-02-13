import { Skeleton } from "@/components/ui/skeleton";


// keep your same custom primitives
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
} from "@/components/ui/field"; // adjust path if needed

export function TechFestDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      {/* ================= ACTION BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        {/* Cancel slot */}
        <div className="w-24">
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        {/* Right actions */}
        <div className="flex flex-wrap justify-end gap-2">
          <Skeleton className="h-9 w-35 rounded-md" />
          <Skeleton className="h-9 w-35 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>

      {/* ================= HERO ================= */}
      <div className="overflow-hidden rounded-lg border">
        {/* banner */}
        <Skeleton className="h-48 w-full" />

        <div className="p-4 space-y-2">
          {/* title input */}
          <Skeleton className="h-10 w-[60%]" />
        </div>
      </div>

      {/* ================= EVENT DETAILS ================= */}
      <FieldSet>
        <div className="flex items-center justify-between">
          <FieldLegend>Event Details</FieldLegend>
          <Skeleton className="h-6 w-25 rounded-md" />
        </div>

        <FieldGroup>
          {/* Date Range */}
          <Field>
            <FieldLabel>Date</FieldLabel>
            <Skeleton className="h-10 w-full" />
          </Field>

          {/* Venue */}
          <Field>
            <FieldLabel>Venue</FieldLabel>
            <div className="flex items-center gap-2 border-2 rounded-md p-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-50" />
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* ================= DESCRIPTION ================= */}
      <FieldSet>
        <FieldLegend>Description</FieldLegend>

        <Field>
          <Skeleton className="h-28 w-full" />
        </Field>
      </FieldSet>

      {/* ================= RULES ================= */}
      <FieldSet>
        <FieldLegend>Event Rules & Guidelines</FieldLegend>

        <div className="space-y-2 pl-6">
          <Skeleton className="h-4 w-65" />
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-70" />
        </div>
      </FieldSet>
    </div>
  );
}
