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

     var bgMusic = new Audio('ringtone/sitemusic.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    // --- Restore previous playback position (cross-page resume) ---
    var savedTime = parseFloat(sessionStorage.getItem('bgMusicTime'));
    if (!isNaN(savedTime) && savedTime > 0) {
        bgMusic.currentTime = savedTime;
    }

    // --- Periodically save playback position ---
    setInterval(function () {
        if (!bgMusic.paused) {
            sessionStorage.setItem('bgMusicTime', bgMusic.currentTime);
        }
    }, 500);

    // --- Save position right before navigating away ---
    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('bgMusicTime', bgMusic.currentTime);
        // Mark that music was playing so next page auto-resumes
        sessionStorage.setItem('bgMusicPlaying', bgMusic.paused ? '0' : '1');
    });

    // --- Helper: safely play (handles promise rejection) ---
    function safePlay() {
        var p = bgMusic.play();
        if (p !== undefined) {
            p.catch(function () { /* browser blocked — handled below */ });
        }
    }

    // --- Attempt autoplay if music was previously playing or first visit ---
    var wasPlaying = sessionStorage.getItem('bgMusicPlaying');
    if (wasPlaying === null || wasPlaying === '1') {
        // First visit or was playing before navigation
        var playAttempt = bgMusic.play();
        if (playAttempt !== undefined) {
            playAttempt.catch(function () {
                // Autoplay blocked — start on first user interaction
                function startMusic() {
                    safePlay();
                    sessionStorage.setItem('bgMusicPlaying', '1');
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                }
                document.addEventListener('click', startMusic);
                document.addEventListener('keydown', startMusic);
            });
        }
    }

    // --- Guard: re-play if tab loses/regains focus or double-click pauses ---
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden && sessionStorage.getItem('bgMusicPlaying') === '1') {
            safePlay();
        }
    });

    window.addEventListener('focus', function () {
        if (sessionStorage.getItem('bgMusicPlaying') === '1' && bgMusic.paused) {
            safePlay();
        }
    });

    // ==========================================================
    // [UPDATE] Persistent Background Music — survives page navigation
    //
    // Problem: navigating to a new page destroys the Audio object,
    //          and double-clicking could pause/interrupt playback.
    //
    // Solution:
    //  1. Save the current playback time to sessionStorage every
    //     500 ms and on beforeunload so the next page can resume.
    //  2. On load, read the saved time and seek to it before playing.
    //  3. Guard against double-click / visibility-change pauses by
    //     re-triggering play whenever the tab regains focus.
    // ==========================================================

    var bgMusic = new Audio('ringtone/sitemusic.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    // --- Restore previous playback position (cross-page resume) ---
    var savedTime = parseFloat(sessionStorage.getItem('bgMusicTime'));
    if (!isNaN(savedTime) && savedTime > 0) {
        bgMusic.currentTime = savedTime;
    }

    // --- Periodically save playback position ---
    setInterval(function () {
        if (!bgMusic.paused) {
            sessionStorage.setItem('bgMusicTime', bgMusic.currentTime);
        }
    }, 500);

    // --- Save position right before navigating away ---
    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('bgMusicTime', bgMusic.currentTime);
        // Mark that music was playing so next page auto-resumes
        sessionStorage.setItem('bgMusicPlaying', bgMusic.paused ? '0' : '1');
    });

    // --- Helper: safely play (handles promise rejection) ---
    function safePlay() {
        var p = bgMusic.play();
        if (p !== undefined) {
            p.catch(function () { /* browser blocked — handled below */ });
        }
    }

    // --- Attempt autoplay if music was previously playing or first visit ---
    var wasPlaying = sessionStorage.getItem('bgMusicPlaying');
    if (wasPlaying === null || wasPlaying === '1') {
        // First visit or was playing before navigation
        var playAttempt = bgMusic.play();
        if (playAttempt !== undefined) {
            playAttempt.catch(function () {
                // Autoplay blocked — start on first user interaction
                function startMusic() {
                    safePlay();
                    sessionStorage.setItem('bgMusicPlaying', '1');
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                }
                document.addEventListener('click', startMusic);
                document.addEventListener('keydown', startMusic);
            });
        }
    }

    // --- Guard: re-play if tab loses/regains focus or double-click pauses ---
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden && sessionStorage.getItem('bgMusicPlaying') === '1') {
            safePlay();
        }
    });

    window.addEventListener('focus', function () {
        if (sessionStorage.getItem('bgMusicPlaying') === '1' && bgMusic.paused) {
            safePlay();
        }
    });

    // ==========================================================
    // [UPDATE] Music Toggle Button — mute / unmute via header icon
    //
    // Swaps between volume-on and volume-off SVGs.
    // Persists the muted state in sessionStorage so it survives
    // page navigation. The click event stops propagation so it
    // doesn't accidentally trigger the "start on first click"
    // fallback or any other click listeners.
    // ==========================================================
    var musicToggle = document.getElementById('music-toggle');

    // Helper to sync the icon with the current state
    function updateMusicIcon() {
        if (!musicToggle) return;
        var onIcon = musicToggle.querySelector('.music-on-icon');
        var offIcon = musicToggle.querySelector('.music-off-icon');
        if (sessionStorage.getItem('bgMusicPlaying') === '0') {
            // Music is muted
            if (onIcon) onIcon.style.display = 'none';
            if (offIcon) offIcon.style.display = '';
        } else {
            // Music is playing
            if (onIcon) onIcon.style.display = '';
            if (offIcon) offIcon.style.display = 'none';
        }
    }

    // Set initial icon state on page load
    updateMusicIcon();

    if (musicToggle) {
        musicToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); // don't trigger "start music on click"

            if (bgMusic.paused) {
                // Currently muted → play
                safePlay();
                sessionStorage.setItem('bgMusicPlaying', '1');
            } else {
                // Currently playing → mute
                bgMusic.pause();
                sessionStorage.setItem('bgMusicPlaying', '0');
            }
            updateMusicIcon();
        });
    }
})();
