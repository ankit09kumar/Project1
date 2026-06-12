/**
 * JavaScript Functionality - Industrial Training Kit
 * Implements: Mobile Nav, Slider, Lightbox Gallery, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation & Header Scroll State
    initNavigation();

    // 2. Image Slider (Home Page Only)
    initSlider();

    // 3. Gallery Lightbox (Gallery Page Only)
    initLightbox();

    // 4. Contact Form Validation (Contact Page Only)
    initFormValidation();
});

/**
 * Mobile Navigation Menu & Sticky Header Effect
 */
function initNavigation() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header transition on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle Mobile Menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent body scroll when nav is open on mobile
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close Mobile Menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Image Slider Carousel
 */
function initSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!sliderWrapper || slides.length === 0) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // Create Navigation Dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Go to a specific slide
    function goToSlide(index) {
        currentSlide = index;
        // Bound checks
        if (currentSlide < 0) currentSlide = slideCount - 1;
        if (currentSlide >= slideCount) currentSlide = 0;

        // Slide transition
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });

        // Reset Autoplay
        resetAutoplay();
    }

    // Next Slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Prev Slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Setup Buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard controls
    sliderWrapper.parentElement.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Autoplay
    function startAutoplay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause Autoplay on Hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize Autoplay
    startAutoplay();
}

/**
 * Gallery Image Lightbox Overlay
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');

    if (!lightbox || galleryItems.length === 0) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Build array of image details for navigation
    const images = Array.from(galleryItems).map((item, index) => {
        const img = item.querySelector('img');
        return {
            index: index,
            src: img.getAttribute('src'),
            title: item.querySelector('h3').textContent,
            desc: item.querySelector('p').textContent
        };
    });

    let currentImgIdx = 0;

    // Open Lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImgIdx = index;
            updateLightboxContent();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        });
    });

    // Update Lightbox Display
    function updateLightboxContent() {
        const item = images[currentImgIdx];
        if (lightboxImg && item) {
            lightboxImg.setAttribute('src', item.src);
            lightboxImg.setAttribute('alt', item.title);
            if (lightboxCaption) {
                lightboxCaption.innerHTML = `<strong>${item.title}</strong> - ${item.desc}`;
            }
        }
    }

    // Lightbox Navigation Functions
    function showNextImg() {
        currentImgIdx++;
        if (currentImgIdx >= images.length) currentImgIdx = 0;
        updateLightboxContent();
    }

    function showPrevImg() {
        currentImgIdx--;
        if (currentImgIdx < 0) currentImgIdx = images.length - 1;
        updateLightboxContent();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    }

    // Attach Event Listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNextImg);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImg);

    // Click backdrop to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImg();
        if (e.key === 'ArrowLeft') showPrevImg();
    });
}

/**
 * Contact Form Validation with real-time feedback & Success Toast
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const toast = document.getElementById('toast');

    // Validation Rules
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;

    // Inputs array for easy loop
    const formFields = [
        { input: nameInput, validator: validateName },
        { input: emailInput, validator: validateEmail },
        { input: phoneInput, validator: validatePhone },
        { input: messageInput, validator: validateMessage }
    ];

    // Form Submit Event
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate all fields
        formFields.forEach(field => {
            if (!field.validator()) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission success
            showSuccessToast();
            contactForm.reset();
            
            // Clear visual error styles
            formFields.forEach(field => {
                const group = field.input.closest('.form-group');
                group.classList.remove('error');
            });
        }
    });

    // Bind real-time input & blur events
    formFields.forEach(field => {
        field.input.addEventListener('input', () => {
            // Remove error immediately when typing valid info
            field.validator(true);
        });

        field.input.addEventListener('blur', () => {
            // Perform full validation on blur
            field.validator();
        });
    });

    // Individual Validation Logic
    function validateName(typingOnly = false) {
        const val = nameInput.value.trim();
        const isValid = nameRegex.test(val);
        return toggleError(nameInput, isValid, 'Please enter a valid name (at least 3 alphabetic characters)', typingOnly);
    }

    function validateEmail(typingOnly = false) {
        const val = emailInput.value.trim();
        const isValid = emailRegex.test(val);
        return toggleError(emailInput, isValid, 'Please enter a valid email address (e.g. name@domain.com)', typingOnly);
    }

    function validatePhone(typingOnly = false) {
        const val = phoneInput.value.trim();
        const isValid = val === '' || phoneRegex.test(val); // Optional or must be format
        return toggleError(phoneInput, isValid, 'Please enter a valid phone number (10 to 15 digits)', typingOnly);
    }

    function validateMessage(typingOnly = false) {
        const val = messageInput.value.trim();
        const isValid = val.length >= 10;
        return toggleError(messageInput, isValid, 'Please write a descriptive message (minimum 10 characters)', typingOnly);
    }

    // Helper to toggle visual feedback classes
    function toggleError(input, isValid, message, typingOnly) {
        const group = input.closest('.form-group');
        const errorMsgSpan = group.querySelector('.error-message');

        if (isValid) {
            group.classList.remove('error');
            return true;
        } else {
            // If the user is just typing, we don't display errors immediately unless it was already showing
            if (!typingOnly || group.classList.contains('error')) {
                group.classList.add('error');
                if (errorMsgSpan) {
                    errorMsgSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> ${message}`;
                }
            }
            return false;
        }
    }

    // Display Success Toast
    function showSuccessToast() {
        if (!toast) return;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000); // Toast is visible for 5 seconds
    }
}
