import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listUpcomingActivities, registerActivity, unregisterActivity } from "./activity-apis";
import { toast } from "sonner";

export const upcomingActivityKeys = {
    all: ["upcoming-activities"] as const,
};

export function useUpcomingActivities() {
    return useQuery({
        queryKey: upcomingActivityKeys.all,
        queryFn: listUpcomingActivities,
    });
}

export function useRegisterUpcomingActivity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ techfestId, activityId }: { techfestId: number; activityId: number }) =>
            registerActivity(techfestId, activityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: upcomingActivityKeys.all });
            toast.success("Successfully registered for activity");
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || "Failed to register";
            toast.error(message);
        },
    });
}

export function useUnregisterUpcomingActivity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ techfestId, activityId }: { techfestId: number; activityId: number }) =>
            unregisterActivity(techfestId, activityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: upcomingActivityKeys.all });
            toast.success("Successfully unregistered from activity");
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || "Failed to unregister";
            toast.error(message);
        },
    });
}
