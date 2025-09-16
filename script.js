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

        // Regolamento sub-navigation and animations
        const sections = document.querySelectorAll('.section-content');
        const subNavLinks = document.querySelectorAll('.sub-nav-links a');

        // Initial animation for first section
        window.addEventListener('load', () => {
            if (sections[0]) {
                sections[0].classList.add('animate');
            }
        });

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
        },
