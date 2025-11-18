const API_URL = 'http://localhost:8080/api';
let allExpenses = []; 

function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function loadCategories() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            const select = document.getElementById('editCategory');
            select.innerHTML = '<option value="">Seleccione una categoría</option>';
            
            data.payload.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat._id;
                option.textContent = cat.name;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error cargando categorías:', error);
    }
}

async function loadExpenses() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/expenses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            allExpenses = data.payload; 
            displayExpenses(data.payload);
        } else {
            showAlert(data.message || 'Error al cargar los gastos', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

function displayExpenses(expenses) {
    const container = document.getElementById('expensesList');
    
    if (expenses.length === 0) {
        container.innerHTML = '<div class="no-expenses">No hay gastos registrados</div>';
        return;
    }

    let html = '';
    
    expenses.forEach(expense => {
        html += `
            <div class="expense-card">
                <h3>${formatCurrency(expense.amount)}</h3>
                <div class="expense-info">
                    <strong>Categoría:</strong> ${expense.category?.name || 'Sin categoría'}<br>
                    <strong>Fecha:</strong> ${formatDate(expense.date)}
                </div>
                <div class="expense-actions">
                    <button class="btn-edit-card" onclick="openEditModal('${expense._id}')">EDITAR</button>
                    <button class="btn-delete-card" onclick="deleteExpense('${expense._id}')">ELIMINAR</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function openEditModal(expenseId) { 
    const expense = allExpenses.find(exp => exp._id === expenseId);
    
    if (!expense) {
        console.error('No se encontró el gasto');
        showAlert('Error al cargar el gasto', 'error');
        return;
    }
    
    document.getElementById('editExpenseId').value = expense._id;
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editCategory').value = expense.category?._id || '';
    document.getElementById('editDate').value = formatDateForInput(expense.date);
    
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

async function deleteExpense(expenseId) {
    if (!confirm('¿Está seguro que desea eliminar este gasto?')) {
        return;
    }

    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            showAlert('Gasto eliminado exitosamente', 'success');
            loadExpenses();
        } else {
            showAlert(data.message || 'Error al eliminar el gasto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const expenseId = document.getElementById('editExpenseId').value;
    const amount = parseFloat(document.getElementById('editAmount').value);

    if (amount <= 0) {
        showAlert('El monto debe ser mayor a 0', 'error');
        return;
    }

    const formData = {
        amount: amount,
        category: document.getElementById('editCategory').value,
        date: document.getElementById('editDate').value
    };

    try {
        const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            showAlert('Gasto actualizado exitosamente', 'success');
            closeModal();
            loadExpenses();
        } else {
            showAlert(data.message || 'Error al actualizar el gasto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
});

loadCategories();
loadExpenses();