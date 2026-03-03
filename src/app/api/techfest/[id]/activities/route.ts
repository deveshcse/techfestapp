import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "@/app/api/_lib/params";
import { autoCompletePastActivities } from "@/app/api/_lib/activity-status.utils";
import prisma from "@/lib/prisma";
import { CreateUpdateActivityInputSchema } from "@/features/activities/schemas/activity.schema";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  // Lazily auto-complete past activities before listing
  await autoCompletePastActivities();

  const { session } = await authorize(request, "activity", "read");
  const techfestId = await getIdParam(params);

  // visibility logic
  const isElevatedUser =
    session.user.role === "admin" ||
    session.user.role === "organizer";

  const activities = await prisma.activity.findMany({
    where: {
      techfestId,
      // normal users → only published
      // admin/organizer → no filter
      ...(isElevatedUser
        ? {}
        : {
          status: "PUBLISHED",
        }),
    },

    select: {
      id: true,
      title: true,
      venue: true,
      type: true,
      status: true,
      startDateTime: true,
      endDateTime: true,
      capacity: true,
      registrations: {
        where: {
          userId: session.user.id,
          status: "CONFIRMED",
        },
        select: {
          id: true,
          status: true,
        },
      },
    },

    orderBy: {
      startDateTime: "asc",
    },
  });

  return ApiResponse.success(activities.map(activity => ({
    ...activity,
    isRegistered: activity.registrations.length > 0,
    registrationStatus: activity.registrations[0]?.status,
    registrations: undefined, // cleanup
  })));
});

export const POST = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  const { session } = await authorize(request, "activity", "create");
  const techfestId = await getIdParam(params);

  const body = await request.json();
  const payload = { ...body, startDateTime: new Date(body.startDateTime), endDateTime: new Date(body.endDateTime) }
  const result = CreateUpdateActivityInputSchema.safeParse(payload);

  if (!result.success) {
    throw ApiError.badRequest("Invalid input");
  }

  const activityData = result.data;
  const techfest = await prisma.techFest.findUnique({
    where: {
      id: techfestId,
    },
  });

  if (!techfest) {
    throw ApiError.notFound("Techfest not found");
  }

  if (techfest.end_date < new Date()) {
    throw ApiError.badRequest("cant create activity after techfest end date");
  }

  const new_activity = await prisma.activity.create({
    data: {
      ...activityData,
      techfestId: techfestId,
      createdById: session.user.id,
      organizers: {
        connect: { id: session.user.id },
      },
    },
  });

  return ApiResponse.success({
    message: "Activity created successfully",
    activity: new_activity,
  }, 201);
});
