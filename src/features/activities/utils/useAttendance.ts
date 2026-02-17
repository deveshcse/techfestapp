import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RegistrationWithUser } from "../types/activity.types";
import { toast } from "sonner";

export function useAttendance(techfestId: number, activityId: number) {
    const queryClient = useQueryClient();

    const registrationsQuery = useQuery({
        queryKey: ["techfest", techfestId, "activity", activityId, "registrations"],
        queryFn: async () => {
            const response = await axios.get<{ success: boolean; data: RegistrationWithUser[] }>(
                `/api/techfest/${techfestId}/activities/${activityId}/registration`
            );
            return response.data.data;
        },
    });

    const markAttendance = useMutation({
        mutationFn: async ({ registrationId, attended }: { registrationId: number; attended: boolean }) => {
            const response = await axios.patch(
                `/api/techfest/${techfestId}/activities/${activityId}/registration/${registrationId}/attendance`,
                { attended }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["techfest", techfestId, "activity", activityId, "registrations"],
            });
            toast.success("Attendance updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update attendance");
        },
    });

    const bulkMarkAttendance = useMutation({
        mutationFn: async ({ registrationIds, attended }: { registrationIds: number[]; attended: boolean }) => {
            const response = await axios.post(
                `/api/techfest/${techfestId}/activities/${activityId}/registration/bulk-attendance`,
                { registrationIds, attended }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["techfest", techfestId, "activity", activityId, "registrations"],
            });
            toast.success("Bulk attendance updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update bulk attendance");
        },
    });

    return {
        registrations: registrationsQuery.data || [],
        isLoading: registrationsQuery.isPending,
        isError: registrationsQuery.isError,
        refetch: registrationsQuery.refetch,
        markAttendance,
        bulkMarkAttendance,
    };
}
