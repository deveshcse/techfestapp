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
        <div className="mx-auto max-w-7xl space-y-6 pb-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                    <Link href={`/dashboard/techfest/${techfestId}/activity/${parsedActivityId}`}>
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
                        <span className="text-muted-foreground font-light">/</span>
                        <span className="text-muted-foreground font-medium">{activity.title}</span>
                    </div>
                    <p className="text-muted-foreground">
                        Track and manage participant presence for this activity.
                    </p>
                </div>
            </div>

            <AttendanceTableContainer techfestId={techfestId} activityId={parsedActivityId} />
        </div>
    );
}
