import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam, idParamSchema } from "@/app/api/_lib/params";
import { RegistrationStatus } from "@/generated/prisma/enums";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";

type Params = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

export const POST = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    const { session } = await authorize(request, "activity", "register");

    const techfestId = await getIdParam(params);
    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid activity ID");
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
        throw ApiError.notFound("Activity not found");
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

        throw ApiError.badRequest(errorMessage);
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
        throw ApiError.badRequest("You are already registered for this activity.");
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
            throw ApiError.badRequest(`Schedule conflict: You are already registered for "${registeredActivity.title}" at this time.`);
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

    return ApiResponse.success({
        message: initialStatus === "CONFIRMED"
            ? "Successfully registered for activity"
            : "Activity is full. You have been added to the waitlist.",
        data: registration,
    }, 201);
});

export const GET = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    await authorize(request, "attendance", "view-list");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid activity ID");
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

    return ApiResponse.success(registrations);
});

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: Params) => {
    const { session } = await authorize(request, "activity", "register");

    const { activityId } = await params;
    const parsedActivityId = idParamSchema.safeParse(activityId);

    if (!parsedActivityId.success) {
        throw ApiError.badRequest("Invalid activity ID");
    }

    // 1. Fetch the current registration to capture its status BEFORE updating
    const existingReg = await prisma.registration.findUnique({
        where: {
            userId_activityId: {
                userId: session.user.id,
                activityId: parsedActivityId.data,
            },
        },
    });

    if (!existingReg) {
        throw ApiError.notFound("Registration not found");
    }

    const originalStatus = existingReg.status;

    // 2. Mark as CANCELLED (soft delete for audit trail)
    await prisma.registration.update({
        where: { id: existingReg.id },
        data: { status: RegistrationStatus.CANCELLED },
    });

    // 3. If the user was CONFIRMED, promote the next person in the waitlist
    if (originalStatus === RegistrationStatus.CONFIRMED) {
        const nextInWaitlist = await prisma.registration.findFirst({
            where: {
                activityId: parsedActivityId.data,
                status: RegistrationStatus.WAITLISTED,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        if (nextInWaitlist) {
            await prisma.registration.update({
                where: { id: nextInWaitlist.id },
                data: { status: RegistrationStatus.CONFIRMED },
            });
        }
    }

    return ApiResponse.success({
        message: "Successfully unregistered from activity",
    });
});
