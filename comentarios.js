// scripts.js 
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const aceptacion = document.getElementById('aceptacion');


    // Verificar si los campos están vacíos
    if (name === '' || email === '' || message === '') {
        aceptacion.textContent = '¡Falta rellenar campos!';
    } else {
        aceptacion.textContent = '¡Mensaje enviado exitosamente!';
   
        
    }
});


//


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Crear un objeto con los datos del comentario
    const comment = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };

    // Obtener los comentarios previos del localStorage (si existen)
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Agregar el nuevo comentario
    comments.push(comment);

    // Guardar los comentarios en localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Mensaje de éxito
    alert('Tu mensaje ha sido enviado correctamente. Gracias por contactarnos.');

    // Limpiar el formulario
    document.getElementById('contact-form').reset();
});


  // ---------------- CERRAR SESIÓN ----------------
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("usuarioActual");
          window.location.href = "index.html";
      });
  }
