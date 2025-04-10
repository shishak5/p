document.addEventListener('DOMContentLoaded', function () {
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  if (!usuarioActual || !usuarioActual.email) {
      alert('Debes iniciar sesión primero.');
      window.location.href = 'index.html'; // Redirigir si no está logueado
      return;
  }

  const userEmail = usuarioActual.email;
  const ordersContainer = document.getElementById('orders');

  // Función para obtener los pedidos del usuario desde localStorage
  function getOrdersFromLocalStorage() {
      const orders = JSON.parse(localStorage.getItem('orders')) || {};
      return orders[userEmail] || []; // Retornar solo los pedidos del usuario actual
  }

  // Función para mostrar los pedidos del usuario en la página
  function displayOrders() {
      const orders = getOrdersFromLocalStorage();

      if (orders.length === 0) {
          ordersContainer.innerHTML = '<p>No tienes pedidos.</p>';
          return;
      }

      // Iterar sobre los pedidos y mostrarlos
      orders.forEach(order => {
          const orderDiv = document.createElement('div');
          orderDiv.classList.add('order');

          // Crear el contenido del pedido
          orderDiv.innerHTML = `
              <h3>Pedido realizado el ${order.date}</h3>
              <p>Método de pago: ${order.paymentMethod}</p>
              <ul>
                  ${order.cart.map(product => `
                      <li>${product.name} - $${product.price} x ${product.quantity}kg = $${(product.price * product.quantity).toFixed(2)}</li>
                  `).join('')}
              </ul>
              <p>Total: $${order.cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</p>
          `;

          ordersContainer.appendChild(orderDiv);
      });
  }

  // Llamar a la función para mostrar los pedidos al cargar la página
  displayOrders();
});

  // ---------------- CERRAR SESIÓN ----------------
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("usuarioActual");
          window.location.href = "index.html";
      });
  }
