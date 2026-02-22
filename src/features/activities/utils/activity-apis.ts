import api from "@/lib/axios";
import { ActivityResponse, ActivityServer, CreateUpdateActivityInput, ActivityStatus, UpcomingActivity } from "../types/activity.types";

export const listActivities = async (techfestId: number): Promise<{ success: boolean; data: ActivityResponse[] }> => {
    const response = await api.get(`/api/techfest/${techfestId}/activities`);
    return response.data;
};

export const createActivity = async (techfestId: number, formData: CreateUpdateActivityInput) => {
    const response = await api.post(`/api/techfest/${techfestId}/activities`, formData);
    return response.data;
};

export const getActivityDetails = async (
    techfestId: number,
    activityId: number,
): Promise<{ success: boolean; data: ActivityServer }> => {
    const response = await api.get(`/api/techfest/${techfestId}/activities/${activityId}`);
    return response.data;
};

// Placeholder for update/delete if needed later
export const deleteActivity = async (techfestId: number, activityId: number) => {
    const response = await api.delete(`/api/techfest/${techfestId}/activities/${activityId}`);
    return response.data;
};

export const updateActivity = async (
    techfestId: number,
    activityId: number,
    formData: CreateUpdateActivityInput,
) => {
    const response = await api.put(`/api/techfest/${techfestId}/activities/${activityId}`, formData);
    return response.data;
};

export const updateActivityStatus = async (
    techfestId: number,
    activityId: number,
    status: ActivityStatus,
) => {
    const response = await api.patch(`/api/techfest/${techfestId}/activities/${activityId}/status`, { status });
    return response.data;
};

export const assignActivityOrganizers = async (
    techfestId: number,
    activityId: number,
    userIds: string[],
) => {
    const response = await api.patch(`/api/techfest/${techfestId}/activities/${activityId}/organizers`, { userIds });
    return response.data;
};

export const listPotentialOrganizers = async () => {
    const response = await api.get("/api/users/organizers");
    return response.data;
};

export const registerActivity = async (
    techfestId: number,
    activityId: number,
) => {
    const response = await api.post(`/api/techfest/${techfestId}/activities/${activityId}/registration`);
    return response.data;
};

export const unregisterActivity = async (
    techfestId: number,
    activityId: number,
) => {
    const response = await api.delete(`/api/techfest/${techfestId}/activities/${activityId}/registration`);
    return response.data;
};
export const listUpcomingActivities = async (): Promise<{ success: boolean; data: UpcomingActivity[] }> => {
    const response = await api.get("/api/activities/upcoming");
    return response.data;
};
