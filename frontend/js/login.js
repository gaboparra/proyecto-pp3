const form = document.getElementById("loginForm");
const responseText = document.getElementById("response");

// Si ya hay sesión activa, redirigir directo al home
if (localStorage.getItem("token")) {
  window.location.replace("home.html");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      responseText.textContent = "Entrando";
      responseText.className = "success";

      const token = result.payload?.token;

      if (token) {
        localStorage.setItem("token", token);

        // Si venía de una página protegida, redirigir allí; si no, al home
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");
        window.location.href = redirect ? decodeURIComponent(redirect) : "home.html";

      } else {
        responseText.textContent = "Error: No se recibió token del servidor";
        responseText.className = "error";
      }
    } else {
      responseText.textContent = "Error: " + (result.message || "Correo electrónico o contraseña incorrectos");
      responseText.className = "error";
    }
  } catch (err) {
    responseText.textContent = "Error de conexión con el servidor";
    responseText.className = "error";
  }
});
