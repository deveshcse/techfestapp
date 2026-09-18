import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(255),
  organization: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((value) => (value ? value : undefined)),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

export const updateContactMessageSchema = z.object({
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
export type UpdateContactMessageInput = z.infer<typeof updateContactMessageSchema>;
