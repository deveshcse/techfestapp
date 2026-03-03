import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { z } from "zod";
import { RegistrationStatus } from "@/generated/prisma/enums";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const bulkAttendanceSchema = z.object({
    registrationIds: z.array(z.number()),
    attended: z.boolean(),
});

export const POST = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    await authorize(request, "attendance", "mark");

    const body = await request.json();
    const result = bulkAttendanceSchema.safeParse(body);

    if (!result.success) {
        throw ApiError.badRequest("Invalid request body");
    }

    const { registrationIds, attended } = result.data;
    const { session } = await authorize(request, "attendance", "mark");

    await prisma.registration.updateMany({
        where: {
            id: {
                in: registrationIds,
            },
        },
        data: {
            attended,
            attendedAt: attended ? new Date() : null,
            attendanceMarkedBy: attended ? session.user.id : null,
            status: attended ? RegistrationStatus.ATTENDED : RegistrationStatus.CONFIRMED,
        },
    });

    return ApiResponse.success({
        message: `Successfully updated attendance for ${registrationIds.length} registrations`,
    });
});
