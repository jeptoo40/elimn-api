import crypto from "crypto";

const SHARED_SECRET = "yourwebhooksecret"; // this matches  .env
const payload = JSON.stringify({
  payment_id: 1757151513000,
  order_id: 1,
  status: "SUCCESS",
});

const signature = crypto
  .createHmac("sha256", SHARED_SECRET)
  .update(payload)
  .digest("hex");

console.log("x-signature:", signature);
