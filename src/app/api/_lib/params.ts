import { z } from "zod";
import { ApiError } from "./api-error";

export const idParamSchema = z.coerce.number().int().positive();

export async function getIdParam(params: Promise<{ id: string }>) {
  const { id } = await params;

  const parsed = idParamSchema.safeParse(id);

  if (!parsed.success) {
    throw ApiError.badRequest("Invalid ID");
  }

  return parsed.data;
}
