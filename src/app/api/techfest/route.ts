import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTechFestSchema } from "@/features/techfest/schemas/techfest.schema";
import { authorize } from "../_lib/authorize";

export async function GET(request: NextRequest) {
  try {
    const { session } = await authorize(request, "techfest", "read");

    const elevatedRoles = ["admin", "organizer"];
    const isElevatedUser = elevatedRoles.includes(session.user.role || "user");

    const whereClause = isElevatedUser ? {} : { published: true };
    const [data, total] = await Promise.all([
      prisma.techFest.findMany({
        where: whereClause,
        select: {
          id: true,
          title: true,
          venue: true,
          start_date: true,
          end_date: true,
          published: true,
        },
        orderBy: { start_date: "asc" },
      }),
      prisma.techFest.count({
        where: whereClause,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      total,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canCreate = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { techfest: ["create"] },
      },
    });

    if (!canCreate.success) {
      return NextResponse.json(
        {
          error: "Forbidden: User does not have permission to create techfest",
        },
        { status: 403 },
      );
    }

    // Read body
    const rawBody = await request.json();

    // Convert dates (JSON → Date)
    const parsedBody = {
      ...rawBody,
      start_date: new Date(rawBody.start_date),
      end_date: new Date(rawBody.end_date),
    };

    // Validate using Zod 
    const data = createTechFestSchema.parse(parsedBody);

    const { start_date, end_date } = data;

    // invalid range
    if (start_date > end_date) {
      return NextResponse.json(
        { error: "Start date cannot be after end date" },
        { status: 400 },
      );
    }

    // must be future-only (tomorrow or later)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (start_date < tomorrow) {
      return NextResponse.json(
        { error: "Techfest must start from tomorrow or later" },
        { status: 400 },
      );
    }

    // Overlap check
    const overlappingTechFest = await prisma.techFest.findFirst({
      where: {
        AND: [
          { start_date: { lte: data.end_date } },
          { end_date: { gte: data.start_date } },
        ],
      },
    });

    if (overlappingTechFest) {
      return NextResponse.json(
        { error: "Another techfest already exists during this date range" },
        { status: 409 },
      );
    }

    // Create
    const techFest = await prisma.techFest.create({
      data: {
        ...data,
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ success: true, data: techFest });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create techfest: ${error}` },
      { status: 500 },
    );
  }
}
