// ============================================
// ZAP-INSPIRED PORTFOLIO - JavaScript
// Theme toggle + Gallery lightbox + Search
// ============================================

(function () {
    'use strict';

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.remove('dk');
    } else {
        html.classList.add('dk');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function (e) {
            e.preventDefault();
            html.classList.toggle('dk');
            localStorage.setItem('theme', html.classList.contains('dk') ? 'dark' : 'light');
        });
    }

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.gallery a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                lightboxImg.src = this.href || this.querySelector('img').src;
                lightboxImg.alt = this.querySelector('img')?.alt || '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightbox.addEventListener('click', function () {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Search Filtering (for projects page) ---
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        const items = Array.from(searchResults.querySelectorAll('li'));

        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();

            items.forEach(function (item) {
                const text = item.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // In a real site, this would POST to a backend
            alert('Thank you, ' + name + '! Your message has been sent.');
            contactForm.reset();
        });
    }
})();
