import express from "express";
import dotenv from "dotenv";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { webcrypto } from "crypto";

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(
  cors({
    origin: "https://sebi-cli.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Better Auth routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Root route (prevents "Cannot GET /")
app.get("/", (req, res) => {
  res.send("SEBI Auth Server Running");
});

// Session check
app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return res.json(session);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get session" });
  }
});

// Device flow redirect
app.get("/device", (req, res) => {
  const { user_code } = req.query;
  const frontend = "http://localhost:8080";

  // res.redirect(`${frontend}/device?user_code=${user_code}`);
  res.redirect(`https://sebi-cli.vercel.app/device?user_code=${user_code}`);
});

// Health check
app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Auth server running at http://localhost:${port}`);
});

// import prisma from "./lib/db.js";

// async function test() {
//   const created = await prisma.test.create({
//     data: {
//       name: "Sakshi",
//     },
//   });

//   console.log("Created:", created);

//   const all = await prisma.test.findMany();
//   console.log("All Records:", all);
// }

// test();