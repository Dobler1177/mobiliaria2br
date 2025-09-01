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
// Asignar mensajes aleatorios a los stickers flotantes
// Los mensajes se seleccionan de forma aleatoria a partir de un listado
// que resume los diferentes campos y servicios que ofrece TODO CAMPO.
// Esto brinda variedad y mantiene la frescura en cada visita.
(() => {
    const messages = [
        '¡Bienvenido a TODO CAMPO!',
        'Todo para el campo y la ferretería',
        'Productos agrícolas, ferretería y más',
        'Sistemas de riego, semillas y fertilizantes',
        'Soluciones para tu hogar y cultivo',
        'Herramientas, adhesivos y pinturas de calidad'
    ];
    const stickerMsgs = document.querySelectorAll('.floating-sticker .sticker-msg');
    stickerMsgs.forEach(el => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        el.textContent = messages[randomIndex];
    });
})();
