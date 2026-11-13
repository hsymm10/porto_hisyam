/**
 * 93 Printing - Main Script
 * Precise Scroll Detection & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animations
    AOS.init({
        duration: 400,
        easing: 'ease-out',
        once: true,
        offset: 50
    });

    // Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], header[id]');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Toggle Mobile Menu
    if (navToggle && navMenu) {
        const toggleMenu = (isOpen) => {
            navToggle.classList.toggle('active', isOpen);
            navMenu.classList.toggle('active', isOpen);
            if (isOpen) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        };

        navToggle.addEventListener('click', () => {
            const isOpen = !navMenu.classList.contains('active');
            toggleMenu(isOpen);
        });

        // Close menu when a link is clicked (including brand)
        const closeableLinks = document.querySelectorAll('.nav-links a, .nav-brand');
        closeableLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
    }

    // 2. Navbar & Scroll Spy Consolidation
    const updateNavbar = () => {
        const scrollPos = window.scrollY;
        
        // Sticky Background Effect
        if (navbar) {
            if (scrollPos > 50 || window.location.pathname.includes('product-detail.html')) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll Spy - Manual Calculation for 100% Accuracy
        if (sections.length > 0 && !window.location.pathname.includes('product-detail.html')) {
            let currentId = "";
            const viewportHeight = window.innerHeight;
            const triggerPoint = viewportHeight / 3; // Focus on the top 1/3 of the screen

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // If section top has passed the trigger point
                if (rect.top <= triggerPoint) {
                    currentId = section.getAttribute('id');
                }
            });

            // Global Clean & Single Set
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (currentId && (href === '#' + currentId || href.endsWith('#' + currentId))) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', updateNavbar);
    window.addEventListener('load', updateNavbar);
    updateNavbar();

    // 3. Sub-page Navbar Force State
    if (window.location.pathname.includes('product-detail.html')) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes('products')) {
                link.classList.add('active');
            }
        });
    }

    // 4. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const navEntries = performance.getEntriesByType('navigation');
        const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
        const hasShownBefore = sessionStorage.getItem('preloaderShown');

        if (hasShownBefore && !isReload) {
            preloader.style.display = 'none';
        } else {
            window.scrollTo(0, 0);
            sessionStorage.setItem('preloaderShown', 'true');
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => preloader.style.display = 'none', 1000);
            }, 4000);
        }
    }

    // 5. Glow & Utilities (Unchanged but cleanup)
    const setupGlow = (containerSelect, glowId, wrapSelect) => {
        const c = document.querySelector(containerSelect);
        const g = document.getElementById(glowId);
        const w = document.querySelector(wrapSelect);
        if (c && g && w) {
            const move = (e) => {
                const r = w.getBoundingClientRect();
                const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - r.left;
                const y = (e.type.includes('touch') ? e.touches[0].clientY : e.clientY) - r.top;
                g.style.left = `${x}px`; g.style.top = `${y}px`; g.style.opacity = '1';
            };
            const leave = () => { g.style.left = '50%'; g.style.top = '50%'; g.style.opacity = '0.6'; };
            c.addEventListener('mousemove', move);
            c.addEventListener('touchstart', move, {passive:true});
            c.addEventListener('touchmove', move, {passive:true});
            c.addEventListener('mouseleave', leave);
            c.addEventListener('touchend', leave);
        }
    };
    setupGlow('.hero', 'logo-glow', '.hero-logo-wrapper');
    setupGlow('#preloader', 'preloader-glow', '.preloader-logo-wrapper');

    // 6. Zoom & Image Handling - Detective Case Style
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const magnifier = document.getElementById('magnifier');
    const zoomWrapper = document.getElementById('zoom-img-wrapper');

    if (modal && modalImg && magnifier && zoomWrapper) {
        window.openZoom = (src, title, desc) => {
            modal.style.display = 'flex';
            modalImg.src = src;
            document.getElementById('zoom-title').innerText = title || "93 Printing";
            document.getElementById('zoom-desc').innerText = desc || "Kualitas premium.";
            
            // Set magnifier background image immediately
            magnifier.style.backgroundImage = `url('${src}')`;
            
            document.body.style.overflow = 'hidden';
        };

        const moveMagnifier = (e) => {
            e.preventDefault();
            const rect = modalImg.getBoundingClientRect();
            
            // Use current image dimensions for magnification math
            const zoom = 2.5;
            const posX = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
            const posY = (e.type.includes('touch') ? e.touches[0].clientY : e.clientY) - rect.top;

            // Constrain within image
            if (posX < 0 || posX > rect.width || posY < 0 || posY > rect.height) {
                magnifier.style.display = 'none';
                return;
            }

            magnifier.style.display = 'block';
            
            // Adjust magnifier background size dynamically
            magnifier.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            
            // Magnifier circle position (center on cursor)
            const magWidth = magnifier.offsetWidth / 2;
            const magHeight = magnifier.offsetHeight / 2;
            magnifier.style.left = `${posX - magWidth}px`;
            magnifier.style.top = `${posY - magHeight}px`;

            // Background offset
            magnifier.style.backgroundPosition = `-${posX * zoom - magWidth}px -${posY * zoom - magHeight}px`;
        };

        zoomWrapper.addEventListener('mousemove', moveMagnifier);
        zoomWrapper.addEventListener('touchmove', moveMagnifier, { passive: false });
        
        // Hide magnifier when not hovering over the image
        zoomWrapper.addEventListener('mouseleave', () => magnifier.style.display = 'none');
        zoomWrapper.addEventListener('touchend', () => magnifier.style.display = 'none');

        const close = () => { 
            modal.style.display = 'none'; 
            magnifier.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        };
        
        document.querySelector('.close-zoom')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if(e.target===modal) close(); });
    }

    // Global image click listener
    document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG') return;
        const card = e.target.closest('.product-card, .sub-card');
        if (card) {
            window.openZoom(e.target.src, card.querySelector('h3, h4').innerText, card.querySelector('p')?.innerText);
        }
    });
});
