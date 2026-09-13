import express from "express";
import { protectAuth } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protectAuth);

router.get("/token", protectAuth, getStreamToken);

export default router;
