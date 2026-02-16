import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { authorize } from "@/app/api/_lib/authorize";
import { AssignOrganizersSchema } from "@/features/activities/schemas/activity.schema";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const activityIdSchema = z.coerce.number().int().positive();

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "activity", "assign-organizer");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid activity ID" },
                { status: 400 },
            );
        }

        const body = await request.json();
        const result = AssignOrganizersSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: "Invalid input", details: result.error },
                { status: 400 },
            );
        }

        const { userIds } = result.data;

        const updatedActivity = await prisma.activity.update({
            where: {
                id: parsedActivityId.data,
            },
            data: {
                organizers: {
                    set: userIds.map((id) => ({ id })),
                },
                updatedById: session.user.id,
            },
            include: {
                organizers: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Organizers updated successfully",
            data: updatedActivity,
        });
    } catch (error) {
        if (error instanceof NextResponse) throw error;
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error },
            { status: 500 },
        );
    }
}
