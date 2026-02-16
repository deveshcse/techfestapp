import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
    createActivity,
    deleteActivity,
    getActivityDetails,
    listActivities,
    updateActivity,
    updateActivityStatus,
    assignActivityOrganizers,
    listPotentialOrganizers,
} from "./activity-apis";
import { CreateUpdateActivityInput, ActivityStatus } from "../types/activity.types";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const activityKeys = {
    all: ["activity"] as const,
    list: (techfestId: number) => [...activityKeys.all, "list", techfestId] as const,
    detail: (techfestId: number, activityId: number) => [...activityKeys.all, "detail", techfestId, activityId] as const,
};

export function useActivities(techfestId: number) {
    return useQuery({
        queryKey: activityKeys.list(techfestId),
        queryFn: () => listActivities(techfestId),
        placeholderData: keepPreviousData,
    });
}

export function useActivityDetails(techfestId: number, activityId: number) {
    return useQuery({
        queryKey: activityKeys.detail(techfestId, activityId),
        queryFn: () => getActivityDetails(techfestId, activityId),
        enabled: !!techfestId && !!activityId,
        select: (response) => {
            return {
                ...response,
                data: {
                    ...response.data,
                    rules: response.data.rules.map((rule) => ({ value: rule }))
                }
            }
        },

    });
}

export function useCreateActivity(techfestId: number) {
    return useMutation({
        mutationFn: (formData: CreateUpdateActivityInput) => createActivity(techfestId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activityKeys.list(techfestId) });
            toast.success("Activity created successfully");
        },
    });
}

export function useUpdateActivityStatus(techfestId: number, activityId: number) {
    return useMutation({
        mutationFn: (status: ActivityStatus) => updateActivityStatus(techfestId, activityId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activityKeys.all });
            toast.success("Activity status updated successfully");
        },
    });
}

export function useUpdateActivity(techfestId: number, activityId: number) {
    return useMutation({
        mutationFn: (formData: CreateUpdateActivityInput) => updateActivity(techfestId, activityId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activityKeys.all });
            toast.success("Activity updated successfully");
        },
    });
}

export function useDeleteActivity(techfestId: number, activityId: number) {
    const router = useRouter();

    return useMutation({
        mutationFn: () => deleteActivity(techfestId, activityId),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: activityKeys.detail(techfestId, activityId) });
            toast.success("Activity deleted successfully");
            router.push(`/dashboard/techfest/${techfestId}/activities`);
            queryClient.invalidateQueries({ queryKey: activityKeys.list(techfestId) });
        },
    });
}

export function useAssignActivityOrganizers(techfestId: number, activityId: number) {
    return useMutation({
        mutationFn: (userIds: string[]) => assignActivityOrganizers(techfestId, activityId, userIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activityKeys.detail(techfestId, activityId) });
            toast.success("Organizers updated successfully");
        },
    });
}

export function usePotentialOrganizers() {
    return useQuery({
        queryKey: ["users", "organizers"],
        queryFn: listPotentialOrganizers,
    });
}

export function useActivityActions(techfestId: number, activityId: number) {
    return {
        update_activity: useUpdateActivity(techfestId, activityId),
        delete_activity: useDeleteActivity(techfestId, activityId),
        update_status: useUpdateActivityStatus(techfestId, activityId),
    };
}
