/* 
 * Magic & Illusion Supplies - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement; // Use HTML element for global variables
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle && icon) {
        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            root.setAttribute('data-theme', savedTheme);
            updateIcon(savedTheme);
        } else {
            // Default to light theme as requested
            root.setAttribute('data-theme', 'light');
            updateIcon('light');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            // If currentTheme is 'light', switch to 'dark'. Otherwise (null or 'dark'), switch to 'light'.
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            updateIcon(newTheme);
        });

        function updateIcon(theme) {
            if (theme === 'light') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // --- Mobile Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-wrapper');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Toggle body scroll lock
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = ''; // Unlock scroll
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Add to Cart Animation Simulation ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const originalText = this.innerText;
            this.innerText = 'Added!';
            this.style.background = 'var(--primary-color)';
            this.style.color = '#fff';

            setTimeout(() => {
                this.innerText = originalText;
                this.style.background = ''; // Reverts to CSS default/hover logic
                this.style.color = '';
            }, 1000);
        });
    });

    // --- Home 2 Logic (Countdown & Carousel) ---
    // Countdown Timer
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        let time = 24 * 60 * 60; // 24 hours in seconds

        const updateTimer = () => {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;

            countdownEl.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            time = time > 0 ? time - 1 : 24 * 60 * 60;
        };

        // Initial call
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Auto Scroll Carousel
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        let scrollAmount = 0;
        setInterval(() => {
            scrollAmount += 320; // Width of card + gap
            // If we've scrolled past the end, reset to 0
            if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                scrollAmount = 0;
            }
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 3000);
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
