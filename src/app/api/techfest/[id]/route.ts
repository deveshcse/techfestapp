import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canRead = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { techfest: ["read"] },
      },
    });

    if (!canRead.success) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const techfestId = Number(id);

    if (Number.isNaN(techfestId)) {
      return NextResponse.json(
        { message: "Invalid TechFest ID" },
        { status: 400 },
      );
    }

    const techfest = await prisma.techFest.findUnique({
      where: { id: techfestId },
    });

    if (!techfest) {
      return NextResponse.json(
        { message: "TechFest not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(techfest);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching TechFest details",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canDelete = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { techfest: ["delete"] },
      },
    });

    if (!canDelete.success) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = await params;
    const techfestId = Number(id);

    if (Number.isNaN(techfestId)) {
      return NextResponse.json(
        { message: "Invalid TechFest ID" },
        { status: 400 },
      );
    }

    await prisma.techFest.delete({
      where: { id: techfestId },
    });

    return NextResponse.json(
      { message: "TechFest deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting TechFest", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canUpdate = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { techfest: ["update"] },
      },
    });

    if (!canUpdate.success) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = await params;
    const techfestId = Number(id);
    if (Number.isNaN(techfestId)) {
      return NextResponse.json(
        { message: "Invalid TechFest ID" },
        { status: 400 },
      );
    }
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

    return NextResponse.json(
      { message: "TechFest updated successfully", techfest: updatedTechFest },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating TechFest", error: (error as Error).message },
      { status: 500 },
    );
  }
}

// create api to publish/unpublish techfest
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canPublish = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { techfest: ["publish"] },
      },
    });

    if (!canPublish.success) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const techfestId = Number(id);

    if (Number.isNaN(techfestId)) {
      return NextResponse.json(
        { message: "Invalid TechFest ID" },
        { status: 400 },
      );
    }

    const techfest = await prisma.techFest.findUnique({
      where: { id: techfestId },
    });

    if (!techfest) {
      return NextResponse.json(
        { message: "TechFest not found" },
        { status: 404 },
      );
    }

    const updatedTechFest = await prisma.techFest.update({
      where: { id: techfestId },
      data: {
        published: !techfest.published,
        updatedById: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: `TechFest ${updatedTechFest.published ? "published" : "unpublished"} successfully`,
        techfest: updatedTechFest,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating TechFest", error: (error as Error).message },
      { status: 500 },
    );
  }
}
