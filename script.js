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
        const aboutTitle = document.querySelector('.about .section-title');
        const aboutTextColumn = document.querySelector('.about-text-column');
        const aboutVisualColumn = document.querySelector('.about-visual-column');
        
        if (aboutSection) {
            aboutSection.classList.add('fade-in');
            observer.observe(aboutSection);
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
    
    // Watch haptic rhythm animation (works on all devices)
    const watchBody = document.querySelector('.watch-body');
    const watchContainer = document.querySelector('.watch-container');
    const watchVisual = document.querySelector('.watch-visual');
    const hapticDots = document.querySelectorAll('.haptic-dot');
    let hapticInterval;
    let dotIndex = 0;
    
    function triggerHapticFeedback() {
        if (!watchBody || !watchContainer || !watchVisual) return;
        
        // Vibrate the watch body
        watchBody.classList.remove('vibrating');
        void watchBody.offsetWidth; // Force reflow
        watchBody.classList.add('vibrating');
        
        // Add haptic arc effects to container
        watchContainer.classList.remove('vibrating');
        void watchContainer.offsetWidth; // Force reflow
        watchContainer.classList.add('vibrating');
        
        // Add haptic arc effects to visual
        watchVisual.classList.remove('vibrating');
        void watchVisual.offsetWidth; // Force reflow
        watchVisual.classList.add('vibrating');
        
        // Animate haptic dots in sequence
        if (hapticDots.length > 0) {
            const currentDot = hapticDots[dotIndex];
            if (currentDot) {
                currentDot.classList.remove('pulsing');
                void currentDot.offsetWidth; // Force reflow
                currentDot.classList.add('pulsing');
                
                // Remove the pulsing class after animation completes
                setTimeout(() => {
                    currentDot.classList.remove('pulsing');
                }, 500);
            }
            
            // Move to next dot in sequence
            dotIndex = (dotIndex + 1) % hapticDots.length;
        }
        
        // Remove vibrating classes after animations
        setTimeout(() => {
            watchBody.classList.remove('vibrating');
            watchContainer.classList.remove('vibrating');
            watchVisual.classList.remove('vibrating');
        }, 600);
    }
    
    function startHapticRhythm() {
        if (hapticInterval) return; // Already running
        
        // Start with immediate feedback
        triggerHapticFeedback();
        
        // Then continue with rhythm
        hapticInterval = setInterval(() => {
            triggerHapticFeedback();
        }, 2800);
    }
    
    function stopHapticRhythm() {
        if (hapticInterval) {
            clearInterval(hapticInterval);
            hapticInterval = null;
        }
        // Reset dot index
        dotIndex = 0;
    }
    
    function handleScroll() {
        const aboutSection = document.querySelector('.about');
        
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView && !hapticInterval) {
            startHapticRhythm();
        } else if (!isInView && hapticInterval) {
            stopHapticRhythm();
        }
    }
    
    // Add scroll listener for haptic feedback (works on all devices unless reduced motion)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', handleScroll);
        
        // Initial check
        handleScroll();
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

    // Track scroll depth (only on desktop)
    if (!isMobile) {
        let maxScrollDepth = 0;
        window.addEventListener('scroll', function() {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
                    trackEvent('scroll_depth', { depth: '25%' });
                } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
                    trackEvent('scroll_depth', { depth: '50%' });
                } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
                    trackEvent('scroll_depth', { depth: '75%' });
                } else if (maxScrollDepth >= 100) {
                    trackEvent('scroll_depth', { depth: '100%' });
                }
            }
        });
    }
});

// Add CSS for animation classes
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Ensure elements are visible by default on desktop */
    @media (min-width: 769px) {
        .step, .about, section {
            opacity: 1;
            transform: none;
        }
        
        .step.fade-in, .about.fade-in, section.fade-in {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .step.fade-in.animate-in, .about.fade-in.animate-in, section.fade-in.animate-in {
            opacity: 1;
            transform: translateY(0);
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