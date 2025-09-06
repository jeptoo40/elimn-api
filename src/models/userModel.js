// src/models/userModel.js
import bcrypt from "bcrypt";
import db from "../db.js";

// Create a new user
export async function createUser(email, password, role = "customer") {
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, hashed, role]
  );
  return { id: result.insertId, email, role };
}

// Find user by email
export async function findUserByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}

// Validate password
export async function validatePassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
