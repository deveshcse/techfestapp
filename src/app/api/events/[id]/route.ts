import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateEventSchema } from "@/features/events/event.schema";
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

// GET /api/events/[id] - Get single event
export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            return notFoundResponse("Event not found");
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return serverErrorResponse();
    }
}

// PUT /api/events/[id] - Update event
export async function PUT(
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
        const validationResult = updateEventSchema.safeParse(body);

        if (!validationResult.success) {
            return badRequestResponse(validationResult.error.issues[0].message);
        }

        const updateData = validationResult.data;

        // Convert date strings to Date objects if present
        const data: any = {
            ...updateData,
            updated_by: user.id,
        };

        if (updateData.start_date) {
            data.start_date = new Date(updateData.start_date);
        }
        if (updateData.end_date) {
            data.end_date = new Date(updateData.end_date);
        }

        // Update event in database
        const event = await prisma.event.update({
            where: { id },
            data,
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        return serverErrorResponse();
    }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
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

        // Delete event from database
        await prisma.event.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting event:", error);
        return serverErrorResponse();
    }
}
