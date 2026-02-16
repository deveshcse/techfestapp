import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Action, Resource } from "@/lib/access-types";

type Session = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export async function authorize<R extends Resource>(
  request: NextRequest,
  resource: R,
  action: Action<R>
): Promise<{ session: Session }> {
  try {
    // 1️⃣ session check
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      throw NextResponse.json(
        { error: "Unauthorized: user is not logged in" },
        { status: 401 }
      );
    }

    // 2️⃣ permission check
    const permission = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { [resource]: [action] },
      },
    });

    if (!permission?.success) {
      throw NextResponse.json(
        { error: "Forbidden: insufficient permissions" },
        { status: 403 }
      );
    }

    return { session };
  } catch (error) {
    // If we already threw a response → rethrow
    if (error instanceof NextResponse) throw error;

    console.error("Authorize error:", error);

    throw NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
