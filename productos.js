// Obtener el contenedor donde se agregarán los productos
const productosLista = document.querySelector('.productos-lista');

// Array de productos con sus propiedades (Puedes obtenerlos de una API REST más tarde)
const productos = [
    {
        id: 1,
        nombre: 'Cerveza Pale Ale',
        descripcion: 'Una cerveza ligera y refrescante con notas afrutadas.',
        precio: 1500,
        imagen: 'images/PaleALe.jpg',
        detalles: 'Cerveza de color dorado, con un sabor suave pero afrutado. Ideal para los que prefieren una cerveza ligera y refrescante.'
    },
    {
        id: 2,
        nombre: 'Cerveza IPA',
        descripcion: 'Intensa y amarga, con aromas cítricos y resinosos.',
        precio: 1800,
        imagen: 'images/CervezaIpa.jpg',
        detalles: 'Una IPA potente, con un sabor amargo pronunciado, ideal para quienes disfrutan de cervezas con un toque cítrico y un final seco.'
    },
    {
        id: 3,
        nombre: 'Cerveza Stout',
        descripcion: 'Oscura y cremosa, con sabor a chocolate y café.',
        precio: 2000,
        imagen: 'images/CervezaStout.jpg',
        detalles: 'Cerveza oscura y espesa, con notas de café tostado y chocolate. Perfecta para los amantes de las cervezas robustas.'
    }
];

// Función para crear y mostrar cada producto
function mostrarProducto(producto) {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    divProducto.setAttribute('data-price', producto.precio);

    divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="precio">$${producto.precio}</span>
        <button class="btn-toggle">Ver más</button>
        <div class="detalles" style="display: none;">
            <p>${producto.detalles}</p>
        </div>
        <button class="btn-agregar">Agregar al Carrito</button>
    `;

    // Mostrar/Ocultar detalles del producto al hacer clic
    const btnToggle = divProducto.querySelector('.btn-toggle');
    const detalles = divProducto.querySelector('.detalles');
    btnToggle.addEventListener('click', () => {
        detalles.style.display = detalles.style.display === 'none' ? 'block' : 'none';
    });

    // Agregar el producto al carrito
    const btnAgregar = divProducto.querySelector('.btn-agregar');
    btnAgregar.addEventListener('click', () => {
        const precio = producto.precio;
        const nombre = producto.nombre;

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1; // Si ya está, aumenta la cantidad
        } else {
            carrito.push({ id: producto.id, nombre, precio, cantidad: 1 }); // Si no está, agregarlo al carrito
        }

        actualizarCarrito();  // Actualizar la visualización del carrito
    });

    return divProducto;
}

// Función para mostrar todos los productos
function mostrarProductos() {
    productos.forEach(producto => {
        const productoElemento = mostrarProducto(producto);
        productosLista.appendChild(productoElemento);
    });
}

// Carrito
let carrito = [];
const carritoCount = document.getElementById('carrito-count');
const carritoTotal = document.getElementById('carrito-total');
const carritoList = document.getElementById('carrito-list');

// Función para actualizar el carrito
function actualizarCarrito() {
    let total = 0;
    carritoCount.textContent = carrito.length;

    carritoTotal.textContent = carrito.reduce((acc, item) => {
        acc += item.precio * item.cantidad;
        return acc;
    }, 0);

    // Mostrar los productos en el carrito
    carritoList.innerHTML = '';  // Limpiar el carrito antes de actualizar
    carrito.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('carrito-item');
        divItem.innerHTML = ` 
            <p>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}</p>
            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
        `;
        
        // Agregar el botón de eliminar para cada producto en el carrito
        const btnEliminar = divItem.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', (e) => {
            const productoId = parseInt(e.target.dataset.id);
            eliminarDelCarrito(productoId);  // Eliminar el producto por su ID
        });

        carritoList.appendChild(divItem);
    });

    // Guardar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
    // Filtramos el producto y lo eliminamos del carrito
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito(); // Actualizar la visualización del carrito y el localStorage
}

// Cargar el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito(); // Actualizar la visualización del carrito con los productos guardados
    }
    mostrarProductos(); // Mostrar los productos en la página
});

// Mostrar Carrito al hacer clic
const carritoButton = document.getElementById('carrito');
carritoButton.addEventListener('click', () => {
    const carritoModal = document.getElementById('carrito-modal');
    carritoModal.style.display = 'block';  // Mostrar el modal del carrito
});

// Cerrar el carrito cuando se hace clic en el botón de cerrar
const cerrarCarritoButton = document.getElementById('cerrar-carrito');
cerrarCarritoButton.addEventListener('click', () => {
    const carritoModal = document.getElementById('carrito-modal');
    carritoModal.style.display = 'none';  // Cerrar el modal del carrito
});



