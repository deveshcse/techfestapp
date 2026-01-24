import { id } from "date-fns/locale";
import { z } from "zod";

export const baseTechFestSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    start_date: z.date().min(new Date(), "Start date must be in the future"),
    end_date: z.date().min(new Date(), "End date must be in the future"),
    venue: z.string().min(1, "Venue is required"),
  })
  .superRefine((data, ctx) => {
    const diffInMs = data.end_date.getTime() - data.start_date.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 5) {
      ctx.addIssue({
        path: ["end_date"],
        message: "End date must be at least 5 days after start date",
        code: "custom",
      });
    }
  });

export const TechFestFormSchema = baseTechFestSchema.safeExtend({
  id: z.number().optional(),
});

export const createTechFestSchema = baseTechFestSchema.safeExtend({
  published: z.boolean().default(false),
});

export const updateTechFestSchema = createTechFestSchema.partial();

export const publishTechFestSchema = z.object({
  published: z.boolean(),
});
export const TechFestQuerySchema = z.object({
  limit: z.string(),
});
