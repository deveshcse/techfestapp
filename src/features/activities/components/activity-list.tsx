"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActivities } from "../utils/useActivities";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ActivityStatus } from "../types/activity.types";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    ItemSeparator,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";

import { ActivityListSkeleton } from "./activity-list-skeleton";

type Props = {
    techfestId: number;
};

const statusStyles: Record<ActivityStatus, string> = {
    DRAFT: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    PUBLISHED: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    CANCELLED: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    COMPLETED: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
    REGISTRATION_CLOSED: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
};

export function ActivityList({ techfestId }: Props) {
    const router = useRouter();
    const { data, isPending, isError, refetch } = useActivities(techfestId);

    if (isPending) {
        return <ActivityListSkeleton count={4} />;
    }

    if (isError) {
        return (
            <ErrorState
                title="Failed to load activities"
                action={
                    <Button variant="outline" onClick={() => refetch()}>
                        Try Again
                    </Button>
                }
            />
        );
    }

    const activities = data?.data || [];

    if (activities.length === 0) {
        return (
            <EmptyState
                icon={Calendar}
                title="No activities found"
                description="There are no activities listed for this techfest at the moment."
            />
        );
    }

    return (
        <ItemGroup className="border rounded-lg overflow-hidden bg-background">
            {activities.map((activity, index) => (
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
                            </div>
                        </ItemContent>

                        <ItemActions>
                            {activity.isRegistered && (
                                <Badge
                                    variant="default"
                                    className={cn(
                                        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 px-2.5 py-0.5",
                                        activity.registrationStatus === "WAITLISTED" && "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                                    )}
                                >
                                    {activity.registrationStatus === "WAITLISTED" ? "Waitlisted" : "Registered"}
                                </Badge>
                            )}
                            <Badge
                                variant="outline"
                                className={cn("capitalize px-2.5 py-0.5", statusStyles[activity.status])}
                            >
                                {activity.status.toLowerCase()}
                            </Badge>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => router.push(`/dashboard/techfest/${techfestId}/activities/${activity.id}`)}
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
