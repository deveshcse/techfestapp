import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { authorize } from "../../_lib/authorize";
import { getIdParam } from "../../_lib/params";
import { withErrorHandler } from "../../_lib/error-handler";
import { ApiResponse } from "../../_lib/api-response";
import { ApiError } from "../../_lib/api-error";
import { updateTechFestSchema } from "@/features/techfest/schemas/techfest.schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  await authorize(request, "techfest", "read");
  const techfestId = await getIdParam(params);

  const techfest = await prisma.techFest.findUnique({
    where: { id: techfestId },
  });

  if (!techfest) {
    throw ApiError.notFound("TechFest not found");
  }

  return ApiResponse.success(techfest);
});

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  await authorize(request, "techfest", "delete");
  const techfestId = await getIdParam(params);

  await prisma.techFest.delete({
    where: { id: techfestId },
  });

  return ApiResponse.success({ message: "TechFest deleted successfully" });
});

export const PUT = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  const { session } = await authorize(request, "techfest", "update");
  const techfestId = await getIdParam(params);

  // Read body
  const rawBody = await request.json();

  // Convert dates (JSON → Date)
  const parsedBody: any = { ...rawBody };
  if (rawBody.start_date) parsedBody.start_date = new Date(rawBody.start_date);
  if (rawBody.end_date) parsedBody.end_date = new Date(rawBody.end_date);

  // Validate using Zod 
  const validationResult = updateTechFestSchema.safeParse(parsedBody);
  if (!validationResult.success) {
    throw ApiError.badRequest("Invalid input data");
  }
  const data = validationResult.data;

  // If dates are provided, performing validation
  if (data.start_date && data.end_date) {
    if (data.start_date > data.end_date) {
      throw ApiError.badRequest("Start date cannot be after end date");
    }

    // Overlap check
    const overlappingTechFest = await prisma.techFest.findFirst({
      where: {
        id: { not: techfestId },
        AND: [
          { start_date: { lte: data.end_date } },
          { end_date: { gte: data.start_date } },
        ],
      },
    });

    if (overlappingTechFest) {
      throw ApiError.conflict("Another techfest already exists during this date range");
    }
  }

  // Update
  const updatedTechFest = await prisma.techFest.update({
    where: { id: techfestId },
    data: {
      ...data,
      updatedById: session.user.id,
    },
  });

  return ApiResponse.success(updatedTechFest);
});

export const PATCH = withErrorHandler(async (request: NextRequest, { params }: Params) => {
  // Auth + permission check
  const { session } = await authorize(request, "techfest", "publish");

  // Centralized ID parsing
  const techfestId = await getIdParam(params);

  // Check existence
  const techfest = await prisma.techFest.findUnique({
    where: { id: techfestId },
  });

  if (!techfest) {
    throw ApiError.notFound("TechFest not found");
  }

  // ✅ Toggle publish state
  const updatedTechFest = await prisma.techFest.update({
    where: { id: techfestId },
    data: {
      published: !techfest.published,
      updatedById: session!.user.id,
    },
  });

  return ApiResponse.success(updatedTechFest);
});
