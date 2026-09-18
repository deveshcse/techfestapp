import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { createContactMessageSchema } from "@/features/contact/schemas/contact.schema";
import { authorize } from "../_lib/authorize";
import { withErrorHandler } from "../_lib/error-handler";
import { ApiResponse } from "../_lib/api-response";
import { ApiError } from "../_lib/api-error";

export const GET = withErrorHandler(async (request: NextRequest) => {
  await authorize(request, "contact", "read");

  const [data, total] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.count(),
  ]);

  return ApiResponse.success({ data, total });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const rawBody = await request.json();
  const parsed = createContactMessageSchema.safeParse(rawBody);

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Validation failed";
    throw ApiError.badRequest(message, "VALIDATION_ERROR");
  }

  const contactMessage = await prisma.contactMessage.create({
    data: parsed.data,
  });

  return ApiResponse.success(contactMessage, 201);
});
