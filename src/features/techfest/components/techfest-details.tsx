"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";

import {
  CalendarRange,
  Pencil,
  Trash2,
  Globe,
  EyeOff,
  Save,
  X,
} from "lucide-react";

import { format } from "date-fns";
import { TechFestDetails } from "../types/techfest.types";

type Props = {
  techFest: TechFestDetails;
  onSave: (data: TechFestDetails) => void;
  onDelete: () => void;
  onTogglePublish: () => void;
};

export function TechFestDetail({
  techFest,
  onSave,
  onDelete,
  onTogglePublish,
}: Props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const lock = !isEditing;

  const form = useForm<TechFestDetails>({
    defaultValues: techFest,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = form;

  const startDate = watch("start_date");
  const endDate = watch("end_date");

  const statusLabel = techFest.published ? "Published" : "Draft";

  function startEdit() {
    reset(techFest);
    setIsEditing(true);
  }

  function cancelEdit() {
    reset(techFest);
    setIsEditing(false);
  }

  async function submit(values: TechFestDetails) {
    await onSave(values);
    setIsEditing(false);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto max-w-5xl space-y-8 px-4 py-6"
    >
      {/* ================= Hero Header ================= */}
      <header className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        {/* Left: title + status */}
        <div className="space-y-2">
          <Field>
            <Input
              {...register("title", { required: "Title is required" })}
              readOnly={!isEditing}
              className="text-2xl font-semibold"
            />
            <FieldError errors={errors.title && [errors.title]} />
          </Field>

          <div className="flex items-center gap-2">
            <Badge variant={techFest.published ? "default" : "secondary"}>
              {techFest.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>

        {/* Right: actions (fixed width) */}
        <aside className="flex w-[260px] flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={isEditing ? cancelEdit : startEdit}
          >
            {isEditing ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Pencil className="mr-2 h-4 w-4" />
            )}
            {isEditing ? "Cancel Edit" : "Edit"}
          </Button>

          <Button
            type="button"
            onClick={onTogglePublish}
            variant={techFest.published ? "secondary" : "default"}
            disabled={isEditing}
          >
            {techFest.published ? (
              <EyeOff className="mr-2 h-4 w-4" />
            ) : (
              <Globe className="mr-2 h-4 w-4" />
            )}
            {techFest.published ? "Unpublish" : "Publish"}
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isEditing}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

          <Button type="submit" disabled={!isEditing || !isDirty}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </aside>
      </header>

      {/* ================= Event Details ================= */}
      <FieldSet>
        <FieldLegend>Event Details</FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel>Venue</FieldLabel>
            <Input
              {...register("venue", { required: "Venue is required" })}
              readOnly={lock}
              className={cn(
                lock && "border-none bg-transparent px-0 focus-visible:ring-0",
              )}
            />
            <FieldError errors={errors.venue && [errors.venue]} />
          </Field>

          {/* ===== Date Range ===== */}
          <Field>
            <FieldLabel>Date Range</FieldLabel>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={lock}
                  className="justify-start text-left font-normal"
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {startDate && endDate
                    ? `${format(new Date(startDate), "PPP")} → ${format(
                        new Date(endDate),
                        "PPP",
                      )}`
                    : "Select date range"}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="p-0">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  selected={{
                    from: startDate ? new Date(startDate) : undefined,
                    to: endDate ? new Date(endDate) : undefined,
                  }}
                  onSelect={(range) => {
                    if (!range) return;
                    setValue("start_date", range.from as any, {
                      shouldDirty: true,
                    });
                    setValue("end_date", range.to as any, {
                      shouldDirty: true,
                    });
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* ================= Description ================= */}
      <FieldSet>
        <FieldLegend>Description</FieldLegend>

        <Field>
          <Textarea
            rows={6}
            {...register("description", {
              required: "Description is required",
            })}
            readOnly={lock}
            className={cn(
              lock &&
                "resize-none border-none bg-transparent p-0 focus-visible:ring-0",
            )}
          />
          <FieldError errors={errors.description && [errors.description]} />
        </Field>
      </FieldSet>

      {/* ================= Rules ================= */}
      <FieldSet>
        <FieldLegend>Rules & Guidelines</FieldLegend>
        <FieldDescription>
          Rules, eligibility, and instructions for participants.
        </FieldDescription>

        <div className="rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
          No rules added yet.
        </div>
      </FieldSet>

      {/* ================= Future Sections ================= */}
      <FieldSet>
        <FieldLegend>Media (Coming Soon)</FieldLegend>
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          Image gallery & videos will appear here.
        </div>
      </FieldSet>
    </form>
  );
}
