import { z } from "zod";

// ============================================================================
// BASE FIELDS & UTILITIES
// ============================================================================

const baseEventFields = {
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    venue: z.string().optional(),
    published: z.boolean(),
};

const dateRefinement = (data: { start_date: Date | string; end_date: Date | string }) => {
    const startDate = data.start_date instanceof Date ? data.start_date : new Date(data.start_date);
    const endDate = data.end_date instanceof Date ? data.end_date : new Date(data.end_date);
    return endDate >= startDate;
};

// ============================================================================
// FORM SCHEMAS (React Hook Form - uses Date objects)
// ============================================================================

export const eventFormSchema = z.object({
    ...baseEventFields,
    start_date: z.date({ error: "Start date is required" }),
    end_date: z.date({ error: "End date is required" }),
}).refine(dateRefinement, {
    message: "End date must be after start date",
    path: ["end_date"],
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

// ============================================================================
// API SCHEMAS (Backend - uses ISO strings)
// ============================================================================

// Base API schema for all event operations
const baseApiEventSchema = z.object({
    ...baseEventFields,
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
}).refine(dateRefinement, {
    message: "End date must be after start date",
    path: ["end_date"],
});

// CREATE: Full event data required (published defaults to false)
export const createEventSchema = baseApiEventSchema.extend({
    published: z.boolean().default(false),
});

// UPDATE: All fields optional
export const updateEventSchema = createEventSchema.partial();

// PUBLISH: Only toggle published status
export const publishEventSchema = z.object({
    published: z.boolean(),
});

// QUERY: Filter and pagination parameters
export const eventQuerySchema = z.object({
    published: z.enum(["true", "false"]).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    offset: z.string().regex(/^\d+$/).transform(Number).optional(),
});

// ============================================================================
// TYPES
// ============================================================================

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type PublishEventInput = z.infer<typeof publishEventSchema>;
export type EventQueryInput = z.infer<typeof eventQuerySchema>;

