"use client";

import { useAuth } from "@/features/auth/context/auth-context";
import { useDashboardStats } from "../utils/hooks/useDashboardStats";
import { Skeleton } from "@/components/ui/skeleton";
import StatsGrid from "./stats.grid";
import RegistrationChart from "./registration-trend-chart";
import ActivityBreakdownChart from "./activity-breakdown-chart";
import TodaySchedule from "./today-schedule";
import PageHeader from "@/components/common/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";


export function Dashboard() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: stats, isLoading: statsLoading } = useDashboardStats();

    const loading = statsLoading || authLoading;


    if (loading) {
        return (
            <div className="h-full w-full space-y-4">
                <PageHeader title="Dashboard" description="Overview of your techfest" />
                <div className="px-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-xl" />
                        ))}
                    </div>
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) {
        return <div>No stats available</div>;
    }

    const isElevated = user?.role === "admin" || user?.role === "organizer";

    return (
        <div className="h-full w-full space-y-4">
            <PageHeader title="Dashboard" description="Overview of your techfest" />
            {/* Stats */}


            <ScrollArea className="w-full h-full">
                <div className="flex flex-col gap-4">
                    <StatsGrid role={user?.role ?? undefined} stats={stats} loading={loading} />

                    {/* Charts */}
                    {isElevated && stats && (
                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mx-4">
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

            </ScrollArea>


        </div>
    );
}

