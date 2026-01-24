"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
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

interface EventFormProps {
  initialData?: TechFestFormValues;
}

async function onSubmit(data: TechFestFormValues) {
  console.log(TechFestFormSchema.parse(data));
}

export function EventCreateUpdateForm({ initialData }: EventFormProps) {
  const form = useForm<TechFestFormValues>({
    resolver: zodResolver(TechFestFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      venue: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
          <FieldContent>
            <Controller
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start_date"
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError
                    errors={
                      form.formState.errors.start_date
                        ? [form.formState.errors.start_date]
                        : []
                    }
                  />
                </>
              )}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="end_date">End Date</FieldLabel>
          <FieldContent>
            <Controller
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end_date"
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError
                    errors={
                      form.formState.errors.end_date
                        ? [form.formState.errors.end_date]
                        : []
                    }
                  />
                </>
              )}
            />
          </FieldContent>
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="venue">Venue</FieldLabel>
        <FieldContent>
          <Input
            id="venue"
            placeholder="Event venue (optional)"
            {...form.register("venue")}
          />
          <FieldError
            errors={
              form.formState.errors.venue ? [form.formState.errors.venue] : []
            }
          />
        </FieldContent>
      </Field>

      <Button type="submit">Submit</Button>
    </form>
  );
}
