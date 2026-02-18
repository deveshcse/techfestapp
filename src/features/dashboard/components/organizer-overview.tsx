"use client";

import { Trophy, Calendar, CheckCircle, Clock } from "lucide-react";
import { StatsCard } from "./stats-card";
import { DashboardStats } from "../utils/api/stats.api";

interface RoleOverviewProps {
    stats: DashboardStats;
}

export function OrganizerOverview({ stats }: RoleOverviewProps) {
    const items = [
        {
            title: "Managed TechFests",
            value: stats.techfests,
            icon: Trophy,
            description: "Festivals you oversee",
            iconClassName: "bg-amber-100 text-amber-600",
        },
        {
            title: "Managed Activities",
            value: stats.activities,
            icon: Calendar,
            description: "Workshops & events",
            iconClassName: "bg-blue-100 text-blue-600",
        },
        {
            title: "Upcoming Events",
            value: stats.upcomingActivities,
            icon: Clock,
            description: "Scheduled activities",
            iconClassName: "bg-indigo-100 text-indigo-600",
        },
        {
            title: "Total Attendance",
            value: stats.attendance,
            icon: CheckCircle,
            description: "Presence marked by you",
            iconClassName: "bg-purple-100 text-purple-600",
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
                <StatsCard
                    key={index}
                    {...item}
                    className="border-primary/5 shadow-sm"
                />
            ))}
        </div>
    );
}
