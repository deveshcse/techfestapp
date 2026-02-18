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

        // 1.5 Check Activity Status
        if (activity.status !== "PUBLISHED") {
            let errorMessage = "Registration is not available for this activity.";
            if (activity.status === "REGISTRATION_CLOSED") {
                errorMessage = "Registration for this activity is now closed.";
            } else if (activity.status === "DRAFT") {
                errorMessage = "This activity is not yet open for registration.";
            } else if (activity.status === "CANCELLED") {
                errorMessage = "This activity has been cancelled.";
            } else if (activity.status === "COMPLETED") {
                errorMessage = "This activity has already been completed.";
            }

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: 400 },
            );
        }

        // 2. Determine initial status based on Capacity
        let initialStatus: "CONFIRMED" | "WAITLISTED" = "CONFIRMED";
        if (activity.capacity && activity._count.registrations >= activity.capacity) {
            initialStatus = "WAITLISTED";
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
                status: initialStatus,
            },
            update: {
                status: initialStatus,
            },
        });

        return NextResponse.json({
            success: true,
            message: initialStatus === "CONFIRMED"
                ? "Successfully registered for activity"
                : "Activity is full. You have been added to the waitlist.",
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

export async function GET(request: NextRequest, { params }: Params) {
    try {
        await authorize(request, "attendance", "view-list");

        const { activityId } = await params;
        const parsedActivityId = activityIdSchema.safeParse(activityId);

        if (!parsedActivityId.success) {
            return NextResponse.json(
                { success: false, error: "Invalid activity ID" },
                { status: 400 },
            );
        }

        const registrations = await prisma.registration.findMany({
            where: {
                activityId: parsedActivityId.data,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return NextResponse.json({
            success: true,
            data: registrations,
        });
    } catch (error) {
        if (error instanceof Response) return error;
        console.error("Fetch Registrations Error:", error);
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
        const cancelledRegistration = await prisma.registration.update({
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

        // If the user was CONFIRMED, promote the next person in the waitlist
        if (cancelledRegistration.status === "CONFIRMED") {
            const nextInWaitlist = await prisma.registration.findFirst({
                where: {
                    activityId: parsedActivityId.data,
                    status: "WAITLISTED",
                },
                orderBy: {
                    createdAt: "asc",
                },
            });

            if (nextInWaitlist) {
                await prisma.registration.update({
                    where: { id: nextInWaitlist.id },
                    data: { status: "CONFIRMED" },
                });
            }
        }

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
