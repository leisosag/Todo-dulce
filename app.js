// VARIABLES
const carrito = document.getElementById('carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const listaProductos = document.getElementById('lista-productos');
let productosCarrito = [];

cargarEventListeners();

// EVENT LISTENERS
function cargarEventListeners() {
    // agrega un producto al carrito al presionar el btn
    listaProductos.addEventListener('click', agregarProducto);

    // borra productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // muestra los productos de local storage
    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        productosCarrito = [];
        limpiarHTML();
    });
}

// FUNCIONES
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;

        leeDatosProducto(productoSeleccionado);
    }
}

// elimina un producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar')) {
        const productoId = e.target.getAttribute('data-id');

        // elimina del array por data-id
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

        // vuelve a iterar sobre el carrito y muestra el actualzado
        carritoHTML();
    }
}

// lee el contenido del html y extrae la info del producto
function leeDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // revisar si el producto ya existe en el carrito
    const existe = productosCarrito.some(producto => producto.id === infoProducto.id);
    // si existe le agrego otro a la cantidad
    if (existe) {
        const productos = productosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // retorna el producto con la cantidad actualizada
            } else {
                return producto; // retorna los productos que no estan duplicados
            }
        });
        productosCarrito = [...productos];
    } else {
        // es la primera vez que se agrega el producto al array del carrito
        productosCarrito = [...productosCarrito, infoProducto];
    }

    carritoHTML();
}

// muestra el carrito en el HTML
function carritoHTML() {
    // limpiar el HTML
    limpiarHTML();
    // recorre el carrito y genera el HTML
    productosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="btn btn-color borrar" data-id="${id}"> X </a>
            </td>
            `;
        contenedorCarrito.appendChild(row);
    })

    // agregar carrito a local storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

// elimina los productos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
