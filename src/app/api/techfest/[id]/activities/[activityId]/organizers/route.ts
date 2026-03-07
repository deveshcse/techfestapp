import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { AssignOrganizersSchema } from "@/features/activities/schemas/activity.schema";
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
    const { session } = await authorize(request, "activity", "assign-organizer");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid activity ID");
    }

    const body = await request.json();
    const result = AssignOrganizersSchema.safeParse(body);

    if (!result.success) {
        throw ApiError.badRequest("Invalid input");
    }

    const { userIds } = result.data;

    const updatedActivity = await prisma.activity.update({
        where: {
            id: parsedActivityId.data,
        },
        data: {
            organizers: {
                set: userIds.map((id) => ({ id })),
            },
            updatedById: session.user.id,
        },
        include: {
            organizers: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return ApiResponse.success(updatedActivity);
});
