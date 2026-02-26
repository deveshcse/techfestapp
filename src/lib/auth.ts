import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { admin, organizer, user, ac } from "./permissions";
import { Resend } from "resend";
import { getPasswordResetEmailHtml } from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url, token }: { user: any; url: string; token: string }, request: any) {
      resend.emails.send({
        from: "TechFest <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your Password - TechFest",
        html: getPasswordResetEmailHtml(user.name, url),
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
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
        required: false,
      },
    },
  },
});

export type Role = typeof auth.$Infer.Session.user.role;
