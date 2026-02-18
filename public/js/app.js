document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════
    // Navbar Scroll Effect
    // ══════════════════════════
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ══════════════════════════
    // Mobile Nav Toggle
    // ══════════════════════════
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => navLinks.classList.remove('active'))
        );
    }

    // ══════════════════════════
    // Typewriter Effect
    // ══════════════════════════
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const phrases = (window.typewriterPhrases && window.typewriterPhrases.length > 0)
            ? window.typewriterPhrases
            : [
                'Web Applications.',
                'Mobile Apps with Flutter.',
                'Android Studio Projects.',
                'REST APIs with Node.js.',
                'PHP & Laravel Systems.',
                'Docker Containers.',
                'Server Infrastructure.',
                'SQL Server Databases.',
                'Data Analysis & Mining.',
                'AI-Powered Solutions.',
                'Clean & Scalable Code.'
            ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(typeWriter, typingSpeed);
        }

        typeWriter();
    }

    // ══════════════════════════
    // Portfolio Filtering
    // ══════════════════════════
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach((card, i) => {
                const match = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                if (match) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 60);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 350);
                }
            });
        });
    });

    // ══════════════════════════
    // Counter Animation
    // ══════════════════════════
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // ══════════════════════════
    // Scroll Reveal (IntersectionObserver)
    // ══════════════════════════
    let countersAnimated = false;
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.project-card, .timeline-item, .skill-card, .stat-item')) : [];
                const index = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);

                // Trigger counter animation when stats become visible
                if (entry.target.classList.contains('stat-item') && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .timeline-item, .skill-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // ══════════════════════════
    // Smooth Scroll
    // ══════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

});
