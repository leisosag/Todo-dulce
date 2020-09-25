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