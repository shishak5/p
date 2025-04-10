document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const errorMsg = document.getElementById("error");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Obtener usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si existe un usuario que coincida
        const usuario = usuarios.find(user => user.email === email && user.password === password);

        if (usuario) {
            errorMsg.style.color = "green";
            errorMsg.textContent = "Inicio de sesión exitoso.";

            // Guardar usuario actual
            localStorage.setItem("usuarioActual", JSON.stringify(usuario));

            // Verificar si es admin
            if (usuario.email === "admin@example.com"&& usuario.password==='admin1') {
                window.location.href = "admin.html";
            } else {
                window.location.href = "carniceria.html";
            }
        } else {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Correo o contraseña incorrectos.";
        }
    });
});
