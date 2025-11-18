const form = document.getElementById("loginForm");
const responseText = document.getElementById("response");

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
      responseText.textContent = "Ingresando correctamente";
      responseText.className = "success";
      
      const token = result.payload?.token;
      
      if (token) {
        localStorage.setItem("token", token);
        
        
        window.location.href = "home.html";
        
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