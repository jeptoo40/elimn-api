# Elimn Assessment Project

## Project Overview
Elimn Assessment is a full-stack project that provides backend APIs for user management, orders, and payments, along with a minimal frontend for testing.  
It includes JWT authentication, role-based access control, order management, and a dummy payment system with webhook support.

---

## Tech Stack

**Backend**
- Node.js (v20.x)
- Express.js
- MySQL
- dotenv (environment variables)
- bcrypt (password hashing)
- JSON Web Token (JWT)
- Postman (API testing)

**Frontend**
- HTML/CSS (for minimal testing)
- Optional: React.js (for full frontend implementation)

---

## Project Structure
Elimn-Assessment/
├─ src/
│ ├─ routes/
│ │ ├─ auth.js
│ │ ├─ orders.js
│ │ ├─ payments.js
│ ├─ models/
│ │ ├─ userModel.js
│ │ ├─ orderModel.js
│ ├─ middleware/
│ │ ├─ auth.js
│ ├─ utils/
│ │ ├─ retry.js
│ ├─ app.js
├─ public/ # Optional frontend folder
│ ├─ index.html
│ ├─ scripts.js
├─ .env
├─ package.json
├─ README.md





---

## Environment Variables
Create a `.env` file in the project root:
PORT=3000
JWT_SECRET=secret
WEBHOOK_SECRET=webhooksecret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=elimn







---

## Backend Setup & Run Instructions

1. Install dependencies:
`
npm install


2.Start the server:

npm start

## API Summary

http://localhost:3000

POST http://localhost:3000/auth/login

- POST /auth/signup
- POST /auth/login
- POST /orders  (items:[{sku,qty,price}], client_token)  [idempotent]
- GET  /orders  (?status=&q=&page=&limit=)
- GET  /orders/:id  (cached 30s; invalidated on updates)
- PATCH /orders/:id/status  (ADMIN only; optimistic locking via `version`)

Payments:
- POST /payments/initiate  (creates payment record, returns payment_id + redirect_url)
- POST /payments/webhook   (HMAC signature: header `x-signature`, secret = PAYMENT_SECRET)


POST http://localhost:3000/auth/login

 POST http://localhost:3000/orders
 http://localhost:3000/orders
PATCH http://localhost:3000/orders/1
POST http://localhost:3000/payments
POST http://localhost:3000/payments/initiate
POST http://localhost:3000/payments/webhook



## Notes
- This is a minimal but complete implementation meeting the brief: RBAC, idempotency, optimistic locking, caching, webhook signature verification, retries, tests, and a lightweight UI.
- Add Swagger & Docker healthchecks as time allows.

