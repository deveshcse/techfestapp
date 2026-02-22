"use client";

import {
    Calendar,
    Users,
    Activity,
    ClipboardList,
    Clock,
    UserCheck,
} from "lucide-react";
import StatCard from "./stats-card";
import { UserRole } from "@/generated/prisma/enums";

type Props = {
    role?: UserRole;
    stats: any;
    loading?: boolean;
};

export default function StatsGrid({ role, stats, loading }: Props) {
    const adminStats = [
        {
            title: "Total Techfests",
            value: stats?.techfests,
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Total Activities",
            value: stats?.activities,
            icon: <Activity className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Registrations",
            value: stats?.registrations,
            icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Attendance",
            value: stats?.attendance,
            icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Students",
            value: stats?.totalStudents,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Unique Participants",
            value: stats?.uniqueParticipants,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Waitlist",
            value: stats?.activeWaitlist,
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Upcoming Activities",
            value: stats?.upcomingActivities,
            icon: <Activity className="h-4 w-4 text-muted-foreground" />,
        },
    ];

    const organizerStats = [
        {
            title: "My Techfests",
            value: stats?.techfests,
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "My Activities",
            value: stats?.activities,
            icon: <Activity className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Marked Attendance",
            value: stats?.attendance,
            icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Upcoming Events",
            value: stats?.upcomingActivities,
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
        },
    ];

    const userStats = [
        {
            title: "My Registrations",
            value: stats?.registrations,
            icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "My Attendance",
            value: stats?.attendance,
            icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: "Waitlisted",
            value: stats?.activeWaitlist,
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
        },
    ];

    const selected =
        role === "admin"
            ? adminStats
            : role === "organizer"
                ? organizerStats
                : userStats;

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full px-4">
            {selected.map((item) => (
                <StatCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    loading={loading}
                />
            ))}
        </div>
    );
}
