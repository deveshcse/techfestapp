import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTechFestSchema } from "@/features/techfest/schemas/techfest.schema";
import { authorize } from "../_lib/authorize";
import { withErrorHandler } from "../_lib/error-handler";
import { ApiResponse } from "../_lib/api-response";
import { ApiError } from "../_lib/api-error";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { session } = await authorize(request, "techfest", "read");

  const elevatedRoles = ["admin", "organizer"];
  const isElevatedUser = elevatedRoles.includes(session.user.role || "user");

  const whereClause = isElevatedUser ? {} : { published: true };
  const [data, total] = await Promise.all([
    prisma.techFest.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        venue: true,
        start_date: true,
        end_date: true,
        published: true,
      },
      orderBy: { start_date: "asc" },
    }),
    prisma.techFest.count({
      where: whereClause,
    }),
  ]);

  return ApiResponse.success({
    data,
    total,
  });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw ApiError.unauthorized();
  }

  const canCreate = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: { techfest: ["create"] },
    },
  });

  if (!canCreate.success) {
    throw ApiError.forbidden("Forbidden: User does not have permission to create techfest");
  }

  // Read body
  const rawBody = await request.json();

  // Convert dates (JSON → Date)
  const parsedBody = {
    ...rawBody,
    start_date: new Date(rawBody.start_date),
    end_date: new Date(rawBody.end_date),
  };

  // Validate using Zod 
  const data = createTechFestSchema.parse(parsedBody);

  const { start_date, end_date } = data;

  // invalid range
  if (start_date > end_date) {
    throw ApiError.badRequest("Start date cannot be after end date");
  }

  // must be future-only (tomorrow or later)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  if (start_date < tomorrow) {
    throw ApiError.badRequest("Techfest must start from tomorrow or later");
  }

  // Overlap check
  const overlappingTechFest = await prisma.techFest.findFirst({
    where: {
      AND: [
        { start_date: { lte: data.end_date } },
        { end_date: { gte: data.start_date } },
      ],
    },
  });

  if (overlappingTechFest) {
    throw ApiError.conflict("Another techfest already exists during this date range");
  }

  // Create
  const techFest = await prisma.techFest.create({
    data: {
      ...data,
      createdById: session.user.id,
    },
  });

  return ApiResponse.success(techFest, 201);
});
