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
    CreateUpdateActivityFormData,
    CreateUpdateActivityInput,
} from "../types/activity.types";
import { CreateUpdateActivityFormDataSchema } from "../schemas/activity.schema";

import { DateTimePicker } from "@/components/common/date-time-picker";
import { useCreateActivity, useUpdateActivity } from "../utils/useActivities";
import { useModalStore } from "@/store/useModalStore";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTechFestDetails } from "@/features/techfest/utils/useTechFest";

interface ActivityCreateUpdateFormProps {
    techfestId: number;
    activityId?: number;
    initialData?: CreateUpdateActivityFormData;
}

export function ActivityCreateUpdateForm({
    techfestId,
    activityId,
    initialData,
}: ActivityCreateUpdateFormProps) {
    const { close } = useModalStore();

    const { data } = useTechFestDetails(techfestId);

    const techfestLimits = {
        startDateTime: data?.start_date ? new Date(data.start_date) : undefined,
        endDateTime: data?.end_date ? new Date(data.end_date) : undefined,
    };

    /* ================= FORM ================= */

    const form = useForm<CreateUpdateActivityFormData>({
        resolver: zodResolver(CreateUpdateActivityFormDataSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                startDateTime: initialData.startDateTime
                    ? new Date(initialData.startDateTime)
                    : undefined,
                endDateTime: initialData.endDateTime
                    ? new Date(initialData.endDateTime)
                    : undefined,
            }
            : {
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
        formState: { errors, isSubmitting },
    } = form;

    /* ================= RULES FIELD ARRAY ================= */

    const { fields, append, remove } = useFieldArray<
        CreateUpdateActivityFormData,
        "rules"
    >({
        control,
        name: "rules",
    });

    /* ================= MUTATIONS ================= */

    const createActivityMutation = useCreateActivity(techfestId);
    const updateActivityMutation = useUpdateActivity(techfestId, activityId!);

    async function onSubmit(data: CreateUpdateActivityFormData) {
        try {
            const payload: CreateUpdateActivityInput = {
                ...data,
                rules: data.rules.map((rule) => rule.value),
            };

            if (activityId) {
                await updateActivityMutation.mutateAsync(payload, {
                    onSuccess: () => {
                        close();
                    },
                });
            } else {
                await createActivityMutation.mutateAsync(payload, {
                    onSuccess: () => {
                        reset();
                        close();
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    /* ================= UI ================= */

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-3xl mx-4 py-4"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                {type.replace("_", " ")}
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
            </div>

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
                    className="w-full md:w-auto"
                >
                    Add Rule
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
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
                                minDate={techfestLimits.startDateTime}
                                maxDate={techfestLimits.endDateTime}
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
                                minDate={techfestLimits.startDateTime}
                                maxDate={techfestLimits.endDateTime}
                            />
                            {errors.endDateTime && (
                                <p className="text-sm text-red-500">
                                    {errors.endDateTime.message}
                                </p>
                            )}
                        </div>
                    )}
                />
            </div>

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
            <Button
                type="submit"
                className="w-full mb-4"
                disabled={isSubmitting || createActivityMutation.isPending || updateActivityMutation.isPending}
            >
                {activityId ? "Update Activity" : "Create Activity"}
            </Button>
        </form>
    );
}
