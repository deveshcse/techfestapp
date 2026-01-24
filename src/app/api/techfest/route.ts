import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    // const session = await auth.api.getSession({
    //   headers: request.headers,
    // });

    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Fetch techfests from database
    const techfest = await prisma.techFest.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        venue: true,
        start_date: true,
        end_date: true,
      }
    });

    return NextResponse.json({
      success: true,
      data: techfest,
      count: techfest.length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
