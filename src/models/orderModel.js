
import db from "../db.js";

// Get single order (with items)
export async function getOrderById(orderId) {
  const [orders] = await db.query("SELECT * FROM orders WHERE id = ?", [orderId]);
  if (!orders.length) return null;

  const order = orders[0];
  const [items] = await db.query("SELECT product, qty FROM order_items WHERE order_id = ?", [orderId]);

  return { ...order, items };
}

// Update order (status, client_token, items)
export async function updateOrder(orderId, { items, client_token, status, version }) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Update order row with optimistic locking
    const [result] = await conn.query(
      `UPDATE orders
       SET client_token = ?, status = ?, version = version + 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND version = ?`,
      [client_token, status, orderId, version]
    );

    if (result.affectedRows === 0) {
      throw new Error("Update failed: version mismatch or order not found");
    }

    // If items provided → replace them
    if (items && Array.isArray(items)) {
      await conn.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);

      for (const item of items) {
        await conn.query(
          "INSERT INTO order_items (order_id, product, qty) VALUES (?, ?, ?)",
          [orderId, item.product, item.qty]
        );
      }
    }

    await conn.commit();

    // return updated order
    return await getOrderById(orderId);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
