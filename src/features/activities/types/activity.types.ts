import { z } from "zod";
import { ActivityStatus, ActivityType } from "@/generated/prisma/enums";
import { ActivityResponseSchema, CreateUpdateActivityFormDataSchema, UpdateActivityStatusSchema, CreateUpdateActivityInputSchema, ActivityServerSchema } from "../schemas/activity.schema";

export type ActivityResponse = z.infer<typeof ActivityResponseSchema>
export type CreateUpdateActivityFormData = z.infer<typeof CreateUpdateActivityFormDataSchema>

export type UpdateActivityStatusInput = z.infer<typeof UpdateActivityStatusSchema>
export type CreateUpdateActivityInput = z.infer<typeof CreateUpdateActivityInputSchema>

export type ActivityServer = z.infer<typeof ActivityServerSchema>

export type RegistrationWithUser = {
    id: number;
    userId: string;
    activityId: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "WAITLISTED" | "ATTENDED";
    attended: boolean;
    attendedAt: string | null;
    attendanceMarkedBy: string | null;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
};

export { ActivityStatus, ActivityType };
