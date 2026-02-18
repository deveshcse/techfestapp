"use client";

import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { StatsCard } from "./stats-card";
import { DashboardStats } from "../utils/api/stats.api";


interface RoleOverviewProps {
    stats: DashboardStats;
}

export function UserOverview({ stats }: RoleOverviewProps) {
    const items = [
        {
            title: "My Registrations",
            value: stats.registrations,
            icon: CheckCircle,
            description: "Confirmed activities",
            iconClassName: "bg-green-100 text-green-600",
        },
        {
            title: "My Attendance",
            value: stats.attendance,
            icon: Clock,
            description: "Events attended",
            iconClassName: "bg-blue-100 text-blue-600",
        },
        {
            title: "Waitlisted",
            value: stats.activeWaitlist,
            icon: AlertCircle,
            description: "Pending availability",
            iconClassName: "bg-rose-100 text-rose-600",
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
