const API_URL = "http://localhost:3000"; 
let token = "";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("orders-section").style.display = "block";
    fetchOrders();
  } else {
    alert("Login failed");
  }
}

async function fetchOrders() {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const orders = await res.json();

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";
  orders.forEach(order => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.user_id}</td>
        <td>${order.product}</td>
        <td>${order.status}</td>
        <td>
          <button onclick="updateOrder(${order.id}, 'completed')">Mark Completed</button>
        </td>
      </tr>
    `;
  });
}

async function updateOrder(id, status) {
  await fetch(`${API_URL}/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  fetchOrders();
}

function searchOrders() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const rows = document.querySelectorAll("#ordersTable tr");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(query) ? "" : "none";
  });
}
