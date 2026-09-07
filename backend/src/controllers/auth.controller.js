import validator from "validator";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../config/generateToken.js";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    const missingFields = [
      !fullName && "fullName",
      !email && "email",
      !password && "password",
    ].filter(Boolean);

    if (missingFields.length) {
      return res.status(400).json({
        message: "All fields must be filled",
        missingFields,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email entered" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password not strong enough" });
    }

    // check if email already exists
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const randomAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;

    // create user in the DB
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: randomAvatar,
    });

    try {
      const streamResponse = await upsertStreamUser({
        id: user._id.toString(),
        name: user.fullName,
        image: user.profilePic,
      });

      console.log("Stream user created:", streamResponse);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

    // generate token
    generateToken(user._id, res);

    res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const missingFields = [!email && "email", !password && "password"].filter(
      Boolean,
    );

    if (missingFields.length) {
      return res.status(400).json({
        message: "All fields must be filled",
        missingFields,
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // check if passwords match
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    generateToken(user._id, res);

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkAuth(req, res) {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
