const form = document.getElementById("registerForm");
const responseText = document.getElementById("response");
const countrySelect = document.getElementById("country");

const PAISES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
  "Alemania",
  "Francia",
  "Italia",
  "Portugal",
  "Reino Unido",
  "Canadá",
  "Otro",
];

function cargarPaises() {
  countrySelect.innerHTML = '<option value="">Selecciona tu país</option>';

  PAISES.forEach((pais) => {
    const option = document.createElement("option");
    option.value = pais;
    option.textContent = pais;
    countrySelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", cargarPaises);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    username: document.getElementById("username").value,
    country: document.getElementById("country").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      responseText.textContent = "Usuario registrado correctamente";
      responseText.className = "success";

      window.location.href = "/pages/login.html";
    } else {
      responseText.textContent =
        "Error: " + (result.message || "Error desconocido");
      responseText.className = "error";
    }
  } catch (err) {
    console.error("Error completo:", err);
    responseText.textContent = "Error de conexión con el servidor";
    responseText.className = "error";
  }
});
