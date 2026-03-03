import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { UpdateActivityStatusSchema } from "@/features/activities/schemas/activity.schema";
import { VALID_TRANSITIONS } from "@/features/activities/utils/status-transitions";
import { ActivityStatus } from "@/generated/prisma/enums";
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

export const PATCH = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    const { session } = await authorize(request, "activity", "update-status");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid Activity ID");
    }

    const body = await request.json();

    const result = UpdateActivityStatusSchema.safeParse({
        id: parsedActivityId.data,
        ...body,
    });

    if (!result.success) {
        throw ApiError.badRequest("Invalid input");
    }

    // check if activity exists
    const activity = await prisma.activity.findUnique({
        where: {
            id: parsedActivityId.data,
        },
    });

    if (!activity) {
        throw ApiError.notFound("Activity not found");
    }

    const { status } = result.data;

    // Validate status transition
    const allowedNext = VALID_TRANSITIONS[activity.status as ActivityStatus] ?? [];
    if (!allowedNext.includes(status as ActivityStatus)) {
        throw ApiError.badRequest(`Cannot transition from ${activity.status} to ${status}.`);
    }

    const updatedActivity = await prisma.activity.update({
        where: {
            id: parsedActivityId.data,
        },
        data: {
            status,
            updatedById: session.user.id,
        },
    });

    return ApiResponse.success({
        message: "Activity status updated successfully",
        data: updatedActivity,
    });
});
