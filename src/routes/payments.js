// src/routes/payments.js
import express from "express";
import crypto from "crypto";
import { updateOrder, getOrderById } from "../models/orderModel.js"; // ✅ updated
import { retryOperation } from "../utils/retry.js";

const router = express.Router();
const SHARED_SECRET = process.env.WEBHOOK_SECRET || "webhooksecret";

// Initiate payment (dummy)
router.post("/initiate", async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    if (!orderId || !amount)
      return res.status(400).json({ message: "OrderId and amount required" });

    const redirect_url = `https://dummy-payments.com/checkout/${orderId}`;
    res.json({ payment_id: Date.now(), redirect_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Webhook
router.post("/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-signature"];
    const payload = JSON.stringify(req.body);

    const expected = crypto
      .createHmac("sha256", SHARED_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expected)
      return res.status(401).json({ message: "Invalid signature" });

    const { payment_id, order_id, status } = req.body;
    const order = await getOrderById(order_id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await retryOperation(async () => {
      if (status === "SUCCESS") {
        // Use updateOrder instead of updateOrderStatus
        await updateOrder(order_id, { status: "PAID", version: order.version });
      }
    });

    res.json({ message: "Webhook processed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
