import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { createAuthMiddleware } from "better-auth/api";
import { getRedirectByRole, UserRole } from "./roleRedirect";

type SignInReturn = {
  redirect?: boolean;
  url?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: UserRole;
  };
};

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["ADMIN", "USER"],
      },
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-in")) {
        const returned = ctx.context.returned as SignInReturn | undefined;

        if (!returned?.user) return;

        const role = returned.user.role;
        const roleBasedUrl = getRedirectByRole(role);

        // redirecting based on user role
        ctx.context.returned = {
          ...returned,
          redirect: true, 
          url: roleBasedUrl,
        };

      }
      
    }),
    
  },
});

type Session = typeof auth.$Infer.Session;
