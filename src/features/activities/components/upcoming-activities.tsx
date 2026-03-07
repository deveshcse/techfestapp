"use client";
import * as React from "react";
import {
    useUpcomingActivities,
} from "../utils/useActivities";
import {
    Item,
    ItemContent,
    ItemActions,
    ItemMedia,
    ItemTitle,
    ItemSeparator,
    ItemGroup
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Info, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { ActivityListSkeleton } from "./activity-list-skeleton";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { UpcomingActivity } from "../types/activity.types";

export function UpcomingActivities() {
    const router = useRouter();
    const { data: response, isPending, isError, refetch } = useUpcomingActivities();

    if (isPending) {
        return (
            <div className="mb-10 mx-6 mt-4">
                <ActivityListSkeleton count={5} />
            </div>
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

    const activities: UpcomingActivity[] = response || [];

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
        <ItemGroup className="border rounded-lg overflow-hidden bg-background mb-10 mx-6 mt-4">
            {activities.map((activity: UpcomingActivity, index) => (
                <React.Fragment key={activity.id}>
                    <Item className="py-5 px-6">
                        <ItemMedia variant="image" className="bg-muted">
                            <ImageIcon className="text-muted-foreground size-5" />
                        </ItemMedia>

                        <ItemContent>
                            <ItemTitle className="flex items-center gap-2">
                                <Label className="text-base font-semibold cursor-pointer">
                                    {activity.title}
                                </Label>
                                <Badge variant="secondary" className="font-medium text-[10px] px-1.5 py-0 h-4">
                                    {activity.type.replace("_", " ")}
                                </Badge>
                            </ItemTitle>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-medium">
                                <div className="flex items-center gap-1.5 ">
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                    <Label className="text-muted-foreground text-xs cursor-pointer">
                                        {format(new Date(activity.startDateTime), "PPP")}
                                    </Label>
                                </div>

                                <div className="flex items-center gap-1.5 ">
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                    <Label className="text-muted-foreground text-xs cursor-pointer">
                                        {format(new Date(activity.startDateTime), "p")} - {format(new Date(activity.endDateTime), "p")}
                                    </Label>
                                </div>

                                {activity.venue && (
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                        <Label className="text-muted-foreground text-xs cursor-pointer">
                                            {activity.venue}
                                        </Label>
                                    </div>
                                )}

                                <div className="flex items-center gap-1.5">
                                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    <Label className="text-muted-foreground text-xs cursor-pointer">
                                        {activity.registrationCount} / {activity.capacity || "∞"} Registered
                                    </Label>
                                </div>
                            </div>

                            <Label className="text-muted-foreground/80 text-[10px] mt-1 font-normal line-clamp-1 italic">
                                {activity.techfestTitle}
                            </Label>
                        </ItemContent>

                        <ItemActions>
                            <Badge
                                variant={activity.isRegistered ? "default" : "outline"}
                                className={cn(
                                    "px-2.5 py-0.5",
                                    activity.isRegistered ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" : "text-muted-foreground",
                                    activity.registrationStatus === "WAITLISTED" && "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                                )}
                            >
                                {activity.isRegistered
                                    ? (activity.registrationStatus === "WAITLISTED" ? "Waitlisted" : "Registered")
                                    : "Not Registered"}
                            </Badge>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => router.push(`/dashboard/techfest/${activity.techfestId}/activities/${activity.id}`)}
                                aria-label={`View details for ${activity.title}`}
                            >
                                View
                            </Button>
                        </ItemActions>
                    </Item>
                    {index < activities.length - 1 && <ItemSeparator />}
                </React.Fragment>
            ))}
        </ItemGroup>
    );
}
