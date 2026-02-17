"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { useRegistrations } from "../utils/hooks/use-registrations";
import { MyRegistrationsSkeleton } from "./my-registrations-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";

export function MyRegistrationsList() {
    const { data: response, isLoading, isError, error } = useRegistrations();

    if (isLoading) {
        return <MyRegistrationsSkeleton />;
    }

    if (isError) {
        return (
            <ErrorState
                title="Failed to load registrations"
                message={error instanceof Error ? error.message : "Please try again later."}
                action={
                    <Button variant="outline" onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                }
            />
        );
    }

    const registrations = response?.data || [];

    if (registrations.length === 0) {
        return (
            <EmptyState
                icon={Calendar}
                title="No registrations yet"
                description="You haven't registered for any activities. Browse the events to join!"
                action={
                    <Link href="/dashboard/techfest">
                        <Button>Explore Techfests</Button>
                    </Link>
                }
            />
        );
    }

    return (
        <div className="space-y-4">
            {registrations.map((reg) => {
                const activity = reg.activity;
                const registrationStatus = reg.status;

                return (
                    <Card
                        key={reg.id}
                        className="overflow-hidden transition-all hover:shadow-md group"
                    >
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                {/* Type Indicator */}
                                <div className={cn(
                                    "w-2",
                                    registrationStatus === "WAITLISTED" ? "bg-yellow-500" : "bg-primary"
                                )} />

                                <div className="flex-1 p-5 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                                    {activity.techfest.title}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold leading-none group-hover:text-primary transition-colors">
                                                {activity.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="default"
                                                className={cn(
                                                    "bg-blue-100 text-blue-800 border-blue-200",
                                                    registrationStatus === "WAITLISTED" && "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                )}
                                            >
                                                {registrationStatus === "WAITLISTED" ? "Waitlisted" : "Registered"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-1">
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
                                        <Link href={`/dashboard/techfest/${activity.techfest.id}/activities/${activity.id}`}>
                                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                                                View Detail
                                                <ExternalLink className="ml-2 h-3 w-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
