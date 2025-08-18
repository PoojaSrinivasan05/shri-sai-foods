// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Initialize other components
    if (document.querySelector('.hero-banner')) {
        initHeroSlider();
    }
    initScrollAnimations();
    initLightbox();
    initForms();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
let currentSlide = 0;
const slides = document.querySelectorAll('.custom-slide');
const dots = document.querySelectorAll('.custom-dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto Slide
setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 4000);

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 2000; // 5 seconds

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide
    setInterval(nextSlide, slideInterval);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Initialize first slide
    showSlide(0);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.food-card, .special-card, .highlight-card, .feature-card, .benefit-item, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);

    // Initially hide elements and observe them
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-image');
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

// Form handling
function initForms() {
    // Franchise form
    const franchiseForm = document.getElementById('franchiseForm');
    if (franchiseForm) {
        franchiseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Franchise inquiry submitted successfully! We will contact you soon.', 'success');
            franchiseForm.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add animation keyframes if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    // Food card hover effects
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Special card hover effects
    const specialCards = document.querySelectorAll('.special-card');
    specialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.special-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(transparent, rgba(76, 175, 80, 0.9))';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.special-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(transparent, rgba(0,0,0,0.8))';
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-banner');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.nav-logo, .slide-content');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add smooth hover transitions
const style = document.createElement('style');
style.textContent = `
    body.loaded .nav-logo,
    body.loaded .slide-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .food-card,
    .special-card,
    .highlight-card,
    .feature-card,
    .benefit-item {
        transition: all 0.3s ease;
    }
`;

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".slides img");
    let index = 0;

    function showNextImage() {
        // Hide all images
        images.forEach(img => img.classList.remove("active"));

        // Show current image
        images[index].classList.add("active");

        // Move to next index
        index = (index + 1) % images.length;
    }

    showNextImage(); // Show first image
    setInterval(showNextImage, 3000); // Change every 3 seconds
});

// New JavaScript for redesigned features

// View Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const listView = document.getElementById('tiffin-list');
    const gridView = document.getElementById('tiffin-grid');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update button states
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle views
            if (view === 'list') {
                listView.classList.add('active');
                gridView.classList.remove('active');
            } else {
                gridView.classList.add('active');
                listView.classList.remove('active');
            }
        });
    });
});

// Parallax Effect for Rice Section
window.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxBg.style.transform = `translateY(${rate}px)`;
    }
});

// Carousel Functionality
let currentCarouselIndex = 0;
const carouselTrack = document.querySelector('.carousel-track');
const carouselCards = document.querySelectorAll('.carousel-card');

function moveCarousel(direction) {
    if (!carouselTrack || !carouselCards.length) return;
    
    const cardWidth = carouselCards[0].offsetWidth + 30; // card width + gap
    const maxIndex = carouselCards.length - 3; // show 3 cards at once
    
    currentCarouselIndex += direction;
    
    if (currentCarouselIndex < 0) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex > maxIndex) {
        currentCarouselIndex = maxIndex;
    }
    
    const translateX = -currentCarouselIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

// Auto-scroll carousel
setInterval(() => {
    if (carouselCards && carouselCards.length > 3) {
        moveCarousel(1);
        if (currentCarouselIndex >= carouselCards.length - 3) {
            currentCarouselIndex = -1; // Reset to beginning
        }
    }
}, 4000);

// Enhanced scroll animations for new sections
function initEnhancedScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.rice-item, .carousel-card, .flip-card, .sweet-karam-card, ' +
        '.masonry-item, .timeline-item, .premium-card, .investment-card, ' +
        '.contact-info-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }, observerOptions);

    // Initially hide elements and observe them
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', initEnhancedScrollAnimations);

// Smooth hover effects for premium cards
document.addEventListener('DOMContentLoaded', function() {
    const premiumCards = document.querySelectorAll('.premium-card');
    
    premiumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
});

// Timeline animation on scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}

// Initialize timeline items as hidden
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateTimeline);