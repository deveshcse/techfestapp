import { NextResponse, NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "@/app/api/_lib/params";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, { params }: Params) {
  // Auth + permission check
  const authResult = await authorize(request, "techfest", "publish");

  if (!authResult.success) {
    return authResult.response;
  }

  const { session } = authResult;

  const techfestId = await getIdParam(params);
}
