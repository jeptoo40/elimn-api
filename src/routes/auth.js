// src/routes/auth.js
import express from "express";
import { createUser, findUserByEmail, validatePassword } from "../models/userModel.js";
import { generateToken } from "../middleware/auth.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await createUser(email, password, role);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await validatePassword(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
