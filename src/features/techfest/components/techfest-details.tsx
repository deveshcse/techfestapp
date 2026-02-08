"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Trash2,
  Pencil,
  Globe,
  Plus,
  ClosedCaption,
  Cross,
  Circle,
  CircleX,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";

import { TechFestDetails } from "../types/techfest.types";
import { Access } from "@/features/auth/components/permission/access";

type Props = {
  techFest: TechFestDetails;
  onSave: (data: TechFestDetails) => Promise<void>;
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

  const form = useForm<TechFestDetails>({
    defaultValues: techFest,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = form;

  const lock = !isEditing;
  const startDate = watch("start_date");
  const endDate = watch("end_date");

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
      className="mx-auto max-w-5xl space-y-6 px-4 py-6"
    >
      {/* ================= ACTION BAR ================= */}
      <div className="flex flex-col md:flex-row justify-end gap-2">
        <Button size="sm" type="button" onClick={onTogglePublish}>
          <Plus className="mr-2 h-4 w-4" />
          View Activities
        </Button>

        <Access resource="techfest" action="publish">
          <Button size="sm" type="button" onClick={onTogglePublish}>
            <Globe className="mr-2 h-4 w-4" />
            {techFest.published ? "Unpublish" : "Publish"}
          </Button>
        </Access>
        <Access resource="techfest" action="delete">
          <Button
            size="sm"
            type="button"
            variant="destructive"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </Access>

        <Access resource="techfest" action="update">
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={isEditing ? cancelEdit : startEdit}
            className="flex items-center justify-center gap-2 md:w-24" // fixed width
          >
            {/* Icon slot (same size always) */}
            <span className="inline-flex w-4 h-4">
              {isEditing ? (
                <CircleX className="h-4 w-4" />
              ) : (
                <Pencil className="h-4 w-4" />
              )}
            </span>

            {/* Text slot (same font, no margin change) */}
            <span className="leading-none">
              {isEditing ? "Cancel" : "Edit"}
            </span>
          </Button>
        </Access>
      </div>

      {/* ================= HERO BANNER ================= */}
      <div className="overflow-hidden rounded-lg border">
        <img
          src="/techfest-banner.png"
          alt="TechFest banner"
          className="h-48 w-full object-cover"
        />

        <div className="p-4">
          <Field>
            <Input
              {...register("title", { required: "Title is required" })}
              readOnly={lock}
              aria-readonly={lock}
              className="font-bold"
            />
            <FieldError errors={errors.title && [errors.title]} />
          </Field>
        </div>
      </div>

      {/* ================= EVENT DETAILS ================= */}
      <FieldSet>
        <div className="flex items-center justify-between">
          <FieldLegend>Event Details</FieldLegend>

          <Badge
            data-status={techFest.published ? "published" : "unpublished"}
            className=" data-[status=published]:bg-green-500 data-[status=published]:text-white data-[status=unpublished]:bg-muted data-[status=unpublished]:text-muted-foreground"
          >
            {techFest.published ? "Published" : "Unpublished"}
          </Badge>
        </div>

        <FieldGroup>
          {/* Date Range */}
          <Field>
            <FieldLabel>Date</FieldLabel>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={lock}
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate && endDate
                    ? `${format(new Date(startDate), "PPP")} – ${format(
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

          {/* Venue */}
          <Field>
            <FieldLabel>Venue</FieldLabel>
            <div className="flex items-center gap-2  border-2 rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
              <MapPin className="mx-2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("venue", { required: "Venue is required" })}
                readOnly={lock}
                aria-readonly={lock}
                className="border-0 px-0 text-sm focus:ring-0  focus-visible:ring-0"
              />
            </div>
            <FieldError errors={errors.venue && [errors.venue]} />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* ================= DESCRIPTION ================= */}
      <FieldSet>
        <FieldLegend>Description</FieldLegend>

        <Field>
          <Textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            readOnly={lock}
            aria-readonly={lock}
          />
          <FieldError errors={errors.description && [errors.description]} />
        </Field>
      </FieldSet>

      {/* ================= RULES ================= */}
      <FieldSet>
        <FieldLegend>Event Rules & Guidelines</FieldLegend>

        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>Participants must carry a valid ID</li>
          <li>Follow all safety guidelines</li>
          <li>Respectful behavior is expected</li>
        </ul>
      </FieldSet>

      {/* ================= SAVE ================= */}
      {isEditing && (
        <div className="flex justify-end">
          <Button type="submit" disabled={!isDirty}>
            Save Changes
          </Button>
        </div>
      )}
    </form>
  );
}
