import api from "@/lib/axios";
import { ActivityResponse, ActivityServer, CreateUpdateActivityInput, ActivityStatus, UpcomingActivity, PotentialOrganizer } from "../types/activity.types";

export const listActivities = async (techfestId: number): Promise<ActivityResponse[]> => {
    const response = await api.get(`/api/techfest/${techfestId}/activities`);
    return response.data.data;
};

export const createActivity = async (techfestId: number, formData: CreateUpdateActivityInput) => {
    const response = await api.post(`/api/techfest/${techfestId}/activities`, formData);
    return response.data.data;
};

export const getActivityDetails = async (
    techfestId: number,
    activityId: number,
): Promise<ActivityServer> => {
    const response = await api.get(`/api/techfest/${techfestId}/activities/${activityId}`);
    return response.data.data;
};

// Placeholder for update/delete if needed later
export const deleteActivity = async (techfestId: number, activityId: number) => {
    const response = await api.delete(`/api/techfest/${techfestId}/activities/${activityId}`);
    return response.data.data;
};

export const updateActivity = async (
    techfestId: number,
    activityId: number,
    formData: CreateUpdateActivityInput,
) => {
    const response = await api.put(`/api/techfest/${techfestId}/activities/${activityId}`, formData);
    return response.data.data;
};

export const updateActivityStatus = async (
    techfestId: number,
    activityId: number,
    status: ActivityStatus,
) => {
    const response = await api.patch(`/api/techfest/${techfestId}/activities/${activityId}/status`, { status });
    return response.data.data;
};

export const assignActivityOrganizers = async (
    techfestId: number,
    activityId: number,
    userIds: string[],
) => {
    const response = await api.patch(`/api/techfest/${techfestId}/activities/${activityId}/organizers`, { userIds });
    return response.data.data;
};

export const listPotentialOrganizers = async (): Promise<PotentialOrganizer[]> => {
    const response = await api.get("/api/users/organizers");
    return response.data.data;
};

export const registerActivity = async (
    techfestId: number,
    activityId: number,
) => {
    const response = await api.post(`/api/techfest/${techfestId}/activities/${activityId}/registration`);
    return response.data.data;
};

export const unregisterActivity = async (
    techfestId: number,
    activityId: number,
) => {
    const response = await api.delete(`/api/techfest/${techfestId}/activities/${activityId}/registration`);
    return response.data.data;
};
export const listUpcomingActivities = async (): Promise<UpcomingActivity[]> => {
    const response = await api.get("/api/activities/upcoming");
    return response.data.data;
};
