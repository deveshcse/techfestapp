"use client";

import { useAuth } from "@/features/auth/context/auth-context";
import { useDashboardStats } from "../utils/hooks/useDashboardStats";
import { Skeleton } from "@/components/ui/skeleton";
import StatsGrid from "./stats.grid";
import RegistrationChart from "./registration-trend-chart";
import ActivityBreakdownChart from "./activity-breakdown-chart";
import TodaySchedule from "./today-schedule";


export function Dashboard() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: stats, isLoading: statsLoading } = useDashboardStats();

    const loading = statsLoading || authLoading;


    if (loading) {
        return <Skeleton className="h-40 w-full" />;
    }

    if (!stats) {
        return <div>No stats available</div>;
    }

    const isElevated = user?.role === "admin" || user?.role === "organizer";

    return (
        <div className="space-y-6">
            {/* Stats */}
            <StatsGrid role={user?.role ?? undefined} stats={stats} loading={loading} />

            {/* Charts */}
            {isElevated && stats && (
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    {stats.registrationTrends?.length > 0 && (
                        <RegistrationChart data={stats.registrationTrends} />
                    )}

                    {stats.activityBreakdown?.length > 0 && (
                        <ActivityBreakdownChart data={stats.activityBreakdown} />
                    )}
                </div>
            )}

            {/* Today's Schedule */}
            {isElevated && <TodaySchedule />}

        </div>
    );
}

