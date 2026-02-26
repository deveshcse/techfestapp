"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRegistrations } from "../utils/hooks/use-registrations";
import { MyRegistrationsSkeleton } from "./my-registrations-skeleton";
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
import { useRouter } from "next/navigation";

export function MyRegistrationsList() {
    const router = useRouter();
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
                    <Button onClick={() => router.push("/dashboard/techfest")}>
                        Explore Techfests
                    </Button>
                }
            />
        );
    }

    return (
        <ItemGroup className="border rounded-lg overflow-hidden bg-background">
            {registrations.map((reg, index) => {
                const activity = reg.activity;
                const registrationStatus = reg.status;

                return (
                    <React.Fragment key={reg.id}>
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

                                <Label className="text-muted-foreground/80 text-[10px] mt-1 font-normal line-clamp-1 italic">
                                    {activity.techfest.title}
                                </Label>
                            </ItemContent>

                            <ItemActions>
                                <Badge
                                    variant="default"
                                    className={cn(
                                        "px-2.5 py-0.5",
                                        "bg-blue-100 text-blue-800 border-blue-200",
                                        registrationStatus === "WAITLISTED" && "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    )}
                                >
                                    {registrationStatus === "WAITLISTED" ? "Waitlisted" : "Registered"}
                                </Badge>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => router.push(`/dashboard/techfest/${activity.techfest.id}/activities/${activity.id}`)}
                                    aria-label={`View details for ${activity.title}`}
                                >
                                    View
                                </Button>
                            </ItemActions>
                        </Item>
                        {index < registrations.length - 1 && <ItemSeparator />}
                    </React.Fragment>
                );
            })}
        </ItemGroup>
    );
}
