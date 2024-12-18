// Obtener el contenedor donde se agregarán los productos
const productosLista = document.querySelector('.productos-lista');

// Array de productos con sus propiedades
const productos = [
    {
        id: 1,
        nombre: 'Cerveza Pale Ale',
        descripcion: 'Una cerveza ligera y refrescante con notas afrutadas.',
        precio: 1500,
        imagen: 'images/PaleALe.jpg'
    },
    {
        id: 2,
        nombre: 'Cerveza IPA',
        descripcion: 'Intensa y amarga, con aromas cítricos y resinosos.',
        precio: 1800,
        imagen: 'images/CervezaIpa.jpg'
    },
    {
        id: 3,
        nombre: 'Cerveza Stout',
        descripcion: 'Oscura y cremosa, con sabor a chocolate y café.',
        precio: 2000,
        imagen: 'images/CervezaStout.jpg'
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
            <p>Más detalles sobre la cerveza...</p>
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
        carrito.push({ precio });
        actualizarCarrito();
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

// Función para actualizar el carrito
function actualizarCarrito() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio;
    });
    carritoCount.textContent = carrito.length;
    carritoTotal.textContent = total;
}

// Mostrar productos cuando la página cargue
document.addEventListener('DOMContentLoaded', mostrarProductos);
