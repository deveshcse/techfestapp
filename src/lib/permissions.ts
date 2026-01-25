import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";


const statement = {
    ...defaultStatements,
  techfest: ["create", "update", "delete", "read", "publish"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  techfest: [ "read"],
}) ;

export const admin = ac.newRole({
  techfest: ["create", "update", "delete", "read", "publish"],
  ...adminAc.statements,
});

export const organizer = ac.newRole({
  techfest: ["create", "update", "read"],
});
