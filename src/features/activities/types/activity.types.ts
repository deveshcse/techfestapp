import { z } from "zod";
import { ActivityStatus, ActivityType } from "@/generated/prisma/enums";
import { ActivitySchema, CreateUpdateActivityFormDataSchema, UpdateActivityStatusSchema, CreateUpdateActivityInputSchema } from "../schemas/activity.schema";

export type Activity = z.infer<typeof ActivitySchema>
export type CreateUpdateActivityFormData = z.infer<typeof CreateUpdateActivityFormDataSchema> 

export type UpdateActivityStatusInput = z.infer<typeof UpdateActivityStatusSchema>
export type CreateUpdateActivityInput = z.infer<typeof CreateUpdateActivityInputSchema>

export { ActivityStatus, ActivityType };
