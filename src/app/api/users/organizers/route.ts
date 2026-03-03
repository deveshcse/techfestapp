import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";

export const GET = withErrorHandler(async (request: NextRequest) => {
    await authorize(request, "activity", "assign-organizer");

    const organizers = await prisma.user.findMany({
        where: {
            OR: [
                { role: "admin" },
                { role: "organizer" },
            ],
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    return ApiResponse.success(organizers);
});
