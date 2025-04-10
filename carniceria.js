document.addEventListener("DOMContentLoaded", () => {
    // ---------------- VALIDAR SESIÓN ----------------
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    if (!usuarioActual) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "index.html";
        return;
    }

    // ---------------- CERRAR SESIÓN ----------------
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioActual");
            window.location.href = "index.html";
        });
    }

    // ---------------- CARGAR PRODUCTOS ----------------
    const contenedor = document.querySelector(".products");

    function getProductsFromLocalStorage() {
        const products = localStorage.getItem("products");
        return products ? JSON.parse(products) : [];
    }

    function loadProducts() {
        const products = getProductsFromLocalStorage();

        if (products.length === 0) {
            contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        contenedor.innerHTML = ''; // Limpiar antes de cargar

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-card");
            productDiv.setAttribute("data-name", product.name.toLowerCase());

            productDiv.innerHTML = `
                <h4>${product.name}</h4>
                <img src="${product.image}" alt="${product.name}">
                <p class="price">$${product.price} / kg</p>
                <input type="number" class="quantity" value="1" min="1">
                <button class="add-to-cart">Agregar al carrito</button>
            `;

            contenedor.appendChild(productDiv);
        });

        setupAddToCartButtons();
    }

    // ---------------- BÚSQUEDA ----------------
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const productName = card.getAttribute('data-name');
                card.style.display = productName.includes(query) ? 'block' : 'none';
            });
        });
    }

    // ---------------- CARRITO POR USUARIO ----------------
    function getUserEmail() {
        return usuarioActual?.email || null;
    }

    function getCartFromLocalStorage() {
        const userEmail = getUserEmail();
        if (userEmail) {
            const cart = localStorage.getItem(`cart_${userEmail}`);
            return cart ? JSON.parse(cart) : [];
        }
        return [];
    }

    function saveCartToLocalStorage(cart) {
        const userEmail = getUserEmail();
        if (userEmail) {
            localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
        }
    }

    function setupAddToCartButtons() {
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.product-card');
                const name = productCard.querySelector('h4').textContent;
                const price = productCard.querySelector('.price').textContent.replace(/[^\d.]/g, '');
                const image = productCard.querySelector('img').src;
                const quantity = productCard.querySelector('.quantity').value;

                const product = {
                    name,
                    price: parseFloat(price),
                    image,
                    quantity: parseInt(quantity)
                };

                let cart = getCartFromLocalStorage();
                cart.push(product);
                saveCartToLocalStorage(cart);

                window.location.href = 'Carrito.html';
            });
        });
    }

    // ---------------- INICIAR TODO ----------------
    loadProducts();
});
