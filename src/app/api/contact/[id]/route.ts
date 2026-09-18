import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { updateContactMessageSchema } from "@/features/contact/schemas/contact.schema";
import { authorize } from "../../_lib/authorize";
import { getIdParam } from "../../_lib/params";
import { withErrorHandler } from "../../_lib/error-handler";
import { ApiResponse } from "../../_lib/api-response";
import { ApiError } from "../../_lib/api-error";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  await authorize(request, "contact", "read");
  const id = await getIdParam(params);

  const contactMessage = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!contactMessage) {
    throw ApiError.notFound("Contact message not found");
  }

  return ApiResponse.success(contactMessage);
});

export const PATCH = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  await authorize(request, "contact", "update");
  const id = await getIdParam(params);
  const rawBody = await request.json();
  const parsed = updateContactMessageSchema.safeParse(rawBody);

  if (!parsed.success) {
    throw ApiError.badRequest("Invalid status", "VALIDATION_ERROR");
  }

  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) {
    throw ApiError.notFound("Contact message not found");
  }

  const contactMessage = await prisma.contactMessage.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return ApiResponse.success(contactMessage);
});

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  await authorize(request, "contact", "delete");
  const id = await getIdParam(params);

  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) {
    throw ApiError.notFound("Contact message not found");
  }

  await prisma.contactMessage.delete({ where: { id } });

  return ApiResponse.success({ message: "Contact message deleted successfully" });
});
