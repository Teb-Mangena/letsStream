import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";

const app = express();
const { PORT } = ENV;

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.send("App running!!");
});

// API Routes
app.use("/api/auth", authRoutes);

// Connect DB and listen to port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
});
