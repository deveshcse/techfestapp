import { z } from "zod";

// Base schema with common fields
const baseEventFields = {
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    venue: z.string().optional(),
    published: z.boolean(),
};

// Date validation refinement (reusable)
const dateRefinement = (data: { start_date: Date | string; end_date: Date | string }) => {
    const startDate = data.start_date instanceof Date ? data.start_date : new Date(data.start_date);
    const endDate = data.end_date instanceof Date ? data.end_date : new Date(data.end_date);
    return endDate >= startDate;
};

// ===== FORM SCHEMA (for React Hook Form - uses Date objects) =====
export const eventSchema = z.object({
    ...baseEventFields,
    start_date: z.date({ error: "Start date is required" }),
    end_date: z.date({ error: "End date is required" }),
}).refine(dateRefinement, {
    message: "End date must be after start date",
    path: ["end_date"],
});

export type EventFormValues = z.infer<typeof eventSchema>;

// ===== API SCHEMA (for backend - uses ISO strings) =====
export const apiEventSchema = z.object({
    ...baseEventFields,
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
    published: z.boolean().default(false), // Default false for creation
}).refine(dateRefinement, {
    message: "End date must be after start date",
    path: ["end_date"],
});

// ===== DERIVED SCHEMAS (using extend/partial) =====

// For creating events (same as apiEventSchema)
export const createEventSchema = apiEventSchema;

// For updating events (all fields optional)
export const updateEventSchema = apiEventSchema.partial();

// For publishing/unpublishing (just the published field)
export const publishEventSchema = apiEventSchema.pick({ published: true });

// For query parameters
export const eventQuerySchema = z.object({
    published: z.enum(["true", "false"]).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    offset: z.string().regex(/^\d+$/).transform(Number).optional(),
});

// ===== TYPES =====
export type ApiEventInput = z.infer<typeof apiEventSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type PublishEventInput = z.infer<typeof publishEventSchema>;
export type EventQueryInput = z.infer<typeof eventQuerySchema>;
