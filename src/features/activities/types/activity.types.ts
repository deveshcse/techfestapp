import { z } from "zod";
import { ActivityStatus, ActivityType } from "@/generated/prisma/enums";
import { ActivitySchema, CreateActivityFormDataSchema, UpdateActivitySchema, CreateActivityInputSchema } from "../schemas/activity.schema";

export type Activity = z.infer<typeof ActivitySchema>
export type CreateActivityFormData = z.infer<typeof CreateActivityFormDataSchema> 

export type UpdateActivityInput = z.infer<typeof UpdateActivitySchema>
export type CreateActivityInput = z.infer<typeof CreateActivityInputSchema>

export { ActivityStatus, ActivityType };
