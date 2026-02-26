import { AttendanceTableContainer } from "@/features/activities/components/attendance-table-container";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

export default async function AttendancePage({ params }: Params) {
    const { id, activityId } = await params;
    const techfestId = parseInt(id);
    const parsedActivityId = parseInt(activityId);

    if (isNaN(techfestId) || isNaN(parsedActivityId)) {
        return notFound();
    }

    const activity = await prisma.activity.findUnique({
        where: { id: parsedActivityId },
        select: { title: true },
    });

    if (!activity) {
        return notFound();
    }

    return (
        <div className="mx-6 flex flex-col h-full space-y-6 pb-10">
            <div className="flex items-center gap-4">

                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
                        <span className="text-muted-foreground font-light">/</span>
                        <span className="text-muted-foreground font-medium text-lg">{activity.title}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Track and manage participant presence for this activity.
                    </p>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <AttendanceTableContainer techfestId={techfestId} activityId={parsedActivityId} />
            </div>
        </div>
    );
}
