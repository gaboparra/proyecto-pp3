// Manejo de la navbar según autenticación
function updateNavbar() {
  const token = localStorage.getItem("token");
  const homeNavItem = document.getElementById("homeNavItem");
  const loginNavItem = document.getElementById("loginNavItem");
  const registerNavItem = document.getElementById("registerNavItem");
  const logoutNavItem = document.getElementById("logoutNavItem");

  if (token) {
    if (homeNavItem) homeNavItem.style.display = "block";
    if (loginNavItem) loginNavItem.style.display = "none";
    if (registerNavItem) registerNavItem.style.display = "none";
    if (logoutNavItem) logoutNavItem.style.display = "block";
  } else {
    if (homeNavItem) homeNavItem.style.display = "none";
    if (loginNavItem) loginNavItem.style.display = "block";
    if (registerNavItem) registerNavItem.style.display = "block";
    if (logoutNavItem) logoutNavItem.style.display = "none";
  }
}

// logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/pages/login.html";
}

// Event listener para el botón de logout
document.addEventListener("DOMContentLoaded", function () {
  updateNavbar();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }
});
