import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { CreateUpdateActivityInputSchema } from "@/features/activities/schemas/activity.schema";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";
import { idParamSchema } from "@/app/api/_lib/params";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

export const GET = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    const { session } = await authorize(request, "activity", "read");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid Activity ID");
    }

    const activity = await prisma.activity.findUnique({
        where: {
            id: parsedActivityId.data,
        },
        select: {
            id: true,
            title: true,
            description: true,
            venue: true,
            type: true,
            status: true,
            startDateTime: true,
            endDateTime: true,
            capacity: true,
            rules: true,
            organizers: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
    });

    if (!activity) {
        throw ApiError.notFound("Activity not found");
    }

    // Check if user is registered
    const registration = await prisma.registration.findFirst({
        where: {
            activityId: parsedActivityId.data,
            userId: session.user.id,
            status: {
                in: ["CONFIRMED", "WAITLISTED", "PENDING", "ATTENDED"]
            }
        },
    });

    // Get total registration count
    const registrationCount = await prisma.registration.count({
        where: {
            activityId: parsedActivityId.data,
            status: "CONFIRMED",
        },
    });

    const data = {
        ...activity,
        isRegistered: !!registration,
        registrationStatus: registration?.status,
        registrationCount,
    };

    return ApiResponse.success(data);
});

export const PUT = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    const { session } = await authorize(request, "activity", "update");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid Activity ID");
    }

    // check if the activity is cancelled or completed then dont need to update
    const activity = await prisma.activity.findUnique({
        where: {
            id: parsedActivityId.data,
        },
    });

    if (!activity) {
        throw ApiError.notFound("Activity not found");
    }

    if (activity.status === "CANCELLED" || activity.status === "COMPLETED") {
        throw ApiError.badRequest("Activity is cancelled or completed");
    }

    const body = await request.json();

    // Transform dates if they are strings
    const payload = {
        ...body,
        id: parsedActivityId.data
    };

    if (body.startDateTime) payload.startDateTime = new Date(body.startDateTime);
    if (body.endDateTime) payload.endDateTime = new Date(body.endDateTime);

    const result = CreateUpdateActivityInputSchema.safeParse(payload);

    if (!result.success) {
        throw ApiError.badRequest("Invalid input");
    }

    const activityData = result.data;
    const { id, ...updateData } = activityData;

    // Transform rules from { value: string }[] to string[] for the database
    const finalUpdateData = {
        ...updateData,
        rules: updateData.rules?.map((rule: any) => typeof rule === 'string' ? rule : rule.value)
    };

    const updatedActivity = await prisma.activity.update({
        where: {
            id: parsedActivityId.data,
        },
        data: { ...finalUpdateData, updatedById: session.user.id },
    });

    return ApiResponse.success({
        message: "Activity updated successfully",
        data: updatedActivity,
    });
});

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    await authorize(request, "activity", "delete");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid Activity ID");
    }

    await prisma.activity.delete({
        where: {
            id: parsedActivityId.data,
        },
    });

    return ApiResponse.success({
        message: "Activity deleted successfully",
    });
});
