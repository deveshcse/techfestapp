import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { admin, organizer, user, ac } from "./permissions";
import { getPasswordResetEmailHtml } from "./email-templates";
import { getResend } from "./email";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url, token }: { user: any; url: string; token: string }, request: any) {
      const resend = getResend();
      resend.emails.send({
        from: "TechFest <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your Password - TechFest",
        html: getPasswordResetEmailHtml(user.name, url),
      });
    },
    // onPasswordReset: async ({ user }, request) => {
    //   // your logic here
    //   console.log(`Password for user ${user.email} has been reset.`);
    // },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
