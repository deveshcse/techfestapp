import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/app/api/_lib/authorize";
import { autoCompletePastActivities } from "@/app/api/_lib/activity-status.utils";

export async function GET(request: NextRequest) {
    try {
        // Lazily auto-complete past activities before computing stats
        await autoCompletePastActivities();

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
                upcomingActivities,
                trends,
                breakdown
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
                }),
                // Registration Trends (Last 14 days)
                prisma.registration.groupBy({
                    by: ['createdAt'],
                    _count: true,
                    where: {
                        createdAt: {
                            gte: new Date(new Date().setDate(new Date().getDate() - 14))
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }),
                // Activity Breakdown by Type
                prisma.activity.groupBy({
                    by: ['type'],
                    _count: true
                })
            ]);

            // Formatter for trends to ensure every day has a record
            const formattedTrends = Array.from({ length: 14 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (13 - i));
                const dateStr = date.toISOString().split('T')[0];
                const count = trends
                    .filter(t => t.createdAt.toISOString().split('T')[0] === dateStr)
                    .reduce((acc, curr) => acc + curr._count, 0);
                return { date: dateStr, count };
            });

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
                    registrationTrends: formattedTrends,
                    activityBreakdown: breakdown.map(b => ({ type: b.type, count: b._count })),
                }
            });
        }

        if (role === "organizer") {
            const [
                myTechFestCount,
                myActivityCount,
                myAttendanceCount,
                upcomingEvents,
                trends,
                breakdown
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
                }),
                // Organizer's managed activity registration trends
                prisma.registration.groupBy({
                    by: ['createdAt'],
                    _count: true,
                    where: {
                        createdAt: {
                            gte: new Date(new Date().setDate(new Date().getDate() - 14))
                        },
                        activity: {
                            OR: [
                                { createdById: userId },
                                { organizers: { some: { id: userId } } }
                            ]
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }),
                // Organizer's activity breakdown
                prisma.activity.groupBy({
                    by: ['type'],
                    _count: true,
                    where: {
                        OR: [
                            { createdById: userId },
                            { organizers: { some: { id: userId } } }
                        ]
                    }
                })
            ]);

            const formattedTrends = Array.from({ length: 14 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (13 - i));
                const dateStr = date.toISOString().split('T')[0];
                const count = trends
                    .filter(t => t.createdAt.toISOString().split('T')[0] === dateStr)
                    .reduce((acc, curr) => acc + curr._count, 0);
                return { date: dateStr, count };
            });

            return NextResponse.json({
                success: true,
                data: {
                    techfests: myTechFestCount,
                    activities: myActivityCount,
                    attendance: myAttendanceCount,
                    upcomingActivities: upcomingEvents,
                    registrationTrends: formattedTrends,
                    activityBreakdown: breakdown.map(b => ({ type: b.type, count: b._count })),
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
