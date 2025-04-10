document.addEventListener('DOMContentLoaded', function () {
    const ordersContainer = document.getElementById('orders');

    // Función para obtener todos los pedidos de todos los usuarios
    function getAllOrdersFromLocalStorage() {
        const allOrders = JSON.parse(localStorage.getItem('orders')) || {};
        return allOrders; // Devuelve el objeto completo con todos los usuarios
    }

    // Función para mostrar todos los pedidos
    function displayOrders() {
        const allOrders = getAllOrdersFromLocalStorage();
        const allEmails = Object.keys(allOrders);

        if (allEmails.length === 0) {
            ordersContainer.innerHTML = '<p>No hay pedidos registrados.</p>';
            return;
        }

        allEmails.forEach(email => {
            const userOrders = allOrders[email];

            userOrders.forEach(orderData => {
                const orderDiv = document.createElement('div');
                orderDiv.classList.add('order');

                const itemsList = orderData.cart.map(product => {
                    const totalItem = product.price * product.quantity;
                    return `<li>${product.name} - $${product.price} x ${product.quantity}kg = $${totalItem.toFixed(2)}</li>`;
                }).join('');

                const total = orderData.cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

                orderDiv.innerHTML = `
                    <h3>Pedido de <strong>${email}</strong> realizado el ${orderData.date}</h3>
                    <p>Método de pago: ${orderData.paymentMethod}</p>
                    <ul>${itemsList}</ul>
                    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
                `;

                ordersContainer.appendChild(orderDiv);
            });
        });
    }

    displayOrders();
});


// ---------------- CERRAR SESIÓN ----------------
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActual");
        window.location.href = "../index.html";
    });
}