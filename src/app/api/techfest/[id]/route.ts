import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params; // ✅ THIS WAS MISSING

  const techfestId = Number(id);

  if (Number.isNaN(techfestId)) {
    return NextResponse.json(
      { message: "Invalid TechFest ID" },
      { status: 400 },
    );
  }

  const techfest = await prisma.techFest.findUnique({
    where: { id: techfestId },
  });

  if (!techfest) {
    return NextResponse.json(
      { message: "TechFest not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(techfest);
}
