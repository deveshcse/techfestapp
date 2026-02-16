import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "@/app/api/_lib/params";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

const activityIdSchema = z.coerce.number().int().positive();

export async function POST(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "activity", "register");

        const techfestId = await getIdParam(params);
        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid activity ID" },
                { status: 400 },
            );
        }

        // 1. Fetch activity details and current registration count
        const activity = await prisma.activity.findUnique({
            where: { id: parsedActivityId.data },
            include: {
                _count: {
                    select: { registrations: { where: { status: "CONFIRMED" } } },
                },
            },
        });

        if (!activity) {
            return NextResponse.json(
                { success: false, error: "Activity not found" },
                { status: 404 },
            );
        }

        // 2. Check Capacity
        if (activity.capacity && activity._count.registrations >= activity.capacity) {
            return NextResponse.json(
                { success: false, error: "Activity is full. Registration is currently closed." },
                { status: 400 },
            );
        }

        // 3. Check for existing registration
        const existingRegistration = await prisma.registration.findUnique({
            where: {
                userId_activityId: {
                    userId: session.user.id,
                    activityId: parsedActivityId.data,
                },
            },
        });

        if (existingRegistration && existingRegistration.status === "CONFIRMED") {
            return NextResponse.json(
                { success: false, error: "You are already registered for this activity." },
                { status: 400 },
            );
        }

        // 4. Overlap Detection
        // Get all activities the user is already registered for in this TechFest
        const userRegistrations = await prisma.registration.findMany({
            where: {
                userId: session.user.id,
                status: "CONFIRMED",
                activity: {
                    techfestId: techfestId,
                },
            },
            include: {
                activity: {
                    select: {
                        id: true,
                        title: true,
                        startDateTime: true,
                        endDateTime: true,
                    },
                },
            },
        });

        for (const reg of userRegistrations) {
            const registeredActivity = reg.activity;
            // Overlap check: (Snew < Eold) AND (Enew > Sold)
            const isOverlap =
                activity.startDateTime < registeredActivity.endDateTime &&
                activity.endDateTime > registeredActivity.startDateTime;

            if (isOverlap) {
                return NextResponse.json(
                    {
                        success: false,
                        error: `Schedule conflict: You are already registered for "${registeredActivity.title}" at this time.`,
                    },
                    { status: 400 },
                );
            }
        }

        // 5. Create or Update Registration
        const registration = await prisma.registration.upsert({
            where: {
                userId_activityId: {
                    userId: session.user.id,
                    activityId: parsedActivityId.data,
                },
            },
            create: {
                userId: session.user.id,
                activityId: parsedActivityId.data,
                status: "CONFIRMED",
            },
            update: {
                status: "CONFIRMED",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Successfully registered for activity",
            data: registration,
        }, { status: 201 });
    } catch (error) {
        if (error instanceof NextResponse) throw error;
        console.error("Registration Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error },
            { status: 500 },
        );
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { session } = await authorize(request, "activity", "register");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid activity ID" },
                { status: 400 },
            );
        }

        // We mark as CANCELLED instead of deleting to keep a record (audit trail)
        await prisma.registration.update({
            where: {
                userId_activityId: {
                    userId: session.user.id,
                    activityId: parsedActivityId.data,
                },
            },
            data: {
                status: "CANCELLED",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Successfully unregistered from activity",
        });
    } catch (error) {
        if (error instanceof NextResponse) throw error;
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error },
            { status: 500 },
        );
    }
}
