// Obtener todos los productos
const productos = document.querySelectorAll('.producto');
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

// Agregar evento a los botones de "Agregar al Carrito"
productos.forEach(producto => {
    const btnAgregar = producto.querySelector('.btn-agregar');
    btnAgregar.addEventListener('click', () => {
        const precio = parseInt(producto.getAttribute('data-price'));
        carrito.push({ precio });
        actualizarCarrito();
    });
});
