(function () {
  const PAGINAS_PUBLICAS = ["login.html", "registro.html"];
  const paginaActual = window.location.pathname.split("/").pop();

  if (PAGINAS_PUBLICAS.includes(paginaActual)) return;

  const token = localStorage.getItem("token");

  if (!token) {
    const redirect = encodeURIComponent(window.location.pathname);
    window.location.replace("login.html?redirect=" + redirect);
  }
})();
