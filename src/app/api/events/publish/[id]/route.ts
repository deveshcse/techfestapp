import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { publishEventSchema } from "@/features/archive-events/event.schema";
import {
    getAuthenticatedUser,
    unauthorizedResponse,
    badRequestResponse,
    notFoundResponse,
    serverErrorResponse,
} from "@/app/api/_lib/utils";

type RouteContext = {
    params: Promise<{ id: string }>;
};

// PATCH /api/events/publish/[id] - Toggle publish status
export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    try {
        // Check authentication
        const user = await getAuthenticatedUser();
        if (!user) {
            return unauthorizedResponse();
        }

        const { id } = await context.params;

        // Check if event exists
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return notFoundResponse("Event not found");
        }

        // Parse and validate request body
        const body = await request.json();
        const validationResult = publishEventSchema.safeParse(body);

        if (!validationResult.success) {
            return badRequestResponse(validationResult.error.issues[0].message);
        }

        const { published } = validationResult.data;

        // Update publish status
        const event = await prisma.event.update({
            where: { id },
            data: {
                published,
                updated_by: user.id,
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error updating event publish status:", error);
        return serverErrorResponse();
    }
}
