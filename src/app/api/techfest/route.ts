import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    //Verify authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    console.log("Session Info:", session);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch techfests from database
    // const techfest = await prisma.techFest.findMany({
    //   where: {
    //     published: true,
    //   },
    //   select: {
    //     id: true,
    //     title: true,
    //     description: true,
    //     venue: true,
    //     start_date: true,
    //     end_date: true,
    //   }
    // });

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const sortBy = searchParams.get("sortBy") ?? "createdAt";
    const order = searchParams.get("order") ?? "desc";
    const search = searchParams.get("search") ?? "";

    const skip = (page - 1) * limit;

    const where = search ? { title: { contains: search } } : {};

    const [data, total] = await Promise.all([
      prisma.techFest.findMany({
        skip,
        take: limit,
        where,
        // orderBy: { [sortBy]: order },
      }),
      prisma.techFest.count({ where }),
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
