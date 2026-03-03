import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";

// get my registrations based on user id

export const GET = withErrorHandler(async (request: NextRequest) => {
    const { session } = await authorize(request, "registration", "read");

    const registrations = await prisma.registration.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            activity: {
                select: {
                    id: true,
                    title: true,
                    venue: true,
                    type: true,
                    status: true,
                    startDateTime: true,
                    endDateTime: true,
                    capacity: true,
                    techfest: {
                        select: {
                            id: true,
                            title: true,
                        }
                    }
                }
            },
        },
        orderBy: {
            activity: {
                startDateTime: "asc"
            }
        }
    });

    return ApiResponse.success(registrations);
});
