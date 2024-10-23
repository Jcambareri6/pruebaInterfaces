// document.addEventListener('DOMContentLoaded', () => {
//     const progressBar = document.getElementById('progress-bar');
//     const progressText = document.getElementById('progress-text');
//     const content = document.querySelector('.content');
//     const loadingOverlay = document.querySelector('.loading-overlay');

//     let progress = 0;
//     const loadingTime = 5000;
//     const interval = 95; 

//     const loadingInterval = setInterval(() => {
//         progress += (interval / loadingTime) * 100; // Calcular porcentaje
       
//         progressText.textContent = `${Math.floor(progress)}%`;

//         if (progress >= 100) {
//             clearInterval(loadingInterval);
//             loadingOverlay.style.display = 'none'; // Ocultar el overlay
//             content.style.filter = 'blur(0)'; // Quitar el desenfoque
//         }
//     }, interval);
// });
 const flechasIzquierda = document.querySelectorAll('.flecha_izq');
    const flechasDerecha = document.querySelectorAll('.flecha_der');
    const carousels = document.querySelectorAll('.carrousel_grande');
    
    let currentIndex = 0;

    // Inicializa la visualización del carrusel
    showCarousel(currentIndex);
    updateArrowVisibility(currentIndex); // Verifica la visibilidad de las flechas al inicio

    function showCarousel(index) {
        carousels.forEach((carousel, i) => {
            if (i === index) {
                carousel.classList.add('active');
                carousel.classList.remove('out');
            } else {
                carousel.classList.remove('active');
                carousel.classList.add('out');
            }
        });
        updateArrowVisibility(index); // Actualiza la visibilidad de las flechas después de mostrar el carrusel
    }

    function updateArrowVisibility(index) {
        // Ocultar la flecha izquierda si estamos en el primer carrusel
        if (index === 0) {
            flechasIzquierda.forEach(flecha => flecha.classList.add('displayNone'));
        } else {
            flechasIzquierda.forEach(flecha => flecha.classList.remove('displayNone'));
        }

        // Ocultar la flecha derecha si estamos en el último carrusel
        if (index === carousels.length - 1) {
            flechasDerecha.forEach(flecha => flecha.classList.add('displayNone'));
        } else {
            flechasDerecha.forEach(flecha => flecha.classList.remove('displayNone'));
        }
    }

    flechasDerecha.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carousels.length; // Incrementar índice
            showCarousel(currentIndex);
        });
    });

    flechasIzquierda.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carousels.length) % carousels.length; // Decrementar índice
            showCarousel(currentIndex);
        });
    });


    let registro = document.querySelector('#registrarse');
    let overlay = document.querySelector('#overlay');
    
    function mostrarOverlay(e) {
        e.preventDefault(); // Evita que el formulario se envíe
      
        // Muestra el overlay
        overlay.classList.remove("hidden"); 
        overlay.classList.add("show"); 
      
        // Muestra el popover
        popover.classList.remove("hidden");
        setTimeout(() => {
          popover.classList.add("show");
        }, 100); // Pequeña demora para permitir la transición
      
        // Escucha el clic en el overlay para ocultar el popover
        overlay.addEventListener('click', ocultarRegistroExitoso);
      }
      
    
   
    function ocultarRegistroExitoso() {
      overlay.classList.add("hidden");
      popover.classList.remove("show");
    
     
    }
    registro.addEventListener('click', mostrarOverlay);