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
        link.setAttribute("download", `attendance_activity_${activityId}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <div className="space-y-4">
            <Skeleton className="h-[400px] w-full" />
        </div>;
    }

    if (isError) {
        return (
            <Card className="border-destructive/20">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Participants</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">There was an error loading the participant list. Please try again.</p>
                    <Button variant="outline" onClick={() => refetch()} className="mt-4">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle className="text-xl font-semibold">Participants List</CardTitle>
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
            </CardHeader>
            <CardContent>
                <AttendanceTable
                    registrations={registrations}
                    onMarkAttendance={(id, attended) => markAttendance.mutate({ registrationId: id, attended })}
                    onBulkMarkAttendance={(ids, attended) => bulkMarkAttendance.mutate({ registrationIds: ids, attended })}
                    isMarking={markAttendance.isPending}
                    markingVariables={markAttendance.variables}
                    isBulkMarking={bulkMarkAttendance.isPending}
                />
            </CardContent>
        </Card>
    );
}
