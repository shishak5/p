document.addEventListener('DOMContentLoaded', () => {
    const usuariosContainer = document.getElementById('usuarios-container');
  
    function getUsuarios() {
      return JSON.parse(localStorage.getItem('usuarios')) || [];
    }
  
    function mostrarUsuarios() {
      const usuarios = getUsuarios();
  
      if (usuarios.length === 0) {
        usuariosContainer.innerHTML = '<p>No hay usuarios registrados.</p>';
        return;
      }
  
      usuarios.forEach(usuario => {
        const card = document.createElement('div');
        card.classList.add('usuario-card');
  
        card.innerHTML = `
          <h3>${usuario.name}</h3>
          <p><strong>Email:</strong> ${usuario.email}</p>
          <p><strong>Dirección:</strong> ${usuario.address}</p>
          <p><strong>Teléfono:</strong> ${usuario.phone}</p>
        `;
  
        usuariosContainer.appendChild(card);
      });
    }
  
    mostrarUsuarios();
  });

  // ---------------- CERRAR SESIÓN ----------------
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("usuarioActual");
          window.location.href = "../index.html";
      });
  }
  