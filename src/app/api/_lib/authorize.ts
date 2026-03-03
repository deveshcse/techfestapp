import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { Action, Resource } from "@/lib/access-types";
import { ApiError } from "./api-error";

type Session = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export async function authorize<R extends Resource>(
  request: NextRequest,
  resource: R,
  action: Action<R>
): Promise<{ session: Session }> {
  // 1️⃣ session check
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw ApiError.unauthorized("Unauthorized: user is not logged in");
  }

  // 2️⃣ permission check
  const permission = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: { [resource]: [action] },
    },
  });

  if (!permission?.success) {
    throw ApiError.forbidden("Forbidden: insufficient permissions");
  }

  return { session };
}
