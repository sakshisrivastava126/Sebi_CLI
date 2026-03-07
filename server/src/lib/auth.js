import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./db.js"
import { deviceAuthorization } from "better-auth/plugins";
// import { PrismaClient } from "@prisma/client"

const isProd = process.env.NODE_ENV === "production";

// const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    baseURL: "https://sebicli-production.up.railway.app",
    basePath: "/api/auth",
    trustedOrigins: ["http://localhost:8080",
        "https://sebi-cli.vercel.app",
        "https://sebicli-production.up.railway.app",
        "https://sebicli-frontend-production.up.railway.app",
    ],
    plugins: [
        deviceAuthorization({
            verificationUri: "https://sebi-cli.vercel.app/sign-in",
            // verificationUri: "http://localhost:8080/sign-in",
            // clientId: "sebi-cli",        
            expiresIn: "10m",
            // validateClient: async (clientId) => {
            //     return clientId === "sebi-cli";
            // },
        }),
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    },
    
    advanced: {
        defaultCookieAttributes: {
            sameSite: isProd ? "none" : "lax",
            secure: isProd,
        }
    }
});