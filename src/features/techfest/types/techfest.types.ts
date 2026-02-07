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

export type TechFestDetails = {
  id: number
  title: string
  description: string
  start_date: Date
  end_date: Date
  venue: string
  published: boolean
}

export type TechFestList = {
  id: number
  title: string
  start_date: Date
  end_date: Date
  venue: string
}

export type TechFestListResponse = {
  data: TechFestList[]
  total: number
  page: number
  limit: number
}
