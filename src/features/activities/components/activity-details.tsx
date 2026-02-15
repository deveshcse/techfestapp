"use client";

import * as React from "react";
import { useForm, Controller, useWatch, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import {
    CalendarIcon,
    MapPin,
    Trash2,
    Pencil,
    CircleX,
    Save,
    Clock,
    Users,
    Info,
} from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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

import { Activity, UpdateActivityInput, ActivityStatus, ActivityType } from "../types/activity.types";
import { useActivityActions } from "../utils/useActivities";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { ac } from "@/lib/permissions";
import { DateTimePicker } from "@/components/common/date-time-picker";

type Props = {
    techfestId: number;
    activity: UpdateActivityInput;
};

const statusStyles: Record<ActivityStatus, string> = {
    DRAFT: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PUBLISHED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
    COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
};

export function ActivityDetails({ techfestId, activity }: Props) {



    const [isEditing, setIsEditing] = React.useState(false);
    const { update_activity, delete_activity } = useActivityActions(techfestId, activity.id);
    const confirm = useConfirm();

    const form = useForm<UpdateActivityInput>({
        defaultValues: activity,
        mode: "onBlur",
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty },
    } = form;

    const startDateTime = useWatch({ control, name: "startDateTime" });
    const endDateTime = useWatch({ control, name: "endDateTime" });

    const lock = !isEditing;

    function startEdit() {
        reset(activity);
        setIsEditing(true);
    }

    function cancelEdit() {
        reset(activity);
        setIsEditing(false);
    }

    function submit(values: UpdateActivityInput) {
        update_activity.mutate(values, {
            onSuccess: () => setIsEditing(false),
        });
    }

    const { fields, append, remove } = useFieldArray<
        UpdateActivityInput,
        "rules"
    >({
        control,
        name: "rules",
    });

    const handleDelete = async () => {
        await confirm({
            title: "Delete Activity?",
            description: "This action will permanently delete the activity. Are you sure you want to proceed?",
            destructive: true,
            confirmText: "Delete",
            actionLabel: "Deleting",
            icon: <Trash2 className="h-4 w-4" />,
            onConfirm: () => delete_activity.mutateAsync(),
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-5xl space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/30 p-4 rounded-lg border">
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        onClick={cancelEdit}
                        className={cn(!isEditing && "hidden")}
                    >
                        <CircleX className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                    {!isEditing && (
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Activity Details</h2>
                            <p className="text-xs text-muted-foreground">Manage and view activity information</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        size="sm"
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={delete_activity.isPending || isEditing}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>

                    <Button
                        size="sm"
                        type={isEditing ? "submit" : "button"}
                        variant={isEditing ? "default" : "outline"}
                        onClick={!isEditing ? startEdit : undefined}
                        disabled={isEditing && (!isDirty || update_activity.isPending)}
                        className="min-w-24"
                    >
                        {isEditing ? (
                            <><Save className="mr-2 h-4 w-4" /> Save Changes</>
                        ) : (
                            <><Pencil className="mr-2 h-4 w-4" /> Edit Activity</>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <FieldSet>
                        <FieldLegend>Core Information</FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Activity Title</FieldLabel>
                                <Input
                                    {...register("title", { required: "Title is required" })}
                                    readOnly={lock}
                                    className={cn("text-lg font-semibold", !lock && "bg-background")}
                                />
                                <FieldError errors={errors.title && [errors.title]} />
                            </Field>

                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                    rows={4}
                                    {...register("description")}
                                    readOnly={lock}
                                    placeholder="Enter activity description..."
                                    className={cn(!lock && "bg-background")}
                                />
                                <FieldError errors={errors.description && [errors.description]} />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSet>
                        <FieldLegend>Guidelines & Rules</FieldLegend>

                        <div className="space-y-4">

                            {/* VIEW MODE */}
                            {lock ? (
                                fields.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {fields.map((field, index) => (
                                            <li key={field.id} className="text-sm">
                                                {form.getValues(`rules.${index}.value`)}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No rules defined for this activity.
                                    </p>
                                )
                            ) : (
                                <>
                                    {/* EDIT MODE */}

                                    <div className="space-y-3">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2 items-start">

                                                <Controller
                                                    control={control}
                                                    name={`rules.${index}.value`}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
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
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ADD RULE BUTTON */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => append({ value: "" })}
                                    >
                                        + Add Rule
                                    </Button>
                                </>
                            )}
                        </div>
                    </FieldSet>

                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-muted-foreground uppercase">Status</span>
                                <div className="flex items-center gap-2">
                                    <Field>
                                        <FieldLabel>Status</FieldLabel>

                                        <Controller
                                            control={control}
                                            name="status"
                                            render={({ field }) =>
                                                lock ? (
                                                    <Badge className={cn("capitalize", statusStyles[field.value])}>
                                                        {field.value}
                                                    </Badge>
                                                ) : (
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            {Object.values(ActivityStatus).map((s) => (
                                                                <SelectItem key={s} value={s}>
                                                                    {s}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )
                                            }
                                        />

                                        <FieldError errors={errors.status && [errors.status]} />
                                    </Field>

                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-muted-foreground uppercase">Type</span>
                                <div className="flex items-center gap-2">
                                    <Field>
                                        <FieldLabel>Type</FieldLabel>

                                        <Controller
                                            control={control}
                                            name="type"
                                            render={({ field }) =>
                                                lock ? (
                                                    <Badge variant="outline" className="capitalize">
                                                        {field.value?.replace("_", " ")}
                                                    </Badge>
                                                ) : (
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            {Object.values(ActivityType).map((t) => (
                                                                <SelectItem key={t} value={t}>
                                                                    {t.replace("_", " ")}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )
                                            }
                                        />
                                    </Field>

                                </div>
                            </div>

                            <div className="pt-2 space-y-4">
                                <div className="flex items-start gap-3">
                                    <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
                                    <Controller
                                        control={control}
                                        name="startDateTime"
                                        render={({ field }) =>
                                            lock ? (
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">Start</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {field.value ? format(new Date(field.value), "PPPP p") : "—"}
                                                    </p>
                                                </div>
                                            ) : (
                                                <DateTimePicker
                                                    label="Start"
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={field.onChange}
                                                />
                                            )
                                        }
                                    />

                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-primary shrink-0" />
                                    <Controller
                                        control={control}
                                        name="endDateTime"
                                        render={({ field }) =>
                                            lock ? (
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">End</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {field.value ? format(new Date(field.value), "PPPP p") : "—"}
                                                    </p>
                                                </div>
                                            ) : (
                                                <DateTimePicker
                                                    label="End"
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={field.onChange}
                                                />
                                            )
                                        }
                                    />

                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                                    <Field>
                                        <FieldLabel>Venue</FieldLabel>

                                        <Controller
                                            control={control}
                                            name="venue"
                                            render={({ field }) =>
                                                lock ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        {field.value || "No venue assigned"}
                                                    </p>
                                                ) : (
                                                    <Input {...field} />
                                                )
                                            }
                                        />
                                    </Field>

                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="h-5 w-5 text-primary shrink-0" />
                                    <Field>
                                        <FieldLabel>Capacity</FieldLabel>

                                        <Controller
                                            control={control}
                                            name="capacity"
                                            render={({ field }) =>
                                                lock ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        {field.value ? `${field.value} Participants` : "Unlimited"}
                                                    </p>
                                                ) : (
                                                    <Input
                                                        type="number"
                                                        value={field.value ?? ""}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                )
                                            }
                                        />
                                    </Field>

                                </div>
                            </div>
                        </CardContent>
                    </Card>


                </div>
            </div>
        </form>
    );
}
