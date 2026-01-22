import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    start_date: z.date({
        message: "Start date is required",
    }),
    end_date: z.date({
        message: "End date is required",
    }),
    venue: z.string().optional(),
    published: z.boolean(),
}).refine((data) => data.end_date >= data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
});

export type EventFormValues = z.infer<typeof eventSchema>;
