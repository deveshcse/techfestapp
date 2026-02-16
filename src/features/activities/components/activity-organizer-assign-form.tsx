"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssignOrganizersSchema } from "../schemas/activity.schema";
import { useAssignActivityOrganizers, usePotentialOrganizers } from "../utils/useActivities";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

interface ActivityOrganizerAssignFormProps {
    techfestId: number;
    activityId: number;
    initialOrganizerIds: string[];
}

export function ActivityOrganizerAssignForm({
    techfestId,
    activityId,
    initialOrganizerIds,
}: ActivityOrganizerAssignFormProps) {
    const { close } = useModalStore();
    const { data: potentialOrganizers, isLoading } = usePotentialOrganizers();
    const assignMutation = useAssignActivityOrganizers(techfestId, activityId);

    const [searchTerm, setSearchTerm] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<{ userIds: string[] }>({
        resolver: zodResolver(AssignOrganizersSchema),
        defaultValues: {
            userIds: initialOrganizerIds,
        },
    });

    const selectedUserIds = watch("userIds");

    const filteredOrganizers = useMemo(() => {
        if (!potentialOrganizers?.data) return [];
        return potentialOrganizers.data.filter((user: any) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [potentialOrganizers, searchTerm]);

    const toggleUser = (userId: string) => {
        const current = selectedUserIds || [];
        if (current.includes(userId)) {
            setValue("userIds", current.filter(id => id !== userId));
        } else {
            setValue("userIds", [...current, userId]);
        }
    };

    async function onSubmit(data: { userIds: string[] }) {
        try {
            await assignMutation.mutateAsync(data.userIds, {
                onSuccess: () => {
                    close();
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search organizers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ScrollArea className="h-[300px] border rounded-md p-4">
                <div className="space-y-4">
                    {filteredOrganizers.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No potential organizers found.</p>
                    ) : (
                        filteredOrganizers.map((user: any) => (
                            <div key={user.id} className="flex items-center space-x-3 space-y-0">
                                <Checkbox
                                    id={user.id}
                                    checked={selectedUserIds.includes(user.id)}
                                    onCheckedChange={() => toggleUser(user.id)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label
                                        htmlFor={user.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                        {user.name}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email} • {user.role}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{selectedUserIds.length} organizers selected</span>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setValue("userIds", [])}
                >
                    Clear all
                </Button>
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || assignMutation.isPending}
            >
                {assignMutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    "Save Assignments"
                )}
            </Button>
        </form>
    );
}
