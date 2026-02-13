"use client";

import * as React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Trash2,
  Pencil,
  Globe,
  CircleX,
  List,
  Save,
} from "lucide-react";

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

import { TechFestDetails, UpdateTechFestInput } from "../types/techfest.types";
import { Access } from "@/features/auth/components/permission/access";
import { useTechFestActions } from "../utils/useTechFest";
import Link from "next/link";
import Image from "next/image";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
  techFest: TechFestDetails;
};

export function TechFestDetail({ techFest }: Props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const { update, toggle, remove } = useTechFestActions(techFest.id);
  const confirm = useConfirm()


  const form = useForm<TechFestDetails>({
    defaultValues: techFest,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = form;

  // ✅ useWatch instead of watch (fix compiler warning)
  const startDate = useWatch({ control, name: "start_date" });
  const endDate = useWatch({ control, name: "end_date" });

  const lock = !isEditing;

  function startEdit() {
    reset(techFest);
    setIsEditing(true);
  }

  function cancelEdit() {
    reset(techFest);
    setIsEditing(false);
  }

  function submit(values: UpdateTechFestInput) {
    update.mutate(values, {
      onSuccess: () => setIsEditing(false),
    });
  }

  function onTogglePublish() {
    toggle.mutate();
  }

  const handleDelete = async () => {
  await confirm({
    title: "Delete TechFest?",
    description: "This action will permanently delete the TechFest and all associated data. Are you sure you want to proceed?",
    destructive: true,
    confirmText: "Delete",
    onConfirm: () => remove.mutateAsync(),
  })
}


  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto max-w-5xl space-y-6 px-4 py-6"
    >
      {/* ================= ACTION BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        {/* LEFT SIDE — always reserve space */}
        <div className="w-24">
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={cancelEdit}
            className={!isEditing ? "opacity-0 pointer-events-none" : ""}
          >
            <CircleX className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap justify-end gap-2">
          <Button size="sm" type="button" asChild>
            <Link href={`/dashboard/techfest/${techFest.id}/activities`}>
              <List className="mr-2 h-4 w-4" />
              View Activities
            </Link>
          </Button>

          <Access resource="techfest" action="publish">
            <Button
              size="sm"
              type="button"
              onClick={onTogglePublish}
              disabled={toggle.isPending || isEditing}
            >
              <Globe className="mr-2 h-4 w-4" />
              {techFest.published ? "Unpublish" : "Publish"}
            </Button>
          </Access>

          <Access resource="techfest" action="delete">
            <Button
              size="sm"
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={remove.isPending || isEditing}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </Access>

          {/* FIXED WIDTH SLOT for Edit/Save */}
          <Access resource="techfest" action="update">
            <Button
              size="sm"
              type={isEditing ? "submit" : "button"}
              variant={isEditing ? "default" : "outline"}
              onClick={!isEditing ? startEdit : undefined}
              disabled={isEditing && (!isDirty || update.isPending)}
              className="w-24 justify-center"
            >
              <span className="inline-flex w-4 h-4 mr-2">
                {isEditing ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
              </span>

              {isEditing ? "Save" : "Edit"}
            </Button>
          </Access>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <div className="overflow-hidden rounded-lg border">
        <Image
          src="https://picsum.photos/seed/picsum/200"
          alt="TechFest banner"
          className="h-48 w-full object-cover"
          width={400}
          height={200}
        />

        <div className="p-4">
          <Field>
            <Input
              {...register("title", { required: "Title is required" })}
              readOnly={lock}
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
            className="data-[status=published]:bg-green-500 data-[status=published]:text-white data-[status=unpublished]:bg-muted data-[status=unpublished]:text-muted-foreground"
          >
            {techFest.published ? "Published" : "Unpublished"}
          </Badge>
        </div>

        <FieldGroup>
          {/* ✅ CONTROLLED DATE RANGE */}
          <Field>
            <FieldLabel>Date</FieldLabel>

            <Controller
              control={control}
              name="start_date"
              render={({ field }) => (
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field: endField }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={lock}
                          className="w-full justify-start text-left font-normal"
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

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          numberOfMonths={2}
                          selected={{
                            from: field.value
                              ? new Date(field.value)
                              : undefined,
                            to: endField.value
                              ? new Date(endField.value)
                              : undefined,
                          }}
                          onSelect={(range) => {
                            if (!range) return;
                            field.onChange(range.from);
                            endField.onChange(range.to);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              )}
            />
          </Field>

          {/* Venue */}
          <Field>
            <FieldLabel>Venue</FieldLabel>

            <div className="flex items-center gap-2 border-2 rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
              <MapPin className="mx-2 h-4 w-4 text-muted-foreground" />

              <Input
                {...register("venue", { required: "Venue is required" })}
                readOnly={lock}
                className="border-0 px-0 text-sm focus:ring-0 focus-visible:ring-0"
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
    </form>
  );
}
