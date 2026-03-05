import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma"
import prisma from "./db.js"
import { deviceAuthorization } from "better-auth/plugins"; 
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    basePath:"/api/auth",
    trustedOrigins:["http://localhost:3000",
    "https://sebicli-production.up.railway.app",
    ],
    plugins: [
        deviceAuthorization({
            verificationUri: `${process.env.BETTER_AUTH_URL}/device`,
            clientId: "sebi-cli",        
            expiresIn: 600,              
            pollingInterval: 5,
        }),
    ],
    socialProviders:{
        github:{
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    }
});