import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { UpdateActivityStatusSchema } from "@/features/activities/schemas/activity.schema";
import { z } from "zod";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const activityIdSchema = z.coerce.number().int().positive();

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const {session} = await authorize(request, "activity", "update-status");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid Activity ID" },
                { status: 400 },
            );
        }

        const body = await request.json();

        const result = UpdateActivityStatusSchema.safeParse({
            id: parsedActivityId.data,
            ...body,
        });

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

        // check if activity exists
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


        const { status } = result.data;

        const updatedActivity = await prisma.activity.update({
            where: {
                id: parsedActivityId.data,
            },
            data: {
                status,
                updatedById: session.user.id,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Activity status updated successfully",
                data: updatedActivity,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to update activity status", details: error },
            { status: 500 },
        );
    }
}
