const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db");

afterAll(() => db.end());

describe("Auth Tests", () => {
  test("Signup works", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "testuser@example.com", password: "pass123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User created");
  });

  test("Login works and returns token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "pass123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
