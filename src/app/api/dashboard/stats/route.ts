import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";

export async function GET(request: NextRequest) {
    try {
        const { session } = await authorize(request, "techfest", "read");
        const role = session.user.role;
        const userId = session.user.id;
        const now = new Date();

        if (role === "admin") {
            const [
                techFestCount,
                activityCount,
                registrationCount,
                attendanceCount,
                totalStudents,
                uniqueParticipants,
                activeWaitlist,
                upcomingActivities
            ] = await Promise.all([
                prisma.techFest.count(),
                prisma.activity.count(),
                prisma.registration.count({
                    where: { status: "CONFIRMED" }
                }),
                prisma.registration.count({
                    where: { attended: true }
                }),
                prisma.user.count({
                    where: { role: "user" }
                }),
                prisma.user.count({
                    where: {
                        registrations: {
                            some: {
                                status: { in: ["CONFIRMED", "ATTENDED"] }
                            }
                        }
                    }
                }),
                prisma.registration.count({
                    where: { status: "WAITLISTED" }
                }),
                prisma.activity.count({
                    where: {
                        startDateTime: { gt: now },
                        status: "PUBLISHED"
                    }
                })
            ]);

            return NextResponse.json({
                success: true,
                data: {
                    techfests: techFestCount,
                    activities: activityCount,
                    registrations: registrationCount,
                    attendance: attendanceCount,
                    totalStudents,
                    uniqueParticipants,
                    activeWaitlist,
                    upcomingActivities,
                }
            });
        }

        if (role === "organizer") {
            const [
                myTechFestCount,
                myActivityCount,
                myAttendanceCount,
                upcomingEvents,
            ] = await Promise.all([
                prisma.techFest.count({
                    where: { createdById: userId }
                }),
                prisma.activity.count({
                    where: {
                        OR: [
                            { createdById: userId },
                            { organizers: { some: { id: userId } } }
                        ]
                    }
                }),
                prisma.registration.count({
                    where: { attendanceMarkedBy: userId, attended: true }
                }),
                prisma.activity.count({
                    where: {
                        startDateTime: { gt: now },
                        status: "PUBLISHED",
                        OR: [
                            { createdById: userId },
                            { organizers: { some: { id: userId } } }
                        ]
                    }
                })
            ]);

            return NextResponse.json({
                success: true,
                data: {
                    techfests: myTechFestCount,
                    activities: myActivityCount,
                    attendance: myAttendanceCount,
                    upcomingActivities: upcomingEvents,
                    // These are not scoped or useful for direct organizer overview, but we keep the structure
                    registrations: 0,
                    totalStudents: 0,
                    uniqueParticipants: 0,
                    activeWaitlist: 0,
                }
            });
        }

        // For regular users, return personal statistics
        const [
            myRegistrations,
            myAttendance,
            myWaitlist,
        ] = await Promise.all([
            prisma.registration.count({
                where: {
                    userId,
                    status: { in: ["CONFIRMED", "ATTENDED"] }
                }
            }),
            prisma.registration.count({
                where: { userId, attended: true }
            }),
            prisma.registration.count({
                where: { userId, status: "WAITLISTED" }
            })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                registrations: myRegistrations,
                attendance: myAttendance,
                activeWaitlist: myWaitlist,
                // These are null/0 for users as they are system-wide metrics
                techfests: 0,
                activities: 0,
                totalStudents: 0,
                uniqueParticipants: 0,
                upcomingActivities: 0,
            }
        });
    } catch (error) {
        if (error instanceof NextResponse) throw error;
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
