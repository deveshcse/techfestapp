"use client";

import { format } from "date-fns";
import { Clock, MapPin, Users, CalendarOff } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { useTodaySchedule } from "../utils/hooks/useTodaySchedule";

const statusStyles: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    REGISTRATION_CLOSED: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
    COMPLETED: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
};

export default function TodaySchedule() {
    const { data: activities, isLoading } = useTodaySchedule();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-lg" />
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mx-4 mb-96">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Today&apos;s Schedule
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!activities || activities.length === 0 ? (
                    <EmptyState
                        icon={CalendarOff}
                        title="Nothing Scheduled"
                        description="No activities are scheduled for today."
                        className="border-0 bg-transparent p-6"
                    />
                ) : (
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <Link
                                key={activity.id}
                                href={`/dashboard/techfest/${activity.techfestId}/activity/${activity.id}`}
                                className="block"
                            >
                                <div className="group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                    {/* Time column */}
                                    <div className="flex-shrink-0 text-center min-w-[60px]">
                                        <p className="text-sm font-bold text-primary">
                                            {format(new Date(activity.startDateTime), "h:mm a")}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {format(new Date(activity.endDateTime), "h:mm a")}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-px self-stretch bg-border" />

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                                                {activity.title}
                                            </h4>
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${statusStyles[activity.status] ?? ""}`}
                                            >
                                                {activity.status.replace("_", " ")}
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs capitalize">
                                                {activity.type.toLowerCase()}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                                            {activity.venue && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {activity.venue}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {activity.registrationCount} registered
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {activity.techfestTitle}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
