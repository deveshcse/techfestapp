import { NextResponse, NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";


// get my registrations based on user id

export async function GET(request: NextRequest) {
    try {
        const { session } = await authorize(request, "registration", "read");

        const registrations = await prisma.registration.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                activity: {
                    select: {
                        id: true,
                        title: true,
                        venue: true,
                        type: true,
                        status: true,
                        startDateTime: true,
                        endDateTime: true,
                        capacity: true,
                        techfest: {
                            select: {
                                id: true,
                                title: true,
                            }
                        }
                    }
                },
            },
            orderBy: {
                activity: {
                    startDateTime: "asc"
                }
            }
        });

        return NextResponse.json({
            success: true,
            data: registrations,
        });
    } catch (error) {
        if (error instanceof NextResponse) throw error;
        return NextResponse.json({
            success: false,
            error: "Failed to fetch registrations",
            details: error instanceof Error ? error.message : String(error),
        });
    }
}
