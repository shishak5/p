document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    const productList = document.querySelector('.products');
    const editModal = document.getElementById('edit-modal'); // Modal de edición
    const closeModalButton = document.getElementById('close-modal');
    const editProductForm = document.getElementById('edit-product-form');
    let currentEditProductId = null; // ID del producto en edición

    // Cargar productos desde localStorage al cargar la página
    loadProducts();

    // Agregar o editar producto al enviar el formulario
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const category = document.getElementById('product-category').value;
        const imageUrl = document.getElementById('product-image-url').value;

        if (!imageUrl) {
            alert("Por favor, ingresa una URL de imagen.");
            return;
        }

        const product = {
            id: currentEditProductId ? currentEditProductId : Date.now(),
            name,
            price,
            image: imageUrl,
            category
        };

        // Si estamos editando, actualizamos el producto, si no, lo agregamos como nuevo
        if (currentEditProductId) {
            updateProductInLocalStorage(product);
        } else {
            saveProductToLocalStorage(product);
        }

        // Restablecer el formulario y las variables
        addProductForm.reset();
        currentEditProductId = null;

        // Recargar la lista de productos después del cambio
        loadProducts();
    });

    // Cargar productos desde localStorage
    function loadProducts() {
        const products = getProductsFromLocalStorage();

        // Limpiar la lista actual de productos
        productList.innerHTML = '';

        // Mostrar productos dinámicamente
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-card');
            productDiv.dataset.id = product.id;
            productDiv.innerHTML = `
                <h4>${product.name}</h4>
                <img src="${product.image}" alt="${product.name}">
                <p>Precio: $${product.price} / kg</p>
                <p>Categoría: ${product.category}</p>
                <button class="edit-button">Editar</button>
                <button class="delete-button">Eliminar</button>
            `;
            productList.appendChild(productDiv);

            // Funcionalidad del botón de editar
            productDiv.querySelector('.edit-button').addEventListener('click', function() {
                editProduct(product);
            });

            // Funcionalidad del botón de eliminar
            productDiv.querySelector('.delete-button').addEventListener('click', function() {
                deleteProduct(product.id);
            });
        });
    }

    // Obtener productos de localStorage
    function getProductsFromLocalStorage() {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    }

    // Guardar un nuevo producto en localStorage
    function saveProductToLocalStorage(product) {
        const products = getProductsFromLocalStorage();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Actualizar un producto existente en localStorage
    function updateProductInLocalStorage(updatedProduct) {
        let products = getProductsFromLocalStorage();
        products = products.map(product => {
            // Si el producto tiene el mismo ID que el producto actualizado, lo reemplazamos
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            }
            return product;
        });
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Eliminar un producto de localStorage
    function deleteProduct(id) {
        let products = getProductsFromLocalStorage();
        products = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts(); // Recargar la lista de productos después de eliminar
    }

    // Función para editar un producto
    function editProduct(product) {
        // Llenar el formulario del modal con los datos del producto
        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-price').value = product.price;
        document.getElementById('edit-product-image-url').value = product.image;
        document.getElementById('edit-product-category').value = product.category;

        // Guardar el ID del producto que se está editando
        currentEditProductId = product.id;

        // Mostrar el modal
        editModal.style.display = 'flex';
    }

    // Cerrar el modal
    closeModalButton.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    // Editar el producto al enviar el formulario en el modal
    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('edit-product-name').value;
        const price = document.getElementById('edit-product-price').value;
        const category = document.getElementById('edit-product-category').value;
        const imageUrl = document.getElementById('edit-product-image-url').value;

        const updatedProduct = {
            id: currentEditProductId,
            name,
            price,
            image: imageUrl,
            category
        };

        // Actualizar el producto en localStorage
        updateProductInLocalStorage(updatedProduct);

        // Cerrar el modal y recargar la lista de productos
        editModal.style.display = 'none';
        loadProducts();
    });
});


  // ---------------- CERRAR SESIÓN ----------------
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("usuarioActual");
          window.location.href = "../index.html";
      });
  }