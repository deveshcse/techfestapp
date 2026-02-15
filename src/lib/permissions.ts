import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  techfest: ["create", "update", "delete", "read", "publish"],
  activity: [
    "create",
    "update",
    "delete",
    "read",
    "register",
    "assign-organizer",
    "update-status",
  ],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  techfest: ["read"],
  activity: ["read", "register"],
});

export const admin = ac.newRole({
  techfest: ["create", "update", "delete", "read", "publish"],
  activity: ["read", "assign-organizer", "update", "delete", "update-status"],

  ...adminAc.statements,
});

export const organizer = ac.newRole({
  techfest: ["create", "update", "read"],
  activity: ["create", "update","read"],
});
