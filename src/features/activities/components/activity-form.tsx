"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ActivityType } from "@/generated/prisma/enums";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Trash } from "lucide-react";

import {
  CreateActivityFormData,
  CreateActivityInput,
} from "../types/activity.types";
import { CreateActivityFormDataSchema } from "../schemas/activity.schema";

import { DateTimePicker } from "@/components/common/date-time-picker";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateActivityForm() {
  /* ================= FORM ================= */

  const form = useForm<CreateActivityFormData>({
    resolver: zodResolver(CreateActivityFormDataSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      type: ActivityType.OTHER,
      rules: [],
      capacity: 100,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  /* ================= RULES FIELD ARRAY ================= */

  const { fields, append, remove } = useFieldArray<
    CreateActivityFormData,
    "rules"
  >({
    control,
    name: "rules",
  });

  /* ================= SUBMIT ================= */

  async function onSubmit(data: CreateActivityFormData) {
    try {
      console.log("Create activity payload →", data);

      // await createActivityMutation.mutateAsync(data)
      const payload: CreateActivityInput = {
        ...data,
        rules: data.rules.map((rule) => rule.value),
      };

      console.log("Transformed payload →", payload);

      reset();
    } catch (error) {
      console.error(error);
    }
  }

  // ✅ mock techfest range
  const techfest = {
    startDateTime: new Date("2026-03-10T09:00:00"),
    endDateTime: new Date("2026-03-15T18:00:00"),
  };
  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-4"
    >
      {/* TITLE */}
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Activity title" />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </Field>
        )}
      />

      {/* DESCRIPTION */}
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea {...field} placeholder="Activity description" />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </Field>
        )}
      />

      {/* VENUE */}
      <Controller
        control={control}
        name="venue"
        render={({ field }) => (
          <Field>
            <FieldLabel>Venue</FieldLabel>
            <Input {...field} placeholder="Venue" />
            {errors.venue && (
              <p className="text-sm text-red-500">{errors.venue.message}</p>
            )}
          </Field>
        )}
      />

      {/* TYPE */}
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Field>
            <FieldLabel>Type</FieldLabel>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Activity Type</SelectLabel>

                  {Object.values(ActivityType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </Field>
        )}
      />

      {/* RULES */}
      <div className="space-y-2">
        <FieldLabel>Rules</FieldLabel>

        {fields.map((item, index) => (
          <div key={item.id} className="space-y-1">
            <div className="flex gap-2">
              <Controller
                control={control}
                name={`rules.${index}.value`}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={`Rule ${index + 1}`}
                  />
                )}
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash size={16} />
              </Button>
            </div>

            {errors.rules?.[index]?.value && (
              <p className="text-sm text-red-500">
                {errors.rules[index]?.value?.message}
              </p>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ value: "" })}
        >
          Add Rule
        </Button>
      </div>

      {/* START DATE */}
      <Controller
        control={control}
        name="startDateTime"
        render={({ field }) => (
          <div>
            <DateTimePicker
              label="Start Date & Time"
              value={field.value}
              onChange={field.onChange}
              minDate={techfest.startDateTime}
              maxDate={techfest.endDateTime}
            />
            {errors.startDateTime && (
              <p className="text-sm text-red-500">
                {errors.startDateTime.message}
              </p>
            )}
          </div>
        )}
      />

      {/* END DATE */}
      <Controller
        control={control}
        name="endDateTime"
        render={({ field }) => (
          <div>
            <DateTimePicker
              label="End Date & Time"
              value={field.value}
              onChange={field.onChange}
              minDate={techfest.startDateTime}
              maxDate={techfest.endDateTime}
            />
            {errors.endDateTime && (
              <p className="text-sm text-red-500">
                {errors.endDateTime.message}
              </p>
            )}
          </div>
        )}
      />

      {/* CAPACITY */}
      <Controller
        control={control}
        name="capacity"
        render={({ field }) => (
          <Field>
            <FieldLabel>Capacity</FieldLabel>

            <Input
              type="number"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />

            {errors.capacity && (
              <p className="text-sm text-red-500">{errors.capacity.message}</p>
            )}
          </Field>
        )}
      />

      {/* SUBMIT */}
      <Button type="submit" className="w-full mb-4">
        Create Activity
      </Button>
    </form>
  );
}
