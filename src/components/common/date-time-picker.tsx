"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  label: string;
  value?: Date;
  onChange: (date?: Date) => void;

  // NEW
  minDate?: Date; // techfest start
  maxDate?: Date; // techfest end
}

export function DateTimePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
}: Props) {
  const [open, setOpen] = React.useState(false);

  /* ===== check if date is within allowed range ===== */
  function isDateDisabled(date: Date) {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
      return true;
    return false;
  }

  /* ===== update only date ===== */
  function handleDateChange(selected?: Date) {
    if (!selected) return onChange(undefined);

    const base = value ?? new Date();

    selected.setHours(base.getHours(), base.getMinutes(), 0);
    onChange(new Date(selected));
    setOpen(false);
  }

  /* ===== update only time ===== */
  function handleTimeChange(time: string) {
    if (!value) return;

    const [hours, minutes] = time.split(":").map(Number);

    const updated = new Date(value);
    updated.setHours(hours, minutes, 0);

    onChange(updated);
  }

  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(
        value.getMinutes(),
      ).padStart(2, "0")}`
    : "";

  return (
    <FieldGroup className="flex-row">
      {/* DATE */}
      <Field>
        <FieldLabel>{label}</FieldLabel>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-40 justify-between font-normal"
            >
              {value ? format(value, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              defaultMonth={value}
              onSelect={handleDateChange}
              disabled={isDateDisabled} 
            />
          </PopoverContent>
        </Popover>
      </Field>

      {/* TIME */}
      <Field className="w-32">
        <FieldLabel>Time</FieldLabel>

        <Input
          type="time"
          value={timeValue}
          onChange={(e) => handleTimeChange(e.target.value)}
          step="1"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
        />
      </Field>
    </FieldGroup>
  );
}
