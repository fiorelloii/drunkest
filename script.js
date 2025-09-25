// Draft Table Local Storage Persistence
document.addEventListener('DOMContentLoaded', function () {
    const draftTable = document.querySelector('.draft-table');
    if (!draftTable) return;

    // Identificatore unico per la tabella (puoi cambiarlo se hai più tabelle)
    const STORAGE_KEY = 'drunkest_draft_table';

    // Carica i dati salvati
    function loadDraftTable() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        try {
            const data = JSON.parse(saved);
            const rows = draftTable.querySelectorAll('tbody tr');
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                for (let j = 0; j < cells.length; j++) {
                    if (data[i] && typeof data[i][j] !== 'undefined') {
                        cells[j].textContent = data[i][j];
                    }
                }
            }
        } catch (e) {
            // ignore
        }
    }

    // Salva i dati
    function saveDraftTable() {
        const rows = draftTable.querySelectorAll('tbody tr');
        const data = [];
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            data[i] = [];
            for (let j = 0; j < cells.length; j++) {
                data[i][j] = cells[j].textContent;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // Eventi su tutte le celle
    draftTable.querySelectorAll('tbody td').forEach(cell => {
        cell.addEventListener('input', saveDraftTable);
    });

    // Carica i dati all'avvio
    loadDraftTable();

 // Carousel functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Smooth scrolling and animation on scroll
    const sections = document.querySelectorAll('.section-content');
    const navbar = document.querySelector('.navbar');
});

function showSlide(index) {
    const container = document.getElementById('carouselContainer');
    container.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Section switching functionality
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.main-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionName).classList.add('active');

    // Update nav active state
    document.querySelectorAll('.main-nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Document ready functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const sections = document.querySelectorAll('.section-content');
    const subNavLinks = document.querySelectorAll('.sub-nav-links a');
    const rulesSections = document.querySelectorAll('.rule-section');

    // Initial animation for first section
    if (sections[0]) {
        sections[0].classList.add('animate');
    }

    // Intersection Observer for scroll animations in regolamento
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the content
                const content = entry.target.querySelector('.section-content');
                if (content) {
                    content.classList.add('animate');
                }

                // Update active sub nav link
                const sectionId = entry.target.id;
                subNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all rule sections
    rulesSections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for sub-navigation links
    subNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Handle navbar blur on scroll
    const mainNavbar = document.querySelector('.main-navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove blur effect based on scroll position
        if (currentScrollY > 50) {
            mainNavbar.style.background = 'rgba(255, 255, 255, 0.9)';
            mainNavbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            mainNavbar.style.background = 'rgba(255, 255, 255, 0.95)';
            mainNavbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle (for future mobile implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.main-nav-links');
            navLinks.classList.toggle('mobile-active');
        });
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Animation utilities
function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let start = performance.now();

    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = elapsed / duration;

        if (progress > 1) progress = 1;

        element.style.opacity = progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function slideUp(element, duration = 300) {
    element.style.transformOrigin = 'top';
    element.style.transform = 'translateY(50px)';
    element.style.opacity = '0';

    setTimeout(() => {
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 10);
}

// Utility function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
