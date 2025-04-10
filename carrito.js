document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual || !usuarioActual.email) {
        alert('Debes iniciar sesión primero.');
        window.location.href = 'index.html';
        return;
    }

    const userEmail = usuarioActual.email;
    const cartContainer = document.querySelector('.cart-container');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutButton = document.getElementById('checkoutButton');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const paymentMethodSelect = document.getElementById('payment-method');

    // Función para obtener el carrito desde localStorage
    function getCartFromLocalStorage() {
        const cart = localStorage.getItem(`cart_${userEmail}`);
        return cart ? JSON.parse(cart) : [];
    }

    // Función para guardar el carrito actualizado en localStorage
    function saveCartToLocalStorage(cart) {
        localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
    }

    // Función para mostrar el carrito
    function displayCart() {
        const cart = getCartFromLocalStorage();
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>No tienes productos en el carrito.</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        let total = 0;

        cart.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p>Precio: $${product.price} / kg</p>
                    <input type="number" class="quantity" value="${product.quantity}" min="1" data-index="${index}">
                    <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartContainer.appendChild(productDiv);

            total += product.price * product.quantity;
        });

        totalPriceElement.textContent = "$" + total.toFixed(2);
    }

    // Función para eliminar un producto del carrito
    function removeProductFromCart(index) {
        const cart = getCartFromLocalStorage();
        cart.splice(index, 1);
        saveCartToLocalStorage(cart);
        displayCart();
    }

    // Función para actualizar la cantidad de un producto
    function updateProductQuantity(index, newQuantity) {
        if (newQuantity < 1) return;
        const cart = getCartFromLocalStorage();
        cart[index].quantity = newQuantity;
        saveCartToLocalStorage(cart);
        displayCart();
    }

    // Delegación de eventos para eliminar productos y actualizar cantidades
    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            removeProductFromCart(index);
        }
    });

    cartContainer.addEventListener('input', function (event) {
        if (event.target.classList.contains('quantity')) {
            const index = event.target.dataset.index;
            let newQuantity = parseInt(event.target.value, 10);

            if (isNaN(newQuantity) || newQuantity < 1) {
                alert('La cantidad debe ser un número mayor o igual a 1');
                event.target.value = 1;
                newQuantity = 1;
            }

            updateProductQuantity(index, newQuantity);
        }
    });

    // Mostrar el carrito al cargar
    displayCart();

    // Cuando el usuario presiona "Proceder al pago", mostrar el modal
    checkoutButton.addEventListener('click', function () {
        const cart = getCartFromLocalStorage();
        if (cart.length > 0) {
            confirmationModal.style.display = 'block';  // Mostrar modal
        } else {
            alert('Tu carrito está vacío.');
        }
    });

    // Cuando el usuario confirma el pago
   // Cuando el usuario confirma el pago
confirmBtn.addEventListener('click', function () {
    const cart = getCartFromLocalStorage();
    if (cart.length > 0) {
        // Crear el pedido con la información del carrito
        const order = {
            email: userEmail,
            cart: cart,
            paymentMethod: paymentMethodSelect.value,
            date: new Date().toLocaleString()
        };

        // Obtener los pedidos previos de localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || {};

        // Si el usuario ya tiene pedidos, agregar el nuevo pedido
        if (!orders[userEmail]) {
            orders[userEmail] = [];
        }
        orders[userEmail].push(order);

        // Guardar los pedidos actualizados en localStorage
        localStorage.setItem('orders', JSON.stringify(orders));

        // Eliminar el carrito de localStorage
        localStorage.removeItem(`cart_${userEmail}`);

        // Redirigir al usuario a la página de pedidos
        window.location.href = 'pedidos.html';
    }
});


    // Cuando el usuario cancela el pago, ocultar el modal
    cancelBtn.addEventListener('click', function () {
        confirmationModal.style.display = 'none';
    });
});

