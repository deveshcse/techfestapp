"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityStatus } from "@/generated/prisma/enums";
import { UpdateActivityStatusSchema } from "../schemas/activity.schema";
import { UpdateActivityStatusInput } from "../types/activity.types";
import { useUpdateActivityStatus } from "../utils/useActivities";
import { getValidNextStatuses } from "../utils/status-transitions";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface ActivityStatusUpdateFormProps {
    techfestId: number;
    activityId: number;
    initialStatus: ActivityStatus;
}

export function ActivityStatusUpdateForm({
    techfestId,
    activityId,
    initialStatus,
}: ActivityStatusUpdateFormProps) {
    const { close } = useModalStore();
    const updateStatusMutation = useUpdateActivityStatus(techfestId, activityId);
    const validNextStatuses = getValidNextStatuses(initialStatus);

    const form = useForm<UpdateActivityStatusInput>({
        resolver: zodResolver(UpdateActivityStatusSchema),
        defaultValues: {
            id: activityId,
            status: validNextStatuses[0] ?? initialStatus,
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    async function onSubmit(data: UpdateActivityStatusInput) {
        try {
            await updateStatusMutation.mutateAsync(data.status, {
                onSuccess: () => {
                    close();
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    if (validNextStatuses.length === 0) {
        return (
            <div className="mx-4 py-4 text-center text-muted-foreground">
                <p className="font-medium">No transitions available</p>
                <p className="text-sm mt-1">
                    The current status <span className="font-semibold">{initialStatus}</span> is a terminal state.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-4">
            <Controller
                control={control}
                name="status"
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Activity Status</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    {validNextStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError errors={errors.status && [errors.status]} />
                    </Field>
                )}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || updateStatusMutation.isPending}
            >
                {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
        </form>
    );
}
