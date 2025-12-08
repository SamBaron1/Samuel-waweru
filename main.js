document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Close mobile menu when clicking a link (for mobile screens)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false; // This should trigger CSS changes automatically
            }
        });
    });

    // Optional: Reset menu if window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.checked = false;
        }
    });



    // Highlight active section in navbar
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing animation
    const typedTextSpan = document.getElementById('typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ["Web Developer", "Network Admin", "Graphics Designer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation if elements exist
    if (typedTextSpan && cursorSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

   
        // Tab functionality
        const tabToggles = document.querySelectorAll('.tab-toggle');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabToggles.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Image hover effect
        const photoFrame = document.querySelector('.photo-frame');
        if (photoFrame) {
            photoFrame.addEventListener('mouseenter', function() {
                this.querySelector('.photo-img').style.filter = 'grayscale(0%)';
                this.querySelector('.photo-border').style.opacity = '0.8';
            });
            
            photoFrame.addEventListener('mouseleave', function() {
                this.querySelector('.photo-img').style.filter = 'grayscale(20%)';
                this.querySelector('.photo-border').style.opacity = '0.5';
            });
        }
        
        // Smooth scrolling for buttons
        document.querySelectorAll('.btn-main, .btn-outline').forEach(button => {
            button.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });


    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    const animateServices = () => {
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (cardPosition < screenPosition) {
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                card.style.opacity = '0';
            }
        });
    };
    animateServices();
    window.addEventListener('scroll', animateServices);

    // Service buttons hover effect
    const serviceBtns = document.querySelectorAll('.service-btn');
    serviceBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(5px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'translateX(0)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Radial progress bars
    document.querySelectorAll(".path").forEach((el) => {
        const target = el.style.getPropertyValue("--target");
        el.style.strokeDashoffset = 440 - (440 * target) / 100;
    });

    // Slider functionality
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        let currentIndex = 0;
        const slideWidth = slides[0].offsetWidth + 20;
        const totalSlides = slides.length / 2;
        
        function cloneSlides() {
            const firstSlides = Array.from(slides).slice(0, totalSlides);
            firstSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                sliderTrack.appendChild(clone);
            });
        }
        
        cloneSlides();
        
        let autoSlide = setInterval(nextSlide, 3000);
        
        function nextSlide() {
            currentIndex++;
            if (currentIndex > totalSlides) {
                currentIndex = 1;
                sliderTrack.style.transition = 'none';
                sliderTrack.style.transform = `translateX(0)`;
                void sliderTrack.offsetWidth;
            }
            sliderTrack.style.transition = 'transform 0.5s ease';
            sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        
        function prevSlide() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
                sliderTrack.style.transition = 'none';
                sliderTrack.style.transform = `translateX(-${totalSlides * slideWidth}px)`;
                void sliderTrack.offsetWidth;
            }
            sliderTrack.style.transition = 'transform 0.5s ease';
            sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        
        nextBtn.addEventListener('click', function() {
            clearInterval(autoSlide);
            nextSlide();
            autoSlide = setInterval(nextSlide, 3000);
        });
        
        prevBtn.addEventListener('click', function() {
            clearInterval(autoSlide);
            prevSlide();
            autoSlide = setInterval(nextSlide, 3000);
        });
        
        sliderTrack.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        
        sliderTrack.addEventListener('mouseleave', function() {
            autoSlide = setInterval(nextSlide, 3000);
        });
        
        window.addEventListener('resize', function() {
            const newSlideWidth = document.querySelector('.slide').offsetWidth + 20;
            if (newSlideWidth !== slideWidth) {
                sliderTrack.style.transition = 'none';
                sliderTrack.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
            }
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>Send Message</span><i class="bx bx-paper-plane"></i>';
                submitBtn.style.backgroundColor = '#0ef';
            }, 2000);
        });
        
        // Floating label effect
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (input.value) {
                const label = group.querySelector('label');
                label.style.top = '-20px';
                label.style.fontSize = '0.8rem';
                label.style.color = '#0ef';
            }
            
            input.addEventListener('focus', function() {
                const label = group.querySelector('label');
                label.style.top = '-20px';
                label.style.fontSize = '0.8rem';
                label.style.color = '#0ef';
                group.querySelector('.underline').style.width = '100%';
            });
            
            input.addEventListener('blur', function() {
                if (!input.value) {
                    const label = group.querySelector('label');
                    label.style.top = '10px';
                    label.style.fontSize = '1rem';
                    label.style.color = 'rgba(255, 255, 255, 0.7)';
                    group.querySelector('.underline').style.width = '0';
                }
            });
        });
    }

    // Footer and back to top
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = () => {
        skillItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (itemPosition < screenPosition) {
                item.querySelector('.progress-bar').style.animation = 'progress-animate 1.5s forwards';
            }
        });
    };
    animateSkills();
    window.addEventListener('scroll', animateSkills);

    // Radial skills hover effect
    const radialSkills = document.querySelectorAll('.radial-skill');
    radialSkills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.querySelector('.radial-progress').style.filter = 'brightness(1.2)';
        });
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('.radial-progress').style.filter = 'brightness(1)';
        });
    });
});