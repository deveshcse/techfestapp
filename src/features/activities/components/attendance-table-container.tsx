"use client";

import { useAttendance } from "../utils/useAttendance";
import { AttendanceTable } from "./attendance-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface AttendanceTableContainerProps {
    techfestId: number;
    activityId: number;
}

export function AttendanceTableContainer({ techfestId, activityId }: AttendanceTableContainerProps) {
    const { registrations, isLoading, isError, refetch, markAttendance, bulkMarkAttendance } = useAttendance(techfestId, activityId);

    const handleExportCSV = () => {
        const headers = ["Name", "Email", "Status", "Attended", "Marked At"];
        const rows = registrations.map(reg => [
            reg.user.name,
            reg.user.email,
            reg.status,
            reg.attended ? "Yes" : "No",
            reg.attendedAt ? new Date(reg.attendedAt).toLocaleString() : "-"
        ]);

        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `attendance_techfest_${techfestId}_activity_${activityId}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return (
            <div className="h-full flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-40" />
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-28 rounded-md" />
                    </div>
                </div>

                <div className="flex-1 min-h-0 bg-background rounded-xl border p-4 border-border/50">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 border border-destructive/20 rounded-lg bg-destructive/5 h-full flex flex-col items-center justify-center text-center">
                <h3 className="text-destructive font-semibold text-lg">Error Loading Participants</h3>
                <p className="text-muted-foreground max-w-sm mt-2">There was an error loading the participant list. Please try again.</p>
                <Button variant="outline" onClick={() => refetch()} className="mt-4">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Participants List</h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportCSV}
                        disabled={registrations.length === 0}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 bg-background rounded-xl border p-1 border-border/50">
                <AttendanceTable
                    registrations={registrations}
                    onMarkAttendance={(id, attended) => markAttendance.mutate({ registrationId: id, attended })}
                    onBulkMarkAttendance={(ids, attended) => bulkMarkAttendance.mutate({ registrationIds: ids, attended })}
                    isMarking={markAttendance.isPending}
                    markingVariables={markAttendance.variables}
                    isBulkMarking={bulkMarkAttendance.isPending}
                />
            </div>
        </div>
    );
}
