const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db");

afterAll(() => db.end());

describe("Payments Tests", () => {
  test("Webhook is idempotent", async () => {
    const payload = { payment_id: "pay123", order_id: 1, status: "SUCCESS" };
    const signature = "testsig";

    const res1 = await request(app)
      .post("/api/payments/webhook")
      .set("x-signature", signature)
      .send(payload);

    const res2 = await request(app)
      .post("/api/payments/webhook")
      .set("x-signature", signature)
      .send(payload);

    expect(res1.body.message).toBe("Webhook processed");
    expect(res2.body.message).toBe("Webhook already processed");
  });
});
