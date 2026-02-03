import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1️⃣ Must be allowed to read
    const canRead = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: {
          techfest: ["read"],
        },
      },
    });

    if (!canRead.success) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2️⃣ Visibility logic (NOT permission-based)
    const elevatedRoles = ["admin", "organizer"];
    const isElevatedUser = elevatedRoles.includes(session.user.role);

    // 3️⃣ Dynamic where
    const whereClause = isElevatedUser ? {} : { published: true };

    // 4️⃣ Query
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

    // 1️⃣ Must be allowed to create
    const canCreate = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: {
          techfest: ["create"],
        },
      },
    });

    if (!canCreate.success) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2️⃣ Parse and validate body
    const body = await request.json();
    const { title, description, venue, start_date, end_date } = body;

    // check existing techfest between the given dates
    const existingTechFest = await prisma.techFest.findFirst({
      where: {
        start_date: start_date,
        end_date: end_date,
      },
    });

    if (existingTechFest) {
      return NextResponse.json(
        { error: "Techfest already exists for the given dates" },
        { status: 400 },
      );
    }



    // 3️⃣ Create new techfest
    const newTechFest = await prisma.techFest.create({
      data: {
        title,
        description,
        venue,
        start_date,
        end_date,
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ success: true, data: newTechFest });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
