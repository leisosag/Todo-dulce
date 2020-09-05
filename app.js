// CAROUSEL INSTAGRAM
window.addEventListener('load', function () {
    new Glider(document.querySelector('.contenedorImagenesLista'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.carouselIndicadores',
        arrows: {
            prev: '.carouselAnterior',
            next: '.carouselSiguiente',
        },
        responsive: [
            {
                // screens greater than >= 775px
                breakpoint: 450,
                settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                // screens greater than >= 1024px
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    })
});

///// TIENDA
// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.grillaProductos');

// carrito principal
let cart = [];
// botones
let buttonsDOM = [];

// toma los productos
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }

    }
}

// muestra los productos
class UI {
    // trae los productos de json
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article class="producto">
            <div class="imagenContenedor">
                <img src=${product.image} alt="" class="imagenProducto">
                <buttton class="bag-btn" data-id=${product.id}><i class="fas fa-shopping-cart"></i>Agregar
                </buttton>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </article>
            `
        });
        productsDOM.innerHTML = result;
    }

    // trae los botones de agregar
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerHTML = "In Cart";
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                event.target.innerHTML = "In Cart";
                event.target.disabled = true;
                // tomar el producto de productos
                let cartItem = { ...Storage.getProduct(id), amount: 1 };
                console.log(cartItem)
                // agregar al carrito

                // guardar el carrito en LS

                // establecer valores del carrito

                // agregar el item al DOM 

                // mostar el carrito

            });
        });
    }
}

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem('product', JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // tomar todos los productos
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });
});