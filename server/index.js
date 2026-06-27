import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import { addDummyAdmin } from "./controller/adminController.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://campus-erp-7f4v.vercel.app",
    ],
    credentials: true,
  })
);

mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("✅ MongoDB Connected");

    isConnected = true;

    await addDummyAdmin();
  } catch (err) {
    console.error("❌ Mongo Error:", err);
    throw err;
  }
}

// CONNECT FIRST
await connectDB();

// THEN register routes
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

app.get("/", (req, res) => {
  res.send("Hello to College ERP API");
});

export default app;