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
    const whereClause = isElevatedUser
      ? {}
      : { published: true };

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
