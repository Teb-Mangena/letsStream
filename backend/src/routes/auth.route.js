import express from "express";
import {
  checkAuth,
  login,
  logout,
  onboard,
  signup,
} from "../controllers/auth.controller.js";
import { protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectAuth, checkAuth);

router.patch("/onboarding", protectAuth, onboard);

export default router;
