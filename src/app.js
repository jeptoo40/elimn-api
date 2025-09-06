import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";

dotenv.config();

const app = express(); // ✅ define app first

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Elimn API running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

export default app;
