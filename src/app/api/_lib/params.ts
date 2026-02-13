import { z } from "zod";

export const idParamSchema = z.coerce.number().int().positive();

export async function getIdParam(params: Promise<{ id: string }>) {
  const { id } = await params;

  const parsed = idParamSchema.safeParse(id);

  if (!parsed.success) {
    throw new Response(
      JSON.stringify({ message: "Invalid ID" }),
      { status: 400 }
    );
  }

  return parsed.data;
}
