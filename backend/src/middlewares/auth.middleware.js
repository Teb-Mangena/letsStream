import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../config/env.js";

export const protectAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unathorized - No token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unathorized - Invalid token" });
    }

    // get the user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in the protectAuth middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
