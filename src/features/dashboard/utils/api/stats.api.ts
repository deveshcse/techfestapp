import api from "@/lib/axios";

export type DashboardStats = {
    techfests: number;
    activities: number;
    registrations: number;
    attendance: number;
    totalStudents: number;
    uniqueParticipants: number;
    activeWaitlist: number;
    upcomingActivities: number;
    registrationTrends: { date: string; count: number }[];
    activityBreakdown: { type: string; count: number }[];
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const { data } = await api.get<{ success: boolean; data: DashboardStats }>("/api/dashboard/stats");
    return data.data;
};

export type TodayScheduleItem = {
    id: number;
    title: string;
    venue: string | null;
    startDateTime: string;
    endDateTime: string;
    status: string;
    type: string;
    techfestId: number;
    techfestTitle: string;
    registrationCount: number;
};

export const getTodaySchedule = async (): Promise<TodayScheduleItem[]> => {
    const { data } = await api.get<{ success: boolean; data: TodayScheduleItem[] }>("/api/dashboard/today-schedule");
    return data.data;
};
