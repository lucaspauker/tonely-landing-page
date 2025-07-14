// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior to any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
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

    // Add stagger animation to steps and device mockups
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
    
    // Watch haptic rhythm animation
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
        
        // Add haptic arc effects to container (primary arcs)
        watchContainer.classList.remove('vibrating');
        void watchContainer.offsetWidth; // Force reflow
        watchContainer.classList.add('vibrating');
        
        // Add haptic arc effects to visual (echo arcs)
        watchVisual.classList.remove('vibrating');
        void watchVisual.offsetWidth; // Force reflow
        watchVisual.classList.add('vibrating');
        
        // Animate haptic dots in sequence from left to right
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
            
            // Move to next dot in sequence (left to right, then wrap)
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
        }, 2800); // Consistent 2.8s rhythm for better visual
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
    
    // Add scroll listener for haptic feedback
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', handleScroll);
        
        // Initial check
        handleScroll();
    }

    // TestFlight button interaction
    const testflightBtn = document.getElementById('testflightBtn');
    if (testflightBtn) {
        testflightBtn.addEventListener('click', function() {
            // Add a placeholder URL - replace with actual TestFlight link
            const testflightUrl = 'https://testflight.apple.com/join/your-app-id';
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // For now, just show an alert (replace with actual TestFlight link)
            alert('TestFlight link will be added here when ready!');
            
            // Uncomment when you have the actual TestFlight link:
            // window.open(testflightUrl, '_blank');
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

    // Simple analytics tracking (placeholder)
    function trackEvent(eventName, properties = {}) {
        // Replace with your analytics implementation
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
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value;
            
            // Add visual feedback
            const button = this.querySelector('.email-button');
            const originalText = button.textContent;
            button.textContent = 'Joining...';
            button.disabled = true;
            
            // Simulate API call (replace with actual implementation)
            setTimeout(() => {
                button.textContent = 'Joined! ✓';
                button.style.background = '#B0FF92';
                button.style.boxShadow = '0 4px 15px rgba(176, 255, 146, 0.4)';
                emailInput.value = '';
                trackEvent('email_signup', { email: email });
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.style.boxShadow = '';
                    button.disabled = false;
                }, 2000);
            }, 1000);
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

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            
            // Track milestone scroll depths
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
`;
document.head.appendChild(style);