import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { z } from "zod";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const bulkAttendanceSchema = z.object({
    registrationIds: z.array(z.number()),
    attended: z.boolean(),
});

export async function POST(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "attendance", "mark");

        const body = await request.json();
        const result = bulkAttendanceSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: "Invalid request body", details: result.error },
                { status: 400 },
            );
        }

        const { registrationIds, attended } = result.data;

        await prisma.registration.updateMany({
            where: {
                id: {
                    in: registrationIds,
                },
            },
            data: {
                attended,
                attendedAt: attended ? new Date() : null,
                attendanceMarkedBy: attended ? session.user.id : null,
            },
        });

        return NextResponse.json({
            success: true,
            message: `Successfully updated attendance for ${registrationIds.length} registrations`,
        });
    } catch (error) {
        if (error instanceof Response) return error;
        console.error("Bulk Attendance Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error },
            { status: 500 },
        );
    }
}
