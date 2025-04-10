document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const mensaje = document.getElementById("aceptacion");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que se envíe el formulario

        // Obtener valores de los inputs
        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Validación básica
        if (!name || !address || !phone || !email || !password) {
            mensaje.textContent = "Por favor, completa todos los campos.";
            return;
        }

        // Crear objeto de usuario
        const nuevoUsuario = {
            name,
            address,
            phone,
            email,
            password
        };

        // Obtener usuarios existentes del localStorage o crear nuevo array
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el correo ya está registrado
        const yaRegistrado = usuarios.some(usuario => usuario.email === email);
        if (yaRegistrado) {
            mensaje.textContent = "Este correo ya está registrado.";

            return;
        }

        // Agregar el nuevo usuario
        usuarios.push(nuevoUsuario);

        // Guardar en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Confirmación y limpieza del formulario
        mensaje.style.color = "green";
        mensaje.textContent = "Registro exitoso. Ya puedes iniciar sesión.";
        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);

        form.reset(); // Limpiar formulario
    });
});
