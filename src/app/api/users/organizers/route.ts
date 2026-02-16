import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";

export async function GET(request: NextRequest) {
    try {
        await authorize(request, "activity", "assign-organizer");

        const organizers = await prisma.user.findMany({
            where: {
                OR: [
                    { role: "admin" },
                    { role: "organizer" },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json({
            success: true,
            data: organizers,
        });
    } catch (error) {
        if (error instanceof NextResponse) throw error;
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error },
            { status: 500 },
        );
    }
}
