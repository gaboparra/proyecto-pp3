const API_URL = "/api";

function showAlert(message, type) {
  const container = document.getElementById("alertContainer");
  container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => { container.innerHTML = ""; }, 3000);
}

function formatCurrency(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES");
}

async function loadExpenses() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/pages/login.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      displayExpenses(data.payload);
    } else {
      showAlert(data.message || "Error al cargar los gastos", "danger");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("Error de conexión", "danger");
  }
}

function displayExpenses(expenses) {
  const grid = document.getElementById("expensesGrid");

  if (expenses.length === 0) {
    grid.innerHTML = '<div class="no-expenses">No hay gastos registrados todavía</div>';
    return;
  }

  // Ordenar por fecha descendente, más reciente primero
  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  grid.innerHTML = sorted.map((expense) => {
    const categoryName = expense.category?.name || "Sin categoría";
    const color = expense.category?.color || "#f0a500";

    return `
      <div class="expense-card" style="--category-color: ${color}">
        <div class="amount">${formatCurrency(expense.amount)}</div>
        <div class="category">${categoryName}</div>
        <div class="date">${formatDate(expense.date)}</div>
      </div>
    `;
  }).join("");
}

loadExpenses();