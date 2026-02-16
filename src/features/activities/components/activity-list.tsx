"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActivities } from "../utils/useActivities";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ActivityStatus } from "../types/activity.types";

type Props = {
    techfestId: number;
};

const statusStyles: Record<ActivityStatus, string> = {
    DRAFT: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PUBLISHED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
    COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
};

export function ActivityList({ techfestId }: Props) {
    const router = useRouter();
    const { data, isPending, isError } = useActivities(techfestId);

    if (isPending) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 w-full animate-pulse rounded-lg bg-muted" />
                ))}
            </div>
        );
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load activities.</div>;
    }

    const activities = data?.data || [];

    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">No activities found for this techfest.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={() => router.push(`/dashboard/techfest/${techfestId}/activities/${activity.id}`)}>
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            {/* Type Indicator */}
                            <div className="w-2 bg-primary" />

                            <div className="flex-1 p-5 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold leading-none">{activity.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {activity.isRegistered && (
                                            <Badge
                                                variant="default"
                                                className={cn(
                                                    "bg-blue-100 text-blue-800 border-blue-200",
                                                    activity.registrationStatus === "WAITLISTED" && "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                )}
                                            >
                                                {activity.registrationStatus === "WAITLISTED" ? "Waitlisted" : "Registered"}
                                            </Badge>
                                        )}
                                        <Badge variant="outline" className={cn("capitalize", statusStyles[activity.status])}>
                                            {activity.status.toLowerCase()}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{format(new Date(activity.startDateTime), "PPP")}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>{format(new Date(activity.startDateTime), "p")} - {format(new Date(activity.endDateTime), "p")}</span>
                                    </div>
                                    {activity.venue && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            <span>{activity.venue}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <Badge variant="secondary" className="font-medium">
                                        {activity.type.replace("_", " ")}
                                    </Badge>
                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
