import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { autoCompletePastActivities } from "@/app/api/_lib/activity-status.utils";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";

export const GET = withErrorHandler(async (request: NextRequest) => {
    await autoCompletePastActivities();

    const { session } = await authorize(request, "techfest", "read");
    const role = session.user.role;
    const userId = session.user.id;

    if (role === "user") {
        throw ApiError.forbidden("Access denied");
    }

    // Build date range for today (start of day → end of day)
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const whereClause: Record<string, unknown> = {
        // Activity starts or ends today, or spans across today
        OR: [
            {
                startDateTime: { gte: startOfDay, lt: endOfDay },
            },
            {
                endDateTime: { gt: startOfDay, lte: endOfDay },
            },
            {
                startDateTime: { lt: startOfDay },
                endDateTime: { gt: endOfDay },
            },
        ],
        status: { in: ["PUBLISHED", "REGISTRATION_CLOSED", "COMPLETED"] },
    };

    // Organizers only see their own activities
    if (role === "organizer") {
        whereClause.AND = [
            {
                OR: [
                    { createdById: userId },
                    { organizers: { some: { id: userId } } },
                ],
            },
        ];
    }

    const activities = await prisma.activity.findMany({
        where: whereClause,
        select: {
            id: true,
            title: true,
            venue: true,
            startDateTime: true,
            endDateTime: true,
            status: true,
            type: true,
            techfestId: true,
            techfest: {
                select: {
                    title: true,
                },
            },
            _count: {
                select: {
                    registrations: {
                        where: { status: { in: ["CONFIRMED", "ATTENDED"] } },
                    },
                },
            },
        },
        orderBy: {
            startDateTime: "asc",
        },
    });

    return ApiResponse.success(activities.map((a) => ({
        id: a.id,
        title: a.title,
        venue: a.venue,
        startDateTime: a.startDateTime,
        endDateTime: a.endDateTime,
        status: a.status,
        type: a.type,
        techfestId: a.techfestId,
        techfestTitle: a.techfest.title,
        registrationCount: a._count.registrations,
    })));
});
