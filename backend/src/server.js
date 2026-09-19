import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
const { PORT, FRONTEND_URL } = ENV;

console.log(FRONTEND_URL);

// middlewares
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.send("App running!!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Connect DB and listen to port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
});
