import { RegistrationStatus, ActivityType, ActivityStatus } from "@/generated/prisma/enums";

export type RegistrationWithActivity = {
    id: number;
    userId: string;
    activityId: number;
    status: RegistrationStatus;
    attended: boolean;
    attendedAt: Date | null;
    attendanceMarkedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    activity: {
        id: number;
        title: string;
        description: string | null;
        venue: string | null;
        type: ActivityType;
        status: ActivityStatus;
        startDateTime: Date;
        endDateTime: Date;
        capacity: number | null;
        techfest: {
            id: number;
            title: string;
        };
    };
};

export type GetRegistrationsResponse = {
    success: boolean;
    data: RegistrationWithActivity[];
    error?: string;
    details?: string;
};
