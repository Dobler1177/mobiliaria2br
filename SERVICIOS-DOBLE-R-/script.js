// Smooth scrolling for internal navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// IntersectionObserver to animate sections when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe product cards and gallery items
const animatedItems = document.querySelectorAll('.product-card, .gallery-item');
animatedItems.forEach(item => {
    observer.observe(item);
});

// Manejar clic en la burbuja de chat personalizada
const chatBubble = document.getElementById('chat-bubble');
const chatModal = document.getElementById('chat-modal');
const chatClose = document.getElementById('chat-close');
if (chatBubble && chatModal) {
    chatBubble.addEventListener('click', function() {
        // Abre el modal de asistencia con preguntas frecuentes
        chatModal.classList.add('active');
    });
}
// Cerrar el modal cuando se haga clic en el botón "Cerrar"
if (chatClose && chatModal) {
    chatClose.addEventListener('click', function() {
        chatModal.classList.remove('active');
    });
}

// -------------------------------------------------------------------
// Asignar mensajes y posiciones aleatorias a los stickers flotantes
//
// Las burbujas se desplazaran a posiciones aleatorias de la pantalla y
// mostrarán mensajes diferentes relacionados con los servicios de TODO
// CAMPO.  Cada cierto tiempo desaparecen y reaparecen en otro sitio
// para no obstruir la navegación.  Los mensajes abarcan temas de
// agricultura, ferretería, hogar, riego, motores y herramientas.
(() => {
    const messages = [
        '¡Bienvenido a TODO CAMPO!',
        'Todo para el campo y la ferretería',
        'Productos agrícolas, ferretería y hogar',
        'Sistemas de riego, bombas y aspersores',
        'Insumos agrícolas, semillas y fertilizantes',
        'Herramientas manuales y eléctricas',
        'Motores y generadores para el agro',
        'Soluciones para tu hogar y cultivos',
        'Pinturas, adhesivos y accesorios',
        'Equipos para riego, riego por goteo y aspersión'
    ];

    const stickers = document.querySelectorAll('.floating-sticker');

    function randomizeStickers() {
        stickers.forEach(sticker => {
            const msgSpan = sticker.querySelector('.sticker-msg');
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            msgSpan.textContent = randomMessage;
            // Generar coordenadas aleatorias dentro de márgenes para que no
            // interfiera con el contenido principal.  Usamos unidades de
            // viewport para adaptarnos a distintos tamaños de pantalla.
            // Colocamos las burbujas fuera del área principal del héroe.
            // Elegimos una altura entre 20% y 80% de la ventana, y un ancho
            // entre 5% y 75%.  Esto ayuda a que los mensajes no se superpongan
            // con el contenido principal, especialmente la cabecera.
            const top = Math.random() * 60 + 20;    // 20% a 80% de altura
            const left = Math.random() * 70 + 5;    // 5% a 75% de ancho
            sticker.style.top = top + 'vh';
            sticker.style.left = left + 'vw';
            // Reiniciar otras posiciones que puedan haber quedado definidas
            sticker.style.right = 'auto';
            sticker.style.bottom = 'auto';
            // Hacer visible la burbuja
            sticker.style.opacity = 1;
        });
    }
    // Realizar la primera asignación inmediata
    randomizeStickers();
    // Establecer un intervalo para que cada 15 segundos se oculten y
    // reaparezcan en posiciones y con mensajes distintos
    setInterval(() => {
        // Ocultar gradualmente
        stickers.forEach(sticker => {
            sticker.style.opacity = 0;
        });
        // Después de 1 segundo (justo tras la transición), reposicionar y
        // mostrar de nuevo
        setTimeout(() => {
            randomizeStickers();
        }, 1000);
    }, 15000);
})();
