"use client";

import {
    useActivityActions,
    useUpcomingActivities,
} from "../utils/useActivities";
import {
    Item,
    ItemContent,
    ItemHeader,
    ItemTitle,
    ItemDescription,
    ItemActions,
    ItemGroup
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { ActivityItemSkeleton } from "./activity-item-skeleton";
import Link from "next/link";
import { UpcomingActivity } from "../types/activity.types";

export function UpcomingActivities() {
    const { data: response, isPending, isError, refetch } = useUpcomingActivities();
    if (isPending) {
        return (
            Array.from({ length: 5 }).map((_, i) => (
                <ActivityItemSkeleton key={i} />
            ))
        );
    }

    if (isError) {
        return (
            <ErrorState
                title="Failed to load upcoming activities"
                action={
                    <Button variant="outline" onClick={() => refetch()}>
                        Try Again
                    </Button>
                }
            />
        );
    }

    const activities: UpcomingActivity[] = response?.data || [];

    if (activities.length === 0) {
        return (
            <EmptyState
                icon={Calendar}
                title="No upcoming activities"
                description="Check back later for new events and activities."
            />
        );
    }

    return (
        <ItemGroup className="space-y-4 px-6 mt-4">
            {activities.map((activity: UpcomingActivity) => (
                <Item key={activity.id} variant="outline" size="default" className="bg-card shadow-sm hover:shadow-md transition-shadow">
                    <ItemHeader>
                        <ItemTitle className="text-base font-bold text-primary flex items-center gap-2">
                            {activity.title}
                            <Badge variant="secondary" className="text-[10px] h-5">
                                {activity.type.replace("_", " ")}
                            </Badge>
                        </ItemTitle>
                        <Badge
                            variant={activity.isRegistered ? "default" : "outline"}
                            className={cn(
                                activity.isRegistered ? "bg-green-100 text-green-800 border-green-200" : "text-muted-foreground",
                                activity.registrationStatus === "WAITLISTED" && "bg-yellow-100 text-yellow-800 border-yellow-200"
                            )}
                        >
                            {activity.isRegistered
                                ? (activity.registrationStatus === "WAITLISTED" ? "Waitlisted" : "Registered")
                                : "Not Registered"}
                        </Badge>
                    </ItemHeader>

                    <ItemContent className="pt-2">
                        <ItemDescription className="mb-3 text-foreground/80">
                            {activity.techfestTitle} • {activity.description}
                        </ItemDescription>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-primary" />
                                <span>{format(new Date(activity.startDateTime), "PPP")}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                <span>{format(new Date(activity.startDateTime), "p")} - {format(new Date(activity.endDateTime), "p")}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                <span>{activity.venue || "TBD"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Info className="h-3.5 w-3.5 text-primary" />
                                <span>{activity.registrationCount} / {activity.capacity || "∞"} Registered</span>
                            </div>
                        </div>
                    </ItemContent>

                    <ItemActions className="basis-full md:basis-auto mt-4 md:mt-0 justify-end">
                        <Link href={`/dashboard/techfest/${activity.techfestId}/activities/${activity.id}`}><Button variant="link" size="sm">View</Button></Link>
                    </ItemActions>
                </Item>
            ))}
        </ItemGroup>
    );
}
