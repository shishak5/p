document.addEventListener('DOMContentLoaded', function() {
    const commentsList = document.getElementById('comments-list');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    if (comments.length === 0) {
        commentsList.innerHTML = '<p>No hay comentarios para mostrar.</p>';
    } else {
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            commentDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${comment.name}</p>
                <p><strong>Correo:</strong> ${comment.email}</p>
                <p><strong>Mensaje:</strong> ${comment.message}</p>
                <p><strong>Fecha:</strong> ${comment.date}</p>
                <hr>
            `;

            commentsList.appendChild(commentDiv);
        });
    }
});


// ---------------- CERRAR SESIÓN ----------------
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActual");
        window.location.href = "../index.html";
    });
}
