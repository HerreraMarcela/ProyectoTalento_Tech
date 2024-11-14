// Obtener todos los productos
const productos = document.querySelectorAll('.producto');

// Agregar un evento de clic a cada producto
productos.forEach(producto => {
    producto.querySelector('.btn').addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        
        // Alternar la clase 'open' en el contenedor del producto
        producto.classList.toggle('open');
        
        // Alternar la visibilidad de la descripción
        const descripcion = producto.querySelector('.descripcion');
        if (descripcion.style.display === "none" || descripcion.style.display === "") {
            descripcion.style.display = "block";
        } else {
            descripcion.style.display = "none";
        }
    });
});
