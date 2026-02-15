import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const activityIdSchema = z.coerce.number().int().positive();

export async function GET(request: NextRequest, { params }: Params) {
    try {
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
                organizedBy: {
                    select: {
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

        return NextResponse.json(
            {
                success: true,
                data: activity,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch activity details", details: error },
            { status: 500 },
        );
    }
}
