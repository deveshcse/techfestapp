import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { RegistrationStatus } from "@/generated/prisma/enums";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";
import { idParamSchema } from "@/app/api/_lib/params";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
        registrationId: string;
    }>;
};

export const PATCH = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    const { session } = await authorize(request, "attendance", "mark");

    const { registrationId } = await params;
    const parsedRegistrationId = idParamSchema.safeParse(registrationId);

    if (!parsedRegistrationId.success) {
        throw ApiError.badRequest("Invalid registration ID");
    }

    const body = await request.json();
    const { attended } = body;

    if (typeof attended !== "boolean") {
        throw ApiError.badRequest("Attended status must be a boolean");
    }

    const updatedRegistration = await prisma.registration.update({
        where: {
            id: parsedRegistrationId.data,
        },
        data: {
            attended,
            attendedAt: attended ? new Date() : null,
            attendanceMarkedBy: attended ? session.user.id : null,
            status: attended ? RegistrationStatus.ATTENDED : RegistrationStatus.CONFIRMED,
        },
    });

    return ApiResponse.success(updatedRegistration);
});
