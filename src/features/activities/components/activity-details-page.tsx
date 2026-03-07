"use client";
import { ActivityDetails } from "@/features/activities/components/activity-details";
import { useActivityDetails } from "@/features/activities/utils/useActivities";
import { ActivityDetailsSkeleton } from "@/features/activities/components/activity-details-skeleton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
    params: {
        techfestId: number;
        activityId: number;
    };
}

export function ActivityDetailsPage({ params }: Props) {
    const { techfestId, activityId } = params;
    const { data, isLoading, error } = useActivityDetails(techfestId, activityId);

    if (isLoading) {
        return <ActivityDetailsSkeleton />;
    }

    if (error || !data) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="bg-destructive/10 p-3 rounded-full">
                    <ChevronLeft className="h-6 w-6 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold">Failed to load activity</h2>
                <p className="text-muted-foreground text-center max-w-md">
                    Something went wrong while fetching the activity details. Please try again or go back.
                </p>
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline">
                        <Link href={`/dashboard/techfest/${techfestId}/activities`}>
                            Go back to activities
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const activity = data;

    return (
        <ActivityDetails techfestId={techfestId} activity={activity} />
    );
}
