document.addEventListener("DOMContentLoaded", () => {
    // Verificar si el usuario está logueado
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!usuarioActual) {
        alert("Debes iniciar sesión para acceder a la configuración.");
        window.location.href = "index.html";
        return;
    }

    // Cargar los datos del usuario en el formulario
    document.getElementById("nombre").value = usuarioActual.nombre || "";
    document.getElementById("email").value = usuarioActual.email || ""; // No se puede cambiar
    document.getElementById("telefono").value = usuarioActual.telefono || "";
    document.getElementById("domicilio").value = usuarioActual.domicilio || "";

    // Manejar el envío del formulario
    const form = document.getElementById("config-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Actualizar los datos del usuario, pero no el correo electrónico
        usuarioActual.nombre = document.getElementById("nombre").value;
        usuarioActual.telefono = document.getElementById("telefono").value;
        usuarioActual.domicilio = document.getElementById("domicilio").value;

        // Guardar los nuevos datos en localStorage
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

        // Mostrar mensaje de éxito
        document.getElementById("mensaje-exito").style.display = "block";

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            document.getElementById("mensaje-exito").style.display = "none";
        }, 3000);
    });

    // Cerrar sesión
    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActual");
        window.location.href = "index.html";
    });
});
