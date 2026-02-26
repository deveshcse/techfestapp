import * as React from "react";
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
    UserCheck,
    List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { ActivityResponse, ActivityStatus } from "../types/activity.types";
import { useActivityActions } from "../utils/useActivities";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { ActivityCreateUpdateForm } from "./activity-create-update-form";
import { ActivityStatusUpdateForm } from "./activity-status-update-form";
import { ActivityOrganizerAssignForm } from "./activity-organizer-assign-form";
import { Access } from "@/features/auth/components/permission/access";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
    techfestId: number;
    activity: ActivityResponse;
};

const statusStyles: Record<ActivityStatus, string> = {
    DRAFT: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50",
    PUBLISHED: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50",
    CANCELLED: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50",
    COMPLETED: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
    REGISTRATION_CLOSED: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900/50",
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

    const ActionButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
        <React.Fragment>
            <Access resource="activity" action="update">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleUpdateClick}
                    className={cn(isMobile ? "w-full justify-start" : "")}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Activity
                </Button>
            </Access>

            <Access resource="activity" action="update-status">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleStatusUpdateClick}
                    className={cn(isMobile ? "w-full justify-start" : "")}
                >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Update Status
                </Button>
            </Access>

            <Access resource="activity" action="assign-organizer">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAssignClick}
                    className={cn(isMobile ? "w-full justify-start" : "")}
                >
                    <Users className="mr-2 h-4 w-4" />
                    Assign Organizer
                </Button>
            </Access>

            <Access resource="attendance" action="view-list">
                <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className={cn(isMobile ? "w-full justify-start" : "")}
                >
                    <Link href={`/dashboard/techfest/${techfestId}/activity/${activity.id}/attendance`}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Attendance
                    </Link>
                </Button>
            </Access>

            <Access resource="activity" action="register">
                {activity.isRegistered ? (
                    <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                            isMobile ? "w-full justify-start" : "",
                            "border-destructive/20 text-destructive hover:bg-destructive/10",
                            activity.registrationStatus === "WAITLISTED" && "border-yellow-200/50 text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
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
                        className={cn(isMobile ? "w-full justify-start" : "")}
                        onClick={handleRegister}
                        disabled={register.isPending || activity.status !== "PUBLISHED"}
                    >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {activity.status === "REGISTRATION_CLOSED"
                            ? "Registration Closed"
                            : activity.capacity !== undefined && (activity.registrationCount || 0) >= activity.capacity
                                ? "Join Waitlist"
                                : "Register Now"}
                    </Button>
                )}
            </Access>

            <Access resource="activity" action="delete">
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={delete_activity.isPending}
                    className={cn(isMobile ? "w-full justify-start" : "")}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </Access>
        </React.Fragment>
    );

    return (
        <section className="h-full flex flex-col w-full">
            <nav className="px-6 flex items-center justify-between gap-4 border-b py-2 bg-background sticky top-0 z-10">
                <div className="flex flex-col item-center justify-center overflow-hidden">
                    <Label className="text-xl font-semibold truncate md:w-96 w-full">{activity.title}</Label>
                    <Label className="text-xs text-muted-foreground">manage this activity</Label>
                </div>

                {/* Mobile Actions */}
                <div className="md:hidden flex items-center justify-end">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                                <List className="mr-2 h-4 w-4" />
                                Actions
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-2 space-y-2">
                            <ActionButtons isMobile />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center justify-end gap-2">
                    <ActionButtons />
                </div>
            </nav>

            <div className="px-6 w-full h-full overflow-y-auto space-y-6 pb-40 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Strip for Mobile-like visibility */}
                        <div className={cn("p-3 rounded-lg border flex items-center justify-between", statusStyles[activity.status])}>
                            <div className="flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                <span className="text-sm font-bold uppercase tracking-wider">{activity.status}</span>
                            </div>
                            <Badge variant="outline" className="bg-background/50 border-none capitalize">
                                {activity.type.toLowerCase().replace("_", " ")}
                            </Badge>
                        </div>

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
                                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground uppercase text-xs">
                                                    {organizer.name?.charAt(0) || "U"}
                                                </div>
                                                <p className="text-sm font-medium">{organizer.name}</p>
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
        </section>
    );
}
