import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { ActivityStatus, UpcomingActivity } from "@/features/activities/types/activity.types";
import { RegistrationStatus } from "@/generated/prisma/enums";
export async function GET(request: NextRequest) {
  try {
    const { session } = await authorize(request, "activity", "read");
    const userId = session.user.id;

    const now = new Date();

    const activities = await prisma.activity.findMany({
      where: {
        // future activities
        startDateTime: { gt: now },

        // only published
        status: ActivityStatus.PUBLISHED,

        // ✅ user not currently registered or waitlisted
        registrations: {
          none: {
            userId,
            status: {in: [ RegistrationStatus.PENDING, RegistrationStatus.CANCELLED]}
          },
        },
      },

      include: {
        techfest: {
          select: {
            id: true,
            title: true,
          },
        },

        // fetch user's previous registration (cancelled etc)
        registrations: {
          where: { userId },
          select: { status: true },
        },

        // count active registrations (not cancelled)
        _count: {
          select: {
            registrations: {
              where: {
                status: {
                  not: ActivityStatus.CANCELLED,
                },
              },
            },
          },
        },
      },

      orderBy: {
        startDateTime: "asc",
      },
    });

    const data: UpcomingActivity[] = activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      venue: activity.venue,
      type: activity.type,
      startDateTime: activity.startDateTime,
      endDateTime: activity.endDateTime,
      capacity: activity.capacity,
      registrationCount: activity._count.registrations,
      techfestId: activity.techfest.id,
      techfestTitle: activity.techfest.title,

      isRegistered: false,
      registrationStatus: activity.registrations[0]?.status ?? null,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof NextResponse) throw error;

    console.error("Upcoming Activities API Error:", error);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}