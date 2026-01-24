import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin } from "better-auth/plugins";


export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [admin()],

  user: {
    additionalFields: {
      role: {
        type: ["user", "admin", "organizer"] as const,
      },
    },
  },

 
});

type Session = typeof auth.$Infer.Session;
