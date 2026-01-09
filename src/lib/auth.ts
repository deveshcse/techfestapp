import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { customSession } from "better-auth/plugins"
// // If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/generated/prisma/client";

async function findUserRoles(userId: string){
 const user = await prisma.user.findUnique({
    where: {
        id: userId
    },
    select:{role: true},

 });
 return user?.role;  
}

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
            role:{
                type: ["ADMIN", "USER"]
            },
        }
    }
});

type Session = typeof auth.$Infer.Session
