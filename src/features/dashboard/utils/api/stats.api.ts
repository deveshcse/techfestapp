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
