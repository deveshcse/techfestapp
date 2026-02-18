"use client";

import { Trophy, Calendar, Users, CheckCircle, Clock, UserCheck, AlertCircle } from "lucide-react";
import { StatsCard } from "./stats-card";
import { DashboardStats } from "../utils/api/stats.api";

interface RoleOverviewProps {
    stats: DashboardStats;
}

export function AdminOverview({ stats }: RoleOverviewProps) {
    const items = [
        {
            title: "Total TechFests",
            value: stats.techfests,
            icon: Trophy,
            description: "System-wide festivals",
            iconClassName: "bg-amber-100 text-amber-600",
        },
        {
            title: "Total Activities",
            value: stats.activities,
            icon: Calendar,
            description: "Total workshops & events",
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
            title: "Total Students",
            value: stats.totalStudents,
            icon: Users,
            description: "Unique registered users",
            iconClassName: "bg-slate-100 text-slate-600",
        },
        {
            title: "Unique Participants",
            value: stats.uniqueParticipants,
            icon: UserCheck,
            description: "Users with registrations",
            iconClassName: "bg-emerald-100 text-emerald-600",
        },
        {
            title: "Total Registrations",
            value: stats.registrations,
            icon: CheckCircle,
            description: "Confirmed participants",
            iconClassName: "bg-green-100 text-green-600",
        },
        {
            title: "Active Waitlist",
            value: stats.activeWaitlist,
            icon: AlertCircle,
            description: "Students pending seats",
            iconClassName: "bg-rose-100 text-rose-600",
        },
        {
            title: "Attendance Total",
            value: stats.attendance,
            icon: CheckCircle,
            description: "Total presence marked",
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
