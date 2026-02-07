import { authClient } from "@/lib/auth-client";
import type { Resource, Action } from "./access-types";
import { Role } from "./auth";

type PermissionInput<R extends Resource> = {
  role: Role;
  resource: R;
  action: Action<R>;
};

export function checkPermission<R extends Resource>({
  role,
  resource,
  action,
}: PermissionInput<R>) {
  return authClient.admin.checkRolePermission({
    role,
    permissions: {
      [resource]: [action],
    },
  });
}
