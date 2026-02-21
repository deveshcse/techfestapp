"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { addDays, endOfDay, format, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { TechFestFormValues } from "../types/techfest.types";
import { TechFestFormSchema } from "../schemas/techfest.schema";
import { useCreateTechFest, useTechFest, useUpdateTechFest } from "../utils/useTechFest";
import { Spinner } from "@/components/ui/spinner";
import { useModalStore } from "@/store/useModalStore";

interface TechFestCreateUpdateFormProps {
  techfestId?: number;
  initialData?: TechFestFormValues;
}

export function TechFestCreateUpdateForm({ techfestId, initialData }: TechFestCreateUpdateFormProps) {
  const { close } = useModalStore();
  const { mutate: createTechFest, isPending: isCreating } = useCreateTechFest();
  const { mutate: updateTechFest, isPending: isUpdating } = useUpdateTechFest(techfestId!);

  const isPending = isCreating || isUpdating;

  async function onSubmit(data: TechFestFormValues) {
    const { from, to } = data.dateRange!;

    const payload = {
      title: data.title,
      description: data.description,
      venue: data.venue,
      start_date: from,
      end_date: to,
    };

    if (techfestId) {
      console.log("Updating TechFest with payload:", payload);
      updateTechFest(payload, {
        onSuccess: () => {
          close();
        },
      });
    } else {
      console.log("Creating TechFest with payload:", payload);
      createTechFest(payload, {
        onSuccess: () => {
          close();
        },
      });
    }
  }

  const form = useForm<TechFestFormValues>({
    resolver: zodResolver(TechFestFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      venue: "",
      dateRange: undefined,
    },
  });

  // Log validation errors to help debugging
  if (Object.keys(form.formState.errors).length > 0) {
    console.log("Form validation errors:", form.formState.errors);
  }

  const tomorrow = startOfDay(addDays(new Date(), 1));

  const { data } = useTechFest();

  const techfestList = data?.data ?? [];

  const blockedRanges = techfestList
    .filter((tf) => !techfestId || tf.id !== techfestId) // Don't block self range when editing
    .map((tf) => ({
      start: startOfDay(new Date(tf.start_date)),
      end: endOfDay(new Date(tf.end_date)),
    }));

  const isDateBlocked = (date: Date): boolean => {
    return blockedRanges.some(
      (range) => date >= range.start && date <= range.end,
    );
  };

  const isDisabled = (date: Date): boolean => {
    if (date < tomorrow) return true;
    return isDateBlocked(date);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mx-4 h-full"
    >
      <div className="space-y-4 flex-1">
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <FieldContent>
            <Input
              id="title"
              placeholder="Event title"
              {...form.register("title")}
            />
            <FieldError
              errors={
                form.formState.errors.title ? [form.formState.errors.title] : []
              }
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <FieldContent>
            <Textarea
              id="description"
              placeholder="Event description"
              className="resize-none"
              {...form.register("description")}
            />
            <FieldError
              errors={
                form.formState.errors.description
                  ? [form.formState.errors.description]
                  : []
              }
            />
          </FieldContent>
        </Field>

        {/* ✅ Date Range */}
        <Field>
          <FieldLabel>Event Duration</FieldLabel>
          <FieldContent>
            <Controller
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <>
                  <Popover >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from && field.value?.to
                          ? `${format(field.value.from, "PPP")} – ${format(field.value.to, "PPP")}`
                          : "Pick a date range"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="z-[100] w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={isDisabled}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>

                  <FieldError
                    errors={form.formState.errors.dateRange ? [form.formState.errors.dateRange] : []}
                  />
                </>
              )}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="venue">Venue</FieldLabel>
          <FieldContent>
            <Input
              id="venue"
              placeholder="Event venue"
              {...form.register("venue")}
            />
            <FieldError
              errors={
                form.formState.errors.venue ? [form.formState.errors.venue] : []
              }
            />
          </FieldContent>
        </Field>
      </div>

      <Button
        type="submit"
        className="w-full flex items-center mb-4 disabled:opacity-80 mt-auto"
        disabled={isPending}
      >
        {isPending && <Spinner className="mr-2 h-4 w-4" />}
        {techfestId ? "Update TechFest" : "Create TechFest"}
      </Button>
    </form>
  );
}
