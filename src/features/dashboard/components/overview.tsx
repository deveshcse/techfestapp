"use client";

import { useAuth } from "@/features/auth/context/auth-context";
import { useDashboardStats } from "../utils/hooks/useDashboardStats";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/error-state";
import { AdminOverview } from "./admin-overview";
import { OrganizerOverview } from "./organizer-overview";
import { UserOverview } from "./user-overview";

export function DashboardOverview() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: stats, isLoading: statsLoading, isError, refetch } = useDashboardStats();

    const isLoading = authLoading || statsLoading;

    if (isLoading) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorState
                title="Failed to load statistics"
                message="We encountered an issue while fetching your dashboard data."
                action={
                    <button
                        onClick={() => refetch()}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Try Again
                    </button>
                }
            />
        );
    }

    if (!stats || !user) return null;

    const renderOverview = () => {
        switch (user.role) {
            case "admin":
                return <AdminOverview stats={stats} />;
            case "organizer":
                return <OrganizerOverview stats={stats} />;
            case "user":
            default:
                return <UserOverview stats={stats} />;
        }
    };

    const getWelcomeMessage = () => {
        switch (user.role) {
            case "admin":
                return "System-wide analytics and festival performance.";
            case "organizer":
                return "Overview of the festivals and activities you manage.";
            case "user":
            default:
                return "Track your registrations and activity attendance.";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {user.role === "admin" ? "Admin Dashboard" : user.role === "organizer" ? "Organizer Dashboard" : "My Dashboard"}
                </h1>
                <p className="text-muted-foreground">{getWelcomeMessage()}</p>
            </div>

            {renderOverview()}

            {(user.role === "admin" || user.role === "organizer") && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4 rounded-xl border border-dashed p-12 flex flex-col items-center justify-center text-center opacity-50 bg-muted/20">
                        <p className="text-sm font-medium text-muted-foreground">Attendance Trends Chart</p>
                        <p className="text-xs text-muted-foreground mt-1">Coming in Phase 2 Expansion</p>
                    </div>
                    <div className="col-span-3 rounded-xl border border-dashed p-12 flex flex-col items-center justify-center text-center opacity-50 bg-muted/20">
                        <p className="text-sm font-medium text-muted-foreground">Activity Breakdown</p>
                        <p className="text-xs text-muted-foreground mt-1">Coming in Phase 2 Expansion</p>
                    </div>
                </div>
            )}
        </div>
    );
}
