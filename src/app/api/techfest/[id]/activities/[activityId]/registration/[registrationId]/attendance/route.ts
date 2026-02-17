import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { z } from "zod";
import { RegistrationStatus } from "@/generated/prisma/enums";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
        registrationId: string;
    }>;
};

const registrationIdSchema = z.coerce.number().int().positive();

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "attendance", "mark");

        const { registrationId } = await params;
        const parsedRegistrationId = registrationIdSchema.safeParse(registrationId);

        if (!parsedRegistrationId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid registration ID" },
                { status: 400 },
            );
        }

        const body = await request.json();
        const { attended } = body;

        if (typeof attended !== "boolean") {
            return NextResponse.json(
                { success: false, error: "Attended status must be a boolean" },
                { status: 400 },
            );
        }

        const updatedRegistration = await prisma.registration.update({
            where: {
                id: parsedRegistrationId.data,
            },
            data: {
                attended,
                attendedAt: attended ? new Date() : null,
                attendanceMarkedBy: attended ? session.user.id : null,
                status: attended ? RegistrationStatus.ATTENDED : RegistrationStatus.CONFIRMED,
            },
        });

        return NextResponse.json({
            success: true,
            data: updatedRegistration,
        });
    } catch (error) {
        if (error instanceof Response) return error;
        console.error("Attendance Update Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error },
            { status: 500 },
        );
    }
}
