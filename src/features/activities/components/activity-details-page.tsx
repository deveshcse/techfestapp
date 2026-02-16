"use client";
import { ActivityDetails } from "@/features/activities/components/activity-details";
import { useActivityDetails } from "@/features/activities/utils/useActivities";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
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
    console.log("data in page",data)
    if (isLoading) {
        return (
            <div className="p-8 space-y-6">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-12 w-full" />
                <div className="grid grid-cols-3 gap-6">
                    <Skeleton className="h-[400px] col-span-2" />
                    <Skeleton className="h-[300px]" />
                </div>
            </div>
        );
    }

    if (error || !data?.data) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="bg-destructive/10 p-3 rounded-full">
                    <ChevronLeft className="h-6 w-6 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold">Failed to load activity</h2>
                <p className="text-muted-foreground text-center max-w-md">
                    Something went wrong while fetching the activity details. Please try again or go back.
                </p>
                <Button asChild variant="outline">
                    <Link href={`/dashboard/techfest/${techfestId}/activities`}>
                        Go back to activities
                    </Link>
                </Button>
            </div>
        );
    }

    const activity = data?.data;

    return (
        <div className="max-w-7xl mx-auto md:px-8 space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href={`/dashboard/techfest/${techfestId}/activities`} className="flex items-center hover:text-primary transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Activities
                </Link>
            </div>

            <ActivityDetails techfestId={techfestId} activity={activity} />
        </div>
    );
}