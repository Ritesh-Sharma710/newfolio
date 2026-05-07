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

    // --- Contact Form Handler (EmailJS) ---
    // =============================================
    // REPLACE THESE WITH YOUR REAL EMAILJS CREDENTIALS:
    // 1. Sign up at https://www.emailjs.com/
    // 2. Add an Email Service (Gmail, Outlook, etc.)
    // 3. Create an Email Template with variables:
    //    {{from_name}}, {{from_email}}, {{message}}
    // 4. Copy your Public Key from Account > General
    // =============================================
    const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

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

            // Disable button while sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                alert('Email service not loaded. Please check your internet connection.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: name,
                from_email: email,
                message: message
            }).then(function () {
                alert('Thank you, ' + name + '! Your message has been sent successfully.');
                contactForm.reset();
            }).catch(function (error) {
                console.error('EmailJS Error:', error);
                alert('Oops! Something went wrong. Please try again later.');
            }).finally(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
})();
