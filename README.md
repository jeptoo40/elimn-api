# Elimn API

## Project Overview
Elimn API is a **Node.js** REST API for order management and payments.  
It supports user authentication, order creation, updates, and simulated payment processing.

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** JWT  
- **Testing:** Postman  
- **Others:** dotenv, morgan, body-parser  

---

## Installation & Run Instructions

1. Clone the repository:
```bash
git clone https://github.com/jeptoo40/elimn-api.git
cd elimn-api


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
  ├─ db.js
├── tests/
│   ├── auth.test.js        # Signup/login
│   ├── orders.test.js      # RBAC, idempotency
│   ├── payments.test.js    # Webhook idempotency
│   └── lru.test.js         # Algorithm tests
├── algorithms/
    └── lru.test.js     

├─ frontend folder/
│   ├─ index.html
│   ├─ scripts.js
│   ├─ app.js  //for admin UI
├─ .env
├─ package.json
├─ package.json
├─generateSignature.js
├─Elimn-Assessment.postman_collection.json
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


DB STRUCTURE
1.CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2.CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('PENDING', 'PAID', 'CANCELLED') DEFAULT 'PENDING',
  client_token VARCHAR(255),
  amount_cents INT DEFAULT 0,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

3.CREATE TABLE order_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product VARCHAR(100) NOT NULL,
  qty INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);



Postman Collection

Import the provided Elimn-Assessment.postman_collection.json to test endpoints.

Endpoints:

POST /auth/signup – Create a new user

POST /auth/login – Authenticate user & get JWT

POST /orders – Create a new order

GET /orders – Get all orders for authenticated user

PATCH /orders/:id – Update order items or status

POST /payments/initiate – Simulate payment initiation

POST /payments/webhook – Simulate webhook callback for payment



## Notes
Use Bearer token for authorization on /orders endpoints.

Use x-signature header for /payments/webhook endpoint.
