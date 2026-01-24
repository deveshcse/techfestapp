import { z } from "zod";
import {
  createTechFestSchema,
  TechFestFormSchema,
  updateTechFestSchema,
  publishTechFestSchema,
} from "../schemas/techfest.schema";

export type CreateTechFestInput = z.infer<typeof createTechFestSchema>;
export type UpdateTechFestInput = z.infer<typeof updateTechFestSchema>;
export type PublishTechFestInput = z.infer<typeof publishTechFestSchema>;
export type TechFestFormValues = z.infer<typeof TechFestFormSchema>;
