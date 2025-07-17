document.addEventListener('DOMContentLoaded', () => {
    // --- Gestion du menu sticky ---
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    const headerHeight = header.offsetHeight; // Hauteur initiale du header

    // Fonction pour gérer le menu sticky
    function handleStickyHeader() {
        if (window.scrollY > heroSection.offsetHeight - headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleStickyHeader);
    // Appel initial pour gérer le cas où la page est rechargée en position de défilement
    handleStickyHeader();

    // --- Gestion du menu burger pour mobile ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Empêche le défilement du corps quand le menu mobile est ouvert
        document.body.classList.toggle('no-scroll');
    });

    // Fermer le menu mobile si un lien est cliqué
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- Animations au scroll (Intersection Observer) ---
    const animateElements = document.querySelectorAll('.fade-in, .slide-up');

    const observerOptions = {
        root: null, // La fenêtre d'affichage est la racine
        rootMargin: '0px',
        threshold: 0.1 // L'élément est visible à 10%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Arrête d'observer une fois l'animation déclenchée
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Slider de Portfolio ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth; // Largeur d'une slide

    // Création des points de navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Redimensionner le slider si la fenêtre change de taille
    window.addEventListener('resize', () => {
        goToSlide(currentIndex); // Réajuste la position en cas de redimensionnement
    });

    // Autoplay du slider (optionnel)
    // setInterval(() => {
    //     goToSlide(currentIndex + 1);
    // }, 5000); // Change de slide toutes les 5 secondes

    // --- Gestion du formulaire de commande express ---
    const expressOrderForm = document.getElementById('expressOrderForm');
    const formMessage = document.getElementById('form-message');

    if (expressOrderForm) {
        expressOrderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche l'envoi par défaut du formulaire

            // Récupération des données du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const youtubeChannel = document.getElementById('youtube-channel').value;
            const miniatureType = document.getElementById('miniature-type').value;
            const message = document.getElementById('message').value;

            // Simple validation côté client
            if (!name || !email || !miniatureType || !message) {
                formMessage.textContent = 'Veuillez remplir tous les champs obligatoires.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                return;
            }

            // Ici, vous enverriez les données à un service backend (ex: Formspree, Netlify Forms, votre propre API)
            // Pour cet exemple, nous simulons un envoi réussi.
            console.log('Données du formulaire:', { name, email, youtubeChannel, miniatureType, message });

            // Affichage d'un message de succès
            formMessage.textContent = 'Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            formMessage.style.display = 'block';

            // Réinitialisation du formulaire après un court délai
            setTimeout(() => {
                expressOrderForm.reset();
                formMessage.style.display = 'none';
            }, 3000);
        });
    }

    // --- Défilement fluide pour les liens internes ---
    document.querySelectorAll('a.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcule la position de défilement en tenant compte de la hauteur du header sticky
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});
