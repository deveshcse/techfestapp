"use client";
import { format } from "date-fns";
import {
    CalendarIcon,
    MapPin,
    Trash2,
    Pencil,
    Clock,
    Users,
    Info,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ActivityResponse, ActivityStatus } from "../types/activity.types";
import { useActivityActions } from "../utils/useActivities";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { ActivityCreateUpdateForm } from "./activity-create-update-form";
import { ActivityStatusUpdateForm } from "./activity-status-update-form";
import { ActivityOrganizerAssignForm } from "./activity-organizer-assign-form";
import { Access } from "@/features/auth/components/permission/access";

type Props = {
    techfestId: number;
    activity: ActivityResponse;
};

const statusStyles: Record<ActivityStatus, string> = {
    DRAFT: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PUBLISHED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
    COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
};

export function ActivityDetails({ techfestId, activity }: Props) {
    const { delete_activity, register, unregister } = useActivityActions(techfestId, activity.id);
    const { open } = useModalStore();
    const confirm = useConfirm();

    const handleUpdateClick = () => {
        open(
            <ActivityCreateUpdateForm
                techfestId={techfestId}
                activityId={activity.id}
                initialData={activity}
            />,
            "Update Activity",
            "Modify the details of this activity."
        );
    };

    const handleStatusUpdateClick = () => {
        open(
            <ActivityStatusUpdateForm
                techfestId={techfestId}
                activityId={activity.id}
                initialStatus={activity.status}
            />,
            "Update Status",
            "Change the current status of this activity."
        );
    };

    const handleAssignClick = () => {
        open(
            <ActivityOrganizerAssignForm
                techfestId={techfestId}
                activityId={activity.id}
                initialOrganizerIds={activity.organizers.map(o => o.id)}
            />,
            "Assign Organizers",
            "Select users to manage this activity."
        );
    };

    const handleDelete = async () => {
        await confirm({
            title: "Delete Activity?",
            description: "This action will permanently delete the activity. Are you sure you want to proceed?",
            destructive: true,
            confirmText: "Delete",
            actionLabel: "Deleting",
            icon: <Trash2 className="h-4 w-4" />,
            onConfirm: () => delete_activity.mutateAsync(),
        });
    };

    const handleRegister = () => {
        register.mutate();
    };

    const handleUnregister = async () => {
        const isWaitlisted = activity.registrationStatus === "WAITLISTED";
        await confirm({
            title: isWaitlisted ? "Leave Waitlist?" : "Unregister?",
            description: isWaitlisted
                ? "Are you sure you want to remove yourself from the waitlist?"
                : "Are you sure you want to unregister from this activity?",
            destructive: true,
            confirmText: isWaitlisted ? "Leave Waitlist" : "Unregister",
            actionLabel: isWaitlisted ? "Leaving" : "Unregistering",
            onConfirm: () => unregister.mutateAsync(),
        });
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 pb-10">
            {/* HEADER / ACTION BAR */}
            <div className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/95 backdrop-blur border rounded-xl p-6 shadow-sm">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight">{activity.title}</h1>
                        <Badge className={cn("px-2.5 py-0.5 font-semibold transition-colors", statusStyles[activity.status])}>
                            {activity.status}
                        </Badge>
                    </div>
                    {/* <p className="text-muted-foreground flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        ID: {activity.id} • Last updated {format(new Date(activity.updatedAt), "PPp")}
                    </p> */}
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">

                    <Access resource="activity" action="update">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleUpdateClick}
                            className="flex-1 sm:flex-none"
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Activity
                        </Button>
                    </Access>


                    <Access resource="activity" action="update-status">
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 sm:flex-none"
                            onClick={handleStatusUpdateClick}
                        >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Update Status
                        </Button></Access>


                    <Access resource="activity" action="assign-organizer">
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 sm:flex-none"
                            onClick={handleAssignClick}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Assign Organizer
                        </Button>
                    </Access>

                    <Access resource="activity" action="register">
                        {activity.isRegistered ? (
                            <Button
                                size="sm"
                                variant="outline"
                                className={cn(
                                    "flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50",
                                    activity.registrationStatus === "WAITLISTED" && "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                                )}
                                onClick={handleUnregister}
                                disabled={unregister.isPending}
                            >
                                <Users className="mr-2 h-4 w-4" />
                                {activity.registrationStatus === "WAITLISTED" ? "Leave Waitlist" : "Unregister"}
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant={activity.capacity !== undefined && (activity.registrationCount || 0) >= activity.capacity ? "outline" : "default"}
                                className="flex-1 sm:flex-none"
                                onClick={handleRegister}
                                disabled={register.isPending}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                {activity.capacity !== undefined && (activity.registrationCount || 0) >= activity.capacity ? "Join Waitlist" : "Register Now"}
                            </Button>
                        )}
                    </Access>


                    <Access resource="activity" action="delete">
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={delete_activity.isPending}
                            className="flex-1 sm:flex-none"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </Access>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                {activity.description || "No description provided."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Rules */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-primary" />
                                Guidelines & Rules
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activity.rules && activity.rules.length > 0 ? (
                                <ul className="space-y-4">
                                    {activity.rules.map((rule, index) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                                {index + 1}
                                            </span>
                                            <p className="text-muted-foreground">{rule.value}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground italic">No rules specified for this activity.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="shadow-sm border-primary/10">
                        <CardHeader className="bg-primary/5">
                            <CardTitle className="text-lg font-semibold">Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <CalendarIcon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</p>
                                        <p className="text-sm font-semibold">{format(new Date(activity.startDateTime), "PPP")}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</p>
                                        <p className="text-sm font-semibold">
                                            {format(new Date(activity.startDateTime), "p")} - {format(new Date(activity.endDateTime), "p")}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex gap-3 items-start">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Venue</p>
                                        <p className="text-sm font-semibold">{activity.venue || "TBD"}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Users className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Registration</p>
                                        <p className="text-sm font-semibold">{activity.registrationCount || 0} / {activity.capacity || "∞"} Enrolled</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Badge variant="outline" className="h-4 w-4 p-0 flex items-center justify-center border-primary/20">
                                            <span className="text-[10px] font-bold text-primary">T</span>
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activity Type</p>
                                        <Badge variant="secondary" className="mt-1 capitalize">
                                            {activity.type.toLowerCase().replace("_", " ")}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Organized By</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {activity.organizers && activity.organizers.length > 0 ? (
                                    activity.organizers.map((organizer) => (
                                        <div key={organizer.id} className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground uppercase">
                                                {organizer.name?.charAt(0) || "U"}
                                            </div>
                                            <p className="font-medium">{organizer.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No organizers assigned.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
