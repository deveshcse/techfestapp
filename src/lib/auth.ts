import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { admin, organizer, user, ac } from "./permissions";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    adminPlugin({
      ac,
      roles: { admin, organizer, user },
    }),
  ],

  user: {
    additionalFields: {
      role: {
        type: ["user", "admin", "organizer"] as const,
      },
    },
  },
});

type Session = typeof auth.$Infer.Session;
