import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createEventSchema, eventQuerySchema } from "@/features/events/schemas";
import {
    getAuthenticatedUser,
    unauthorizedResponse,
    badRequestResponse,
    serverErrorResponse,
} from "@/lib/api-utils";

// GET /api/events - List all events
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Parse and validate query parameters
        const queryResult = eventQuerySchema.safeParse({
            published: searchParams.get("published"),
            limit: searchParams.get("limit"),
            offset: searchParams.get("offset"),
        });

        if (!queryResult.success) {
            return badRequestResponse(queryResult.error.issues[0].message);
        }

        const { published, limit = 50, offset = 0 } = queryResult.data;

        // Build where clause
        const where = published !== undefined
            ? { published: published === "true" }
            : {};

        // Fetch events with pagination
        const [events, total] = await Promise.all([
            prisma.event.findMany({
                where,
                orderBy: { created_at: "desc" },
                take: limit,
                skip: offset,
            }),
            prisma.event.count({ where }),
        ]);

        return NextResponse.json({
            data: events,
            meta: {
                total,
                limit,
                offset,
            },
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return serverErrorResponse();
    }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const user = await getAuthenticatedUser();
        if (!user) {
            return unauthorizedResponse();
        }

        // Parse and validate request body
        const body = await request.json();
        const validationResult = createEventSchema.safeParse(body);

        if (!validationResult.success) {
            return badRequestResponse(validationResult.error.issues[0].message);
        }

        const { title, description, start_date, end_date, venue, published } = validationResult.data;

        // Create event in database
        const event = await prisma.event.create({
            data: {
                title,
                description,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                venue,
                published,
                created_by: user.id,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return serverErrorResponse();
    }
}
