const API_URL = 'http://localhost:8080/api';

function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    container.innerHTML = '';

}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
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
            const expenses = data.payload;
            displayExpenses(expenses);
        } else {
            showAlert(data.message || 'Error al cargar los gastos', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

function displayExpenses(expenses) {
    const grid = document.getElementById('expensesGrid');
    
    if (expenses.length === 0) {
        grid.innerHTML = '<div class="no-expenses">No hay gastos registrados</div>';
        return;
    }

    const expensesByCategory = {};
    
    expenses.forEach(expense => {
        const categoryName = expense.category?.name || 'Sin categoría';
        if (!expensesByCategory[categoryName]) {
            expensesByCategory[categoryName] = [];
        }
        expensesByCategory[categoryName].push(expense);
    });

    let gridHTML = '';
    
    Object.keys(expensesByCategory).forEach(categoryName => {
        gridHTML += `
            <div class="category-column">
                <div class="category-header">${categoryName}</div>
        `;
        
        expensesByCategory[categoryName].forEach(expense => {
            gridHTML += `
                <div class="expense-item">
                    ${formatDate(expense.date)}<br>
                    ${formatCurrency(expense.amount)}<br>
                    ${expense.description || 'Sin descripción'}
                </div>
            `;
        });
        
        gridHTML += `</div>`;
    });

    grid.innerHTML = gridHTML;
}

loadExpenses();