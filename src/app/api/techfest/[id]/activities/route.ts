import { NextResponse, NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "@/app/api/_lib/params";
import { autoCompletePastActivities } from "@/app/api/_lib/activity-status.utils";
import prisma from "@/lib/prisma";
import { CreateUpdateActivityInputSchema } from "@/features/activities/schemas/activity.schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
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

    return NextResponse.json(
      {
        success: true,
        data: activities.map(activity => ({
          ...activity,
          isRegistered: activity.registrations.length > 0,
          registrationStatus: activity.registrations[0]?.status,
          registrations: undefined, // cleanup
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch activities", details: error },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { session } = await authorize(request, "activity", "create");

    const techfestId = await getIdParam(params);

    const body = await request.json();
    const payload = { ...body, startDateTime: new Date(body.startDateTime), endDateTime: new Date(body.endDateTime) }
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
    const techfest = await prisma.techFest.findUnique({
      where: {
        id: techfestId,
      },
    });

    if (!techfest) {
      return NextResponse.json(
        {
          success: false,
          error: "Techfest not found",
        },
        { status: 404 },
      );
    }

    if (techfest.end_date < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: "cant create activity after techfest end date",
        },
        { status: 400 },
      );
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

    return NextResponse.json(
      {
        success: true,
        message: "Activity created successfully",
        activity: new_activity,
      },
      { status: 201 },
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request", details: error },
      { status: 500 },
    );
  }
}
