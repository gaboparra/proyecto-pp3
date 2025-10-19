// Manejo de la navbar según autenticación
 function updateNavbar() { 
  const token = localStorage.getItem('token');
  const loginNavItem = document.getElementById('loginNavItem');
  const registerNavItem = document.getElementById('registerNavItem');
  const logoutNavItem = document.getElementById('logoutNavItem');
  
  if (token) {
    // Si hay token, ocultar Login y Registro, mostrar Logout
    if (loginNavItem) loginNavItem.style.display = 'none';
    if (registerNavItem) registerNavItem.style.display = 'none';
    if (logoutNavItem) logoutNavItem.style.display = 'block';
  } else {
    // Si no hay token, mostrar Login y Registro, ocultar Logout
    if (loginNavItem) loginNavItem.style.display = 'block';
    if (registerNavItem) registerNavItem.style.display = 'block';
    if (logoutNavItem) logoutNavItem.style.display = 'none';
  }
} 

// Función de logout
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Event listener para el botón de logout
document.addEventListener('DOMContentLoaded', function() {
  updateNavbar();
  
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
});