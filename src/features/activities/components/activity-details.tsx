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
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateActivitySchema } from "../schemas/activity.schema";

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
        resolver: zodResolver(UpdateActivitySchema),
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
        <form
            onSubmit={handleSubmit(submit)}
            className="mx-auto max-w-4xl space-y-8 pb-10"
        >
            {/* HEADER / ACTION BAR */}
            <div className="sticky top-0 z-10 flex justify-between items-center gap-4 bg-background/80 backdrop-blur border rounded-lg p-4">
                <div>
                    <h2 className="text-xl font-semibold">Activity Details</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage and update activity information
                    </p>
                </div>

                <div className="flex gap-2">
                    {isEditing && (
                        <Button size="sm" type="button" variant="ghost" onClick={cancelEdit}>
                            <CircleX className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    )}

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
                    >
                        {isEditing ? (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {update_activity.isPending ? "Saving..." : "Save Changes"}
                            </>
                        ) : (
                            <>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* CORE INFORMATION */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <h3 className="font-semibold text-lg">Core Information</h3>

                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                {...register("title", { required: "Title is required" })}
                                readOnly={lock}
                                className={cn(
                                    lock && "border-0 bg-transparent px-0 shadow-none",
                                    !lock && "bg-background"
                                )}
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
                                className={cn(
                                    lock && "border-0 bg-transparent px-0 shadow-none",
                                    !lock && "bg-background"
                                )}
                            />
                        </Field>
                    </FieldGroup>
                </CardContent>
            </Card>

            {/* SCHEDULE + DETAILS */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <h3 className="font-semibold text-lg">Schedule & Details</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* STATUS */}
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) =>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
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
                                }
                            />
                        </Field>

                        {/* TYPE */}
                        <Field>
                            <FieldLabel>Type</FieldLabel>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) =>
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
                                }
                            />
                        </Field>

                        {/* START */}
                        <Field>

                            <Controller
                                control={control}
                                name="startDateTime"
                                rules={{ required: "Start time is required" }}
                                render={({ field }) => (
                                    <div className="min-h-[60px]">
                                        <DateTimePicker
                                            label="Start Date and Time"
                                            value={field.value ? new Date(field.value) : undefined}
                                            onChange={field.onChange}
                                            disabled={!isEditing}


                                        />
                                    </div>
                                )}
                            />

                            <FieldError errors={errors.startDateTime && [errors.startDateTime]} />
                        </Field>



                        {/* END */}
                        <Field>

                            <Controller
                                control={control}
                                name="endDateTime"

                                render={({ field }) => (
                                    <div className="min-h-[60px]">
                                        <DateTimePicker
                                            label="End Date and Time"
                                            value={field.value ? new Date(field.value) : undefined}
                                            onChange={field.onChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                )}
                            />

                            <FieldError errors={errors.endDateTime && [errors.endDateTime]} />
                        </Field>


                        {/* VENUE */}
                        <Field>
                            <FieldLabel>Venue</FieldLabel>
                            <Controller
                                control={control}
                                name="venue"
                                render={({ field }) =>
                                    <Input {...field} disabled={!isEditing}/>
                                }
                            /> <FieldError errors={errors.venue && [errors.venue]} />
                        </Field>

                        {/* CAPACITY */}
                        <Field>
                            <FieldLabel>Capacity</FieldLabel>
                            <Controller
                                control={control}
                                name="capacity"
                                render={({ field }) =>
                                    <Input
                                        type="number"
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                        }
                                        disabled={!isEditing}

                                    />
                                }
                            />  <FieldError errors={errors.capacity && [errors.capacity]} />

                        </Field>
                    </div>
                </CardContent>
            </Card>

            {/* RULES */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <h3 className="font-semibold text-lg">Guidelines & Rules</h3>

                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex items-center gap-2 border rounded-md p-2"
                            >
                                <Controller
                                    control={control}
                                    name={`rules.${index}.value`}
                                    render={({ field }) => (
                                        <Input {...field} className="flex-1" disabled={!isEditing} />
                                    )}
                                />
                                <FieldError
                                    errors={errors.rules?.[index]?.value && [
                                        errors.rules[index]?.value,
                                    ]}
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

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => append({ value: "" })}
                    >
                        + Add Rule
                    </Button>
                </CardContent>
            </Card>
        </form>
    );

}
