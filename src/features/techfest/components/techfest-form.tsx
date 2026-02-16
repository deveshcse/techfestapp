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
import { useCreateTechFest, useTechFest } from "../utils/useTechFest";
import { Spinner } from "@/components/ui/spinner";
// import { useAuth } from "@/features/auth/context/auth-context";
// import { authClient } from "@/lib/auth-client";


interface EventFormProps {
  initialData?: TechFestFormValues;
}


export function EventCreateUpdateForm({ initialData }: EventFormProps) {
  // const { user, isAuthenticated } = useAuth();

  // if (user && isAuthenticated) {
  //   const canCreateTechfest = authClient.admin.checkRolePermission({
  //     permission: {
  //       techfest: ["create"],
  //     },
  //     role: user?.role,
  //   });
  //   console.log("User can create techfest:", canCreateTechfest);
  // }

  const { mutate: createTechFest, isPending } = useCreateTechFest();

  async function onSubmit(data: TechFestFormValues) {
    const { from, to } = data.dateRange!;

    createTechFest({
      title: data.title,
      description: data.description,
      venue: data.venue,
      start_date: from,
      end_date: to,
    });
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

  const tomorrow = startOfDay(addDays(new Date(), 1));

  const { data } = useTechFest();

  const techfestList = data?.data ?? [];

  const blockedRanges = techfestList.map((tf) => ({
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
      className="flex flex-col justify-between h-screen mx-4"
    >
      <div className="space-y-4">
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
                  <Popover>
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

                    <PopoverContent className="w-auto p-0" align="start">
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
                    errors={
                      form.formState.errors.dateRange
                        ? [form.formState.errors.dateRange]
                        : []
                    }
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
        className="mb-4 flex items-center disabled:opacity-80"
        disabled={isPending}
      >
        <span className=" h-4 w-4">
          {isPending && <Spinner className="h-4 w-4" />}
        </span>
        Submit
      </Button>
    </form>
  );
}
