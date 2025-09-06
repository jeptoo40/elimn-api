const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db");

let token;

beforeAll(async () => {
  await request(app).post("/api/auth/signup").send({
    email: "orderuser@example.com",
    password: "orderpass",
  });
  const login = await request(app).post("/api/auth/login").send({
    email: "orderuser@example.com",
    password: "orderpass",
  });
  token = login.body.token;
});

afterAll(() => db.end());

describe("Orders Tests", () => {
  test("Create order (idempotent)", async () => {
    const client_token = "abc123";
    const orderData = { product: "Laptop", client_token };

    const res1 = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderData);

    const res2 = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderData);

    expect(res1.body.id).toBe(res2.body.id); 
  });

  test("Get orders list", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
