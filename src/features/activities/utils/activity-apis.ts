import api from "@/lib/axios";
import { Activity, CreateActivityInput, UpdateActivityInput } from "../types/activity.types";

export const listActivities = async (techfestId: number): Promise<{ success: boolean; data: Activity[] }> => {
    const response = await api.get(`/api/techfest/${techfestId}/activities`);
    return response.data;
};

export const createActivity = async (techfestId: number, formData: CreateActivityInput) => {
    const response = await api.post(`/api/techfest/${techfestId}/activities`, formData);
    return response.data;
};

export const getActivityDetails = async (
    techfestId: number,
    activityId: number,
): Promise<{ success: boolean; data: Activity }> => {
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
    formData: UpdateActivityInput,
) => {
    const response = await api.put(`/api/techfest/${techfestId}/activities/${activityId}`, formData);
    return response.data;
};
