// Obtener el contenedor donde se agregarán los productos
const productosLista = document.querySelector('.productos-lista');

// Array de productos con sus propiedades
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

// **Carrito**
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recuperar carrito desde localStorage

// Función para crear y mostrar cada producto
function mostrarProducto(producto) {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    divProducto.setAttribute('data-id', producto.id);
    divProducto.setAttribute('data-nombre', producto.nombre);
    divProducto.setAttribute('data-precio', producto.precio);

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
        agregarAlCarrito(producto);
    });

    return divProducto;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1; // Si ya está, aumenta la cantidad
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }); // Si no está, agregarlo al carrito
    }

    // Mostrar el carrito inmediatamente después de agregar el producto
    actualizarCarrito();
}

// Función para mostrar todos los productos
function mostrarProductos() {
    productos.forEach(producto => {
        const productoElemento = mostrarProducto(producto);
        productosLista.appendChild(productoElemento);
    });
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const cantidadCarrito = document.getElementById('cantidad-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carritoList = document.getElementById('lista-carrito');

    // Si el carrito está vacío, mostrar mensaje
    if (carrito.length === 0) {
        cantidadCarrito.textContent = '0';
        totalCarrito.textContent = '0.00';
        carritoList.innerHTML = '<p>El carrito está vacío.</p>';
        return;  // Si está vacío, no continuar con el resto de la función
    }

    // Calcular la cantidad total
    cantidadCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    // Calcular el total correctamente
    const total = carrito.reduce((acc, item) => {
        // Asegurarse de que el precio y la cantidad sean números
        const precio = parseFloat(item.precio);
        const cantidad = parseInt(item.cantidad);

        // Si el precio o la cantidad no son números, mostrar un error
        if (isNaN(precio) || isNaN(cantidad)) {
            console.error(`Error con el precio o cantidad del producto: ${item.nombre}`);
            return acc; // Evitar que el total sea NaN
        }

        return acc + (precio * cantidad);
    }, 0);

    // Mostrar el total
    totalCarrito.textContent = total.toFixed(2);

    // Mostrar los productos en el carrito
    carritoList.innerHTML = '';  // Limpiar el carrito antes de actualizar
    carrito.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('carrito-item');
        divItem.innerHTML = ` 
            <p>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</p>
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

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito(); // Actualizar la visualización del carrito y el localStorage
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = []; // Vaciar el carrito
    localStorage.removeItem('carrito'); // Eliminar carrito en el localStorage
    actualizarCarrito(); // Actualizar la visualización del carrito
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
if (carritoButton) {
    carritoButton.addEventListener('click', () => {
        const carritoModal = document.getElementById('carrito-modal');
        if (carritoModal) carritoModal.style.display = 'block';
    });
}

// Cerrar el carrito cuando se hace clic en el botón de cerrar
const cerrarCarritoButton = document.getElementById('cerrar-carrito');
if (cerrarCarritoButton) {
    cerrarCarritoButton.addEventListener('click', () => {
        const carritoModal = document.getElementById('carrito-modal');
        if (carritoModal) carritoModal.style.display = 'none';
    });
}

// Vaciar el carrito cuando se hace clic en el botón de vaciar
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}




//----- API POKEMON----//

document.getElementById('pokemon-api-link').addEventListener('click', async function(e) {
    e.preventDefault(); // Evita que el enlace haga la navegación predeterminada

    // Llamada a la API de Pokémon para obtener un Pokémon aleatorio
    const pokemonId = getRandomInt(1, 151); // Limita a Pokémon 1 a 151 (Pokémon originales)
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();

        const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Capitalizar el nombre
        const pokemonType = data.types.map(type => type.type.name).join(', '); // Obtener tipos
        const recommendedBeer = getBeerRecommendation(pokemonType); // Obtener recomendación de cerveza

        // Mostrar los datos del Pokémon
        document.getElementById('pokemon-name').textContent = 'Pokémon: ' + pokemonName;
        document.getElementById('pokemon-type').textContent = 'Tipo: ' + pokemonType;
        document.getElementById('recommended-beer').textContent = 'Cerveza recomendada: ' + recommendedBeer;

    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
        alert('Hubo un problema al obtener el Pokémon.');
    }
});

// Función para generar un número aleatorio dentro de un rango
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para recomendar una cerveza según el tipo de Pokémon
function getBeerRecommendation(pokemonType) {
    if (pokemonType.includes('fire')) {
        return 'Cerveza IPA (fuerte y amargosa)';
    } else if (pokemonType.includes('water')) {
        return 'Cerveza Lager (ligera y refrescante)';
    } else if (pokemonType.includes('grass')) {
        return 'Cerveza Artesanal (sabores intensos)';
    } else if (pokemonType.includes('electric')) {
        return 'Cerveza Pilsner (fresca y ligera)';
    } else {
        return 'Cerveza Lager (ligera y versátil)';
    }
}
