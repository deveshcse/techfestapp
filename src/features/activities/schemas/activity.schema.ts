import { z } from "zod";
import { ActivityType, ActivityStatus } from "@/generated/prisma/enums";

export const ActivityBaseSchema = z
  .object({
    title: z.string().trim().min(1, { message: "Title is required." }),

    description: z.string().optional(),

    venue: z.string().optional(),

    type: z.enum(ActivityType),

    rules: z.array(
      z.object({
        value: z.string().trim().min(1, { message: "Rule cannot be empty." }),
      }),
    ),
    startDateTime: z.date({ message: "Start time is required." }),
    endDateTime: z.date({ message: "End time is required." }),

    capacity: z.number().int().positive(),
  })
  .superRefine((data, ctx) => {
    const now = new Date();

    if (data.startDateTime < now) {
      ctx.addIssue({
        code: "custom",
        message: "Start time cannot be earlier than today.",
        path: ["startDateTime"],
      });
    }
    if (data.endDateTime <= data.startDateTime) {
      ctx.addIssue({
        code: "custom",
        message: "End time must be after start time.",
        path: ["endDateTime"],
      });
    }
  });

export const CreateActivityFormDataSchema = ActivityBaseSchema;

export const CreateActivityInputSchema = ActivityBaseSchema.omit({
  rules: true,
}).safeExtend({
  rules: z.array(z.string()),
});

export const UpdateActivitySchema = ActivityBaseSchema.partial().extend({
  id: z.number().int(),
  status: z.enum(ActivityStatus),
});

export const ActivitySchema = ActivityBaseSchema.omit({
  rules: true,
}).safeExtend({
  id: z.number().int(),
  organizedBy: z.object({
    name: z.string(),
  }),
  status: z.enum(ActivityStatus),
  rules: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
