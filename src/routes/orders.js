import express from "express";
import { getOrderById, updateOrder } from "../models/orderModel.js";

const router = express.Router();

// PATCH /orders/:id
router.patch("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { items, client_token, status, version } = req.body;

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updated = await updateOrder(orderId, {
      items,
      client_token,
      status,
      version,
    });

    res.json(updated);
  } catch (err) {
    console.error("PATCH /orders/:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
