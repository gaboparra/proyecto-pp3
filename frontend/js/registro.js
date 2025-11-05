const form = document.getElementById("registerForm");
const responseText = document.getElementById("response");
const countrySelect = document.getElementById("country");

// Función para cargar los países desde la API
async function cargarPaises() {
  console.log("Iniciando carga de países...");
  try {
    // Usar la API de REST Countries v3.1
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,translations");
    
    if (!res.ok) {
      throw new Error("Error al cargar países");
    }
    
    const paises = await res.json();
    console.log("Países recibidos:", paises.length);
    
    // Ordenar países alfabéticamente por su nombre en español
    paises.sort((a, b) => {
      const nombreA = a.translations?.spa?.common || a.name.common;
      const nombreB = b.translations?.spa?.common || b.name.common;
      return nombreA.localeCompare(nombreB);
    });
    
    // Limpiar el select
    countrySelect.innerHTML = '<option value="">Selecciona tu país</option>';
    
    // Agregar cada país al select
    paises.forEach(pais => {
      const option = document.createElement("option");
      const nombrePais = pais.translations?.spa?.common || pais.name.common;
      option.value = nombrePais;
      option.textContent = nombrePais;
      countrySelect.appendChild(option);
    });
    
    console.log("✓ Países cargados exitosamente:", countrySelect.options.length);
    
  } catch (err) {
    console.error("✗ Error al cargar países:", err);
  }
}

// Cargar países cuando se carga la página
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
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    
    if (res.ok) {
      responseText.textContent = "Usuario registrado correctamente";
      responseText.className = "success";
    
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      responseText.textContent = "Error: " + (result.message || "Error desconocido");
      responseText.className = "error";
    }
  } catch (err) {
    console.error("Error completo:", err);
    responseText.textContent = "Error de conexión con el servidor";
    responseText.className = "error";
  }
});