import { z } from "zod";

export const TechFestFormSchema = z
  .object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    venue: z.string().min(1, "Venue is required"),

    // ✅ UI field
    dateRange: z.object({
      from: z.date(),
      to: z.date(),
    }),
  })
  .superRefine((data, ctx) => {
    const diffInMs =
      data.dateRange.to.getTime() - data.dateRange.from.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 5) {
      ctx.addIssue({
        path: ["dateRange", "to"],
        message: "Techfest must be at least 5 days long",
        code: "custom",
      });
    }
  });

export const baseTechFestApiSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    venue: z.string().min(1),
    start_date: z.date(),
    end_date: z.date(),
  })
  .superRefine((data, ctx) => {
    // start < end
    if (data.start_date > data.end_date) {
      ctx.addIssue({
        path: ["end_date"],
        message: "End date must be after start date",
        code: "custom",
      });
    }

    // minimum duration
    const diffInDays =
      (data.end_date.getTime() - data.start_date.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diffInDays < 5) {
      ctx.addIssue({
        path: ["end_date"],
        message: "Techfest must be at least 5 days long",
        code: "custom",
      });
    }

    // future-only
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (data.start_date < tomorrow) {
      ctx.addIssue({
        path: ["start_date"],
        message: "Start date must be from tomorrow onwards",
        code: "custom",
      });
    }
  });

export const createTechFestSchema = baseTechFestApiSchema;

export const updateTechFestSchema = baseTechFestApiSchema.partial();

export const publishTechFestSchema = z.object({
  published: z.boolean(),
});

export const TechFestQuerySchema = z.object({
  limit: z.string().optional(),
});

