import express from "express";
import dotenv from "dotenv";
import { toNodeHandler} from "better-auth/node"
import cors from "cors";
import {auth} from "./lib/auth.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND || "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

app.get("/device", async(req, res)=>{
  const {user_code} = req.query
  res.redirect(`http://localhost:3000/device?user_code=${user_code}`)
})

app.get("/health", (req, res)=>{
    res.send("ok")
})


app.listen(process.env.PORT, ()=>{
    console.log(`app is running at PORT ${process.env.PORT}`)
})

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