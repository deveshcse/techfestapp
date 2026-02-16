import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { authorize } from "@/app/api/_lib/authorize";
import { CreateUpdateActivityInputSchema } from "@/features/activities/schemas/activity.schema";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const activityIdSchema = z.coerce.number().int().positive();

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "activity", "read");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid Activity ID" },
                { status: 400 },
            );
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
            return NextResponse.json(
                { success: false, error: "Activity not found" },
                { status: 404 },
            );
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

        return NextResponse.json(
            {
                success: true,
                message: "Activity details fetched successfully",
                data,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch activity details", details: error instanceof Error ? error.message : String(error) },
            { status: 500 },
        );
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "activity", "update");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid Activity ID" },
                { status: 400 },
            );
        }

        // check if the activity is cancelled or completed then dont need to update
        const activity = await prisma.activity.findUnique({
            where: {
                id: parsedActivityId.data,
            },
        });

        if (!activity) {
            return NextResponse.json(
                { success: false, error: "Activity not found" },
                { status: 404 },
            );
        }

        if (activity.status === "CANCELLED" || activity.status === "COMPLETED") {
            return NextResponse.json(
                { success: false, error: "Activity is cancelled or completed" },
                { status: 400 },
            );
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
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid input",
                    details: result.error,
                },
                { status: 400 },
            );
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

        return NextResponse.json(
            {
                success: true,
                message: "Activity updated successfully",
                data: updatedActivity,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to update activity", details: error },
            { status: 500 },
        );
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        await authorize(request, "activity", "delete");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid Activity ID" },
                { status: 400 },
            );
        }

        await prisma.activity.delete({
            where: {
                id: parsedActivityId.data,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Activity deleted successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to delete activity", details: error },
            { status: 500 },
        );
    }
}
