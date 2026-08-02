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
    // EmailJS credentials (client-side safe — rate-limited by EmailJS)
    // Manage at: https://dashboard.emailjs.com/
    // =============================================
    const EMAILJS_PUBLIC_KEY = '2KQ9IF7J-8fn_mtYq';
    const EMAILJS_SERVICE_ID = 'service_kt5xl6x';
    const EMAILJS_TEMPLATE_ID = 'template_skhuhwk';

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

    // ==========================================================
    // Single Background Music Controller
    // Prevents audio overlap on mobile/BFCache and restarts music
    // from the beginning on every page load.
    // ==========================================================
    var bgMusic = new Audio('ringtone/sitemusic.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    // Restart music from beginning on every new page load
    bgMusic.currentTime = 0;

    // Helper to safely play audio
    function safePlay() {
        if (!bgMusic) return;
        var p = bgMusic.play();
        if (p !== undefined) {
            p.catch(function () {
                // Autoplay blocked — handled by interaction listener
            });
        }
    }

    // Stop and unload audio immediately when navigating away or hiding page
    // (Crucial for mobile Safari & Chrome BFCache to prevent audio overlap)
    function stopMusic() {
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
    }
    window.addEventListener('pagehide', stopMusic);
    window.addEventListener('beforeunload', stopMusic);
    window.addEventListener('unload', stopMusic);

    // Stop audio when tab is minimized or hidden
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stopMusic();
        } else if (sessionStorage.getItem('bgMusicPlaying') === '1') {
            safePlay();
        }
    });

    // Handle music playback based on user preference
    var isMuted = sessionStorage.getItem('bgMusicPlaying') === '0';

    if (!isMuted) {
        var playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                sessionStorage.setItem('bgMusicPlaying', '1');
                updateMusicIcon();
            }).catch(function () {
                // Browser blocked autoplay — start on first user interaction (touch or click)
                function enableOnInteraction() {
                    if (sessionStorage.getItem('bgMusicPlaying') !== '0') {
                        safePlay();
                        sessionStorage.setItem('bgMusicPlaying', '1');
                        updateMusicIcon();
                    }
                    document.removeEventListener('click', enableOnInteraction);
                    document.removeEventListener('touchstart', enableOnInteraction);
                    document.removeEventListener('keydown', enableOnInteraction);
                }
                document.addEventListener('click', enableOnInteraction);
                document.addEventListener('touchstart', enableOnInteraction);
                document.addEventListener('keydown', enableOnInteraction);
            });
        }
    }

    // ==========================================================
    // Music Toggle Button — mute / unmute via header icon
    // ==========================================================
    var musicToggle = document.getElementById('music-toggle');

    function updateMusicIcon() {
        if (!musicToggle) return;
        var onIcon = musicToggle.querySelector('.music-on-icon');
        var offIcon = musicToggle.querySelector('.music-off-icon');
        var muted = sessionStorage.getItem('bgMusicPlaying') === '0' || bgMusic.paused;
        if (muted) {
            if (onIcon) onIcon.style.display = 'none';
            if (offIcon) offIcon.style.display = '';
        } else {
            if (onIcon) onIcon.style.display = '';
            if (offIcon) offIcon.style.display = 'none';
        }
    }

    updateMusicIcon();

    if (musicToggle) {
        musicToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (bgMusic.paused) {
                safePlay();
                sessionStorage.setItem('bgMusicPlaying', '1');
            } else {
                bgMusic.pause();
                sessionStorage.setItem('bgMusicPlaying', '0');
            }
            updateMusicIcon();
        });
    }
})();
