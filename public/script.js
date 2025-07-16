// Disable scroll position restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top on page load
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top
    window.scrollTo(0, 0);

    // Detect mobile
    const isMobile = window.innerWidth <= 768;

    // Desktop-only scroll arrow functionality
    if (!isMobile) {
        const scrollArrow = document.getElementById('scrollArrow');
        if (scrollArrow) {
            scrollArrow.addEventListener('click', function() {
                // Smooth scroll to about section
                const aboutSection = document.querySelector('.about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Hide the arrow after first click
                setTimeout(() => {
                    scrollArrow.style.opacity = '0';
                    scrollArrow.style.pointerEvents = 'none';
                }, 500);
            });
        }
    }

    // Intersection Observer for fade-in animations (only on desktop)
    if (!isMobile) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });

        // Add stagger animation to steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
            step.classList.add('fade-in');
            observer.observe(step);
        });

        // Animate device mockups
        const deviceMockups = document.querySelectorAll('.phone-mockup, .watch-mockup');
        deviceMockups.forEach((mockup, index) => {
            mockup.style.animationDelay = `${index * 0.3}s`;
            mockup.classList.add('fade-in');
            observer.observe(mockup);
        });

        // Add fade-in animation to about section elements
        const aboutSection = document.querySelector('.about');
        const sectionIntro = document.querySelector('.section-intro');
        const aboutTitle = document.querySelector('.section-intro .section-title');
        const aboutTextColumn = document.querySelector('.about-text-column');
        const aboutVisualColumn = document.querySelector('.about-visual-column');

        if (aboutSection) {
            aboutSection.classList.add('fade-in');
            observer.observe(aboutSection);
        }

        if (sectionIntro) {
            sectionIntro.classList.add('fade-in');
            observer.observe(sectionIntro);
        }

        if (aboutTitle) {
            aboutTitle.classList.add('fade-in');
            observer.observe(aboutTitle);
        }

        if (aboutTextColumn) {
            aboutTextColumn.classList.add('fade-in');
            observer.observe(aboutTextColumn);
        }

        if (aboutVisualColumn) {
            aboutVisualColumn.style.animationDelay = '0.3s';
            aboutVisualColumn.classList.add('fade-in');
            observer.observe(aboutVisualColumn);
        }

        // Add fade-in animation to footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.classList.add('fade-in');
            observer.observe(footer);
        }
    }


    // Create a watch animation class that can be triggered anywhere
    class WatchAnimation {
        constructor() {
            // On desktop, only target the visible watch (not mobile-inline)
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // On mobile, target mobile-inline watch
                this.watchBodies = document.querySelectorAll('.watch-visual.mobile-inline .watch-body');
                this.watchContainers = document.querySelectorAll('.watch-visual.mobile-inline .watch-container');
                this.watchVisuals = document.querySelectorAll('.watch-visual.mobile-inline');
                this.hapticDots = document.querySelectorAll('.watch-visual.mobile-inline .haptic-dot');
            } else {
                // On desktop, target the about-visual-column watch (not mobile-inline)
                this.watchBodies = document.querySelectorAll('.about-visual-column .watch-body');
                this.watchContainers = document.querySelectorAll('.about-visual-column .watch-container');
                this.watchVisuals = document.querySelectorAll('.about-visual-column .watch-visual');
                this.hapticDots = document.querySelectorAll('.about-visual-column .haptic-dot');
            }
            
            this.isRunning = false;
            this.interval = null;
            this.dotIndex = 0;
            
            // Debug logging
            console.log('WatchAnimation initialized:', {
                isMobile: isMobile,
                watchBodies: this.watchBodies.length,
                watchContainers: this.watchContainers.length,
                watchVisuals: this.watchVisuals.length,
                hapticDots: this.hapticDots.length,
                selector: isMobile ? '.mobile-inline' : '.about-visual-column'
            });
        }

        triggerSinglePulse() {
            if (this.watchBodies.length === 0 || this.watchContainers.length === 0 || this.watchVisuals.length === 0) return;

            console.log('Triggering watch pulse...');

            // Vibrate all watch bodies
            this.watchBodies.forEach(watchBody => {
                watchBody.classList.remove('vibrating');
                void watchBody.offsetWidth; // Force reflow
                watchBody.classList.add('vibrating');
            });

            // Add haptic arc effects to all containers
            this.watchContainers.forEach(watchContainer => {
                watchContainer.classList.remove('vibrating');
                void watchContainer.offsetWidth;
                watchContainer.classList.add('vibrating');
            });

            // Add haptic arc effects to all visuals
            this.watchVisuals.forEach(watchVisual => {
                watchVisual.classList.remove('vibrating');
                void watchVisual.offsetWidth;
                watchVisual.classList.add('vibrating');
            });

            // Animate haptic dots
            if (this.hapticDots.length > 0) {
                const currentDot = this.hapticDots[this.dotIndex];
                if (currentDot) {
                    currentDot.classList.remove('pulsing');
                    void currentDot.offsetWidth;
                    currentDot.classList.add('pulsing');
                }
                this.dotIndex = (this.dotIndex + 1) % 5;
            }

            // Clean up classes
            setTimeout(() => {
                this.watchBodies.forEach(watchBody => {
                    watchBody.classList.remove('vibrating');
                });
                this.watchContainers.forEach(watchContainer => {
                    watchContainer.classList.remove('vibrating');
                });
                this.watchVisuals.forEach(watchVisual => {
                    watchVisual.classList.remove('vibrating');
                });
            }, 600);
        }

        start() {
            if (this.isRunning) return;
            console.log('Starting continuous watch animation...');
            this.isRunning = true;
            this.triggerSinglePulse();
            this.interval = setInterval(() => {
                this.triggerSinglePulse();
            }, 2800);
        }

        stop() {
            if (!this.isRunning) return;
            console.log('Stopping watch animation...');
            this.isRunning = false;
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.dotIndex = 0;
        }
    }

    // Create global watch animation instance
    window.watchAnimation = new WatchAnimation();

    // Add scroll listener for haptic feedback (works on all devices unless reduced motion)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Simple intersection observer for the about section
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        window.watchAnimation.start();
                    } else {
                        window.watchAnimation.stop();
                    }
                });
            }, {
                threshold: 0.3 // Trigger when 30% of the section is visible
            });

            observer.observe(aboutSection);
        }
    }

    // TestFlight button interaction
    const testflightBtn = document.getElementById('testflightBtn');
    if (testflightBtn) {
        testflightBtn.addEventListener('click', function() {
            const testflightUrl = 'https://testflight.apple.com/join/b38c4w2Q';

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Open TestFlight link
            window.open(testflightUrl, '_blank');
        });

        // Add hover effect enhancement
        testflightBtn.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });

        testflightBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }

    // Add pulse effect to emoji icons
    const stepIcons = document.querySelectorAll('.step-icon');
    stepIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'scale(1.2)';
                this.style.transition = 'transform 0.3s ease';
            }
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Simple analytics tracking
    function trackEvent(eventName, properties = {}) {
        console.log('Analytics event:', eventName, properties);
    }

    // Track page load
    trackEvent('page_view', {
        page: 'landing',
        timestamp: new Date().toISOString()
    });

    // Email form submission
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value;

            const button = this.querySelector('.email-button');
            const originalText = button.textContent;
            button.textContent = 'Joining...';
            button.disabled = true;

            try {
                const isLocalFile = window.location.protocol === 'file:';

                if (isLocalFile) {
                    console.log('Local development mode - email would be saved:', email);
                    throw new Error('Please run `npm start` to enable email signup');
                }

                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                });

                const result = await response.json();

                if (result.success) {
                    button.textContent = 'Joined! ✓';
                    button.style.background = '#4CAF50';
                    button.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.4)';
                    emailInput.value = '';
                    trackEvent('email_signup', { email: email, status: 'success' });
                } else {
                    button.textContent = result.message || 'Error occurred';
                    button.style.background = '#ff6b6b';
                    button.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
                    trackEvent('email_signup', { email: email, status: 'error', error: result.message });
                }

            } catch (error) {
                console.error('Signup error:', error);
                const isLocalFile = window.location.protocol === 'file:';

                if (isLocalFile) {
                    button.textContent = 'Run server to signup';
                    button.style.background = '#FF3BCE';
                    button.style.boxShadow = '0 4px 15px rgba(255, 59, 206, 0.4)';
                } else {
                    button.textContent = 'Network error';
                    button.style.background = '#ff6b6b';
                    button.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
                }

                trackEvent('email_signup', { email: email, status: 'error', error: isLocalFile ? 'local_file' : 'network_error' });
            }

            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.boxShadow = '';
                button.disabled = false;
            }, 3000);
        });
    }

    // Track CTA clicks
    if (testflightBtn) {
        testflightBtn.addEventListener('click', function() {
            trackEvent('cta_click', {
                button: 'testflight_beta',
                location: 'main_cta'
            });
        });
    }


    // Phone carousel functionality (mobile only)
    if (isMobile) {
        const carousel = document.getElementById('phoneCarousel');
        const dots = document.querySelectorAll('.dot');
        const phones = document.querySelectorAll('.phone-mockup');

        if (carousel && dots.length > 0) {
            let currentSlide = 1;

            // Function to update active dot and phone with smooth scaling
            function updateActiveStates() {
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
                
                phones.forEach((phone, index) => {
                    const isActive = index === currentSlide;
                    phone.classList.toggle('active', isActive);
                    
                    // Calculate target scale and opacity based on distance from active
                    const distance = Math.abs(index - currentSlide);
                    let targetScale, targetOpacity;
                    
                    if (distance === 0) {
                        targetScale = 1;
                        targetOpacity = 1;
                    } else if (distance === 1) {
                        targetScale = 0.85;
                        targetOpacity = 0.7;
                    } else {
                        targetScale = 0.7;
                        targetOpacity = 0.5;
                    }
                    
                    // Animate to target scale and opacity
                    animatePhone(phone, targetScale, targetOpacity);
                    
                    // Show/hide device caption for active phone
                    const caption = phone.querySelector('.device-caption');
                    if (caption) {
                        caption.style.opacity = isActive ? '1' : '0';
                    }
                });
            }
            
            // Smooth animation function for phones
            function animatePhone(phone, targetScale, targetOpacity) {
                const duration = 500; // 0.5 seconds
                const startTime = performance.now();
                
                // Get current values - handle special case for second phone
                const isSecondPhone = phone === phones[1];
                let currentScale;
                
                if (isSecondPhone) {
                    // For second phone, get scale from CSS variable
                    const cssScale = getComputedStyle(phone).getPropertyValue('--phone-scale');
                    currentScale = parseFloat(cssScale || 0.9);
                } else {
                    // For other phones, get scale from transform
                    const currentTransform = phone.style.transform;
                    currentScale = currentTransform ? parseFloat(currentTransform.match(/scale\(([^)]+)\)/)?.[1] || 1) : 1;
                }
                
                const currentOpacity = parseFloat(phone.style.opacity || 1);
                
                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    // Interpolate values
                    const scale = currentScale + (targetScale - currentScale) * easeOut;
                    const opacity = currentOpacity + (targetOpacity - currentOpacity) * easeOut;
                    
                    // Apply values - handle special case for second phone (nth-child(2))
                    const isSecondPhone = phone === phones[1]; // Index 1 = second phone
                    if (isSecondPhone) {
                        phone.style.setProperty('--phone-scale', scale);
                    } else {
                        phone.style.transform = `scale(${scale})`;
                    }
                    phone.style.opacity = opacity;
                    
                    // Continue animation if not complete
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }
                
                requestAnimationFrame(animate);
            }

            // Function to scroll to specific slide
            function scrollToSlide(slideIndex) {
                const phoneWidth = 200;
                carousel.scrollTo({
                    left: slideIndex * phoneWidth,
                    behavior: 'smooth'
                });
                currentSlide = slideIndex;
                updateActiveStates();
            }

            // Initialize first phone as active
            updateActiveStates();
            scrollToSlide(1);

            // Dot click handlers
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    scrollToSlide(index);
                });
            });

            // Phone click handlers - tap on phone to scroll to it
            phones.forEach((phone, index) => {
                phone.addEventListener('click', () => {
                    console.log('Phone clicked:', index, 'current:', currentSlide);
                    scrollToSlide(index);
                    // Force update even if same slide
                    updateActiveStates();
                });
            });

            // Scroll detection to update dots
            let scrollTimeout;
            carousel.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const phoneWidth = 200;
                    const scrollLeft = carousel.scrollLeft;
                    const newSlide = Math.round(scrollLeft / phoneWidth);

                    if (newSlide !== currentSlide && newSlide >= 0 && newSlide < dots.length) {
                        currentSlide = newSlide;
                        updateActiveStates();
                    }
                }, 100);
            });

            // Touch/swipe support
            let startX, startY, distX, distY;
            let isScrolling;

            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isScrolling = undefined;
            });

            carousel.addEventListener('touchmove', (e) => {
                if (e.touches.length > 1) return;

                distX = e.touches[0].clientX - startX;
                distY = e.touches[0].clientY - startY;

                if (typeof isScrolling === 'undefined') {
                    isScrolling = Math.abs(distY) > Math.abs(distX);
                }

                if (!isScrolling) {
                    e.preventDefault();
                }
            });

            carousel.addEventListener('touchend', () => {
                if (!isScrolling && Math.abs(distX) > 50) {
                    if (distX > 0 && currentSlide > 0) {
                        scrollToSlide(currentSlide - 1);
                    } else if (distX < 0 && currentSlide < dots.length - 1) {
                        scrollToSlide(currentSlide + 1);
                    }
                }
            });
        }
    }
});

// Add CSS for animation classes
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transition: opacity 0.6s ease;
    }

    .fade-in.animate-in {
        opacity: 1;
    }

    /* Ensure elements are visible by default on desktop */
    @media (min-width: 769px) {
        .step, .about, section {
            opacity: 1;
        }

        .step.fade-in, .about.fade-in, section.fade-in {
            opacity: 0;
        }

        .step.fade-in.animate-in, .about.fade-in.animate-in, section.fade-in.animate-in {
            opacity: 1;
        }
    }

    .step.fade-in {
        animation-fill-mode: both;
    }

    @media (prefers-reduced-motion: reduce) {
        .fade-in {
            opacity: 1;
            transform: none;
            transition: none;
        }

        .watch-body.vibrating {
            animation: none;
        }

        .haptic-dot.pulsing {
            animation: none;
        }

        .watch-container.vibrating .haptic-arc-small,
        .watch-container.vibrating .haptic-arc-large {
            animation: none;
        }
    }

    /* Disable fade animations on mobile devices */
    @media (max-width: 768px) {
        .fade-in {
            opacity: 1;
            transform: none;
            transition: none;
        }

        .fade-in.animate-in {
            opacity: 1;
            transform: none;
        }
    }
`;
document.head.appendChild(style);
