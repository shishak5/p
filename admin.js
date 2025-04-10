
function saveProductToLocalStorage(product) {
    const products = getProductsFromLocalStorage();  // Obtener productos del localStorage
    products.push(product);  // Agregar el nuevo producto
    localStorage.setItem('products', JSON.stringify(products));  // Guardarlo de nuevo en localStorage
}

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.querySelector('.products'); // Donde se van a mostrar los productos

    // Función para cargar productos desde localStorage
    function loadProducts() {
        const products = getProductsFromLocalStorage(); // Obtener productos guardados en localStorage

        // Limpiar el contenedor de productos antes de agregar los nuevos productos
        productList.innerHTML = '';

        // Recorrer cada producto y crear los elementos HTML correspondientes
        products.forEach(function(product) {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-card');
            productDiv.setAttribute('data-name', product.name); // Usamos el atributo data-name para la búsqueda

            productDiv.innerHTML = `
                <h4>${product.name}</h4>
                <img src="${product.image}" alt="${product.name}">
                <p class="price">$${product.price} / kg</p>
                <input type="number" class="quantity" value="1" min="1">
                <button class="add-to-cart">Agregar al carrito</button>
            `;

            // Agregar el producto al contenedor
            productList.appendChild(productDiv);
        });
    }

    // Función para obtener los productos desde localStorage
    function getProductsFromLocalStorage() {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : []; // Si no hay productos, retornar un array vacío
    }

    // Cargar productos al cargar la página
    loadProducts();
});


document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');  // El botón de búsqueda
    const searchInput = document.querySelector('.search-input');  // La caja de texto de búsqueda
    const productCards = document.querySelectorAll('.product-card');  // Todos los productos

    // Función que se ejecuta cuando se hace clic en el botón de búsqueda
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase().trim();  // Obtiene el valor de la búsqueda, convirtiéndolo a minúsculas

        // Si no hay texto en la caja de búsqueda, mostrar todos los productos
        if (query === '') {
            productCards.forEach(function(card) {
                card.style.display = 'block';  // Muestra todos los productos
            });
            return;
        }

        // Iterar sobre todos los productos y mostrarlos u ocultarlos
        productCards.forEach(function(card) {
            const productName = card.querySelector('h4').textContent.toLowerCase();  // Obtiene el nombre del producto (en minúsculas)

            // Si el nombre del producto contiene el texto de búsqueda, mostrar el producto, de lo contrario, ocultarlo
            if (productName.includes(query)) {
                card.style.display = 'block';  // Mostrar el producto
            } else {
                card.style.display = 'none';  // Ocultar el producto
            }
        });
    });
});

  // ---------------- CERRAR SESIÓN ----------------
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("usuarioActual");
          window.location.href = "index.html";
      });
  }





