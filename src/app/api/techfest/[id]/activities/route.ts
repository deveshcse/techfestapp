import { NextResponse, NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "@/app/api/_lib/params";
import prisma from "@/lib/prisma";
import { CreateActivityInputSchema } from "@/features/activities/schemas/activity.schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const techfestId = await getIdParam(params);

    const activities = await prisma.activity.findMany({
      where: {
        techfestId: techfestId,
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
      },

      orderBy: {
        startDateTime: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: activities,
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
    const authResult = await authorize(request, "activity", "create");

    if (!authResult.success) {
      return authResult.response;
    }

    const { session } = authResult;
    const techfestId = await getIdParam(params);

    const body = await request.json();
    const payload = { ...body, startDateTime: new Date(body.startDateTime), endDateTime: new Date(body.endDateTime) }
    const result = CreateActivityInputSchema.safeParse(payload);

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

    if (session) {
      const new_activity = await prisma.activity.create({
        data: {
          ...activityData,
          techfestId: techfestId,
          createdById: session.user.id,
          organizedById: session.user.id,
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
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request", details: error },
      { status: 500 },
    );
  }
}
