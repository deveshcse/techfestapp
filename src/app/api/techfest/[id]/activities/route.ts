import { NextResponse, NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "@/app/api/_lib/params";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const authResult = await authorize(request, "activity", "create");

    if (!authResult.success) {
      return authResult.response;
    }

    const { session } = authResult;

    const techfestId = await getIdParam(params);

    // const activity_form_data = await request.json();

    if (session) {
      const new_activity = await prisma.activity.create({
        data: {
          title: "Sample Activity",
          techfestId: techfestId,
          description: "This is a sample activity.",
          startDateTime: new Date(),
          endDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
          type: "OTHER",
          createdById: session.user.id,
        },
      });

      if (!new_activity) {
        return NextResponse.json(
          {
            success: false,
            error: "Something went wrong: Failed to create activity",
          },
          { status: 500 },
        );
      }
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
