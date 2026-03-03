import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
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
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw ApiError.unauthorized();
  }

  const canUpdate = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: { techfest: ["update"] },
    },
  });

  if (!canUpdate.success) {
    throw ApiError.forbidden();
  }

  const techfestId = await getIdParam(params);
  const rawBody = await request.json();

  const updatedTechFest = await prisma.techFest.update({
    where: { id: techfestId },
    data: {
      title: rawBody.title,
      venue: rawBody.venue,
      description: rawBody.description,
      start_date: new Date(rawBody.start_date),
      end_date: new Date(rawBody.end_date),
      updatedById: session.user.id,
    },
  });

  return ApiResponse.success({
    message: "TechFest updated successfully",
    techfest: updatedTechFest
  });
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

  return ApiResponse.success({
    message: `TechFest ${updatedTechFest.published ? "published" : "unpublished"
      } successfully`,
    techfest: updatedTechFest,
  });
});
