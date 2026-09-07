import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export async function generateToken(id, res) {
  const token = jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks,
    sameSite: "strict", // prevent CSRF attacks
    secure: ENV.NODE_ENV === "production",
  });
}
