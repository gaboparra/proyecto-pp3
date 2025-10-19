const form = document.getElementById("registerForm");
const responseText = document.getElementById("response");

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

