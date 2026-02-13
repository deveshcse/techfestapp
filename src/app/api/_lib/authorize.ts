import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Action, Resource } from "@/lib/access-types";

type AuthorizeSuccess = {
  success: true;
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
};

type AuthorizeFailure = {
  success: false;
  response: NextResponse;
};

export type AuthorizeResult = AuthorizeSuccess | AuthorizeFailure;

/**
 * Auth + permission guard
 * Does NOT control execution — just validates.
 */
export async function authorize<R extends Resource>(
  request: NextRequest,
  resource: R,
  action: Action<R>
): Promise<AuthorizeResult> {
  try {
    // ✅ 1. Session check
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        ),
      };
    }

    // ✅ 2. Permission check
    const permission = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: {
          [resource]: [action],
        },
      },
    });

    if (!permission.success) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        ),
      };
    }

    // ✅ authorized
    return {
      success: true,
      session,
    };
  } catch (error) {
    console.error("Auth Error:", error);

    return {
      success: false,
      response: NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      ),
    };
  }
}
