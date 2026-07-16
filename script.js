/**
 * Core Production Engineering Script Hub
 * Portfolio Framework - Fouad Bin Quasem
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Core Modules
    initPreloader();
    initThemeEngine();
    initNavigationMenu();
    initTypewriterEffect();
    initScrollTracker();
    initTabbedPanels();
    initPortfolioFilters();
    initLightboxComponent();
    initPriceMatrixToggle();
    initTestimonialCarousel();
    initFAQAccordion();
    initValidationProtocol();
    initScrollRevealAnimation();
    initDesktopCursor();
    initButtonRipples();
});

/* ==========================================================================
   Preloader UI Pipeline Execution
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById("preloader");
    const progress = preloader.querySelector(".loader-progress");
    
    let currentProgress = 0;
    const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 25) + 10;
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => preloader.style.display = "none", 400);
            }, 200);
        }
        progress.style.width = `${currentProgress}%`;
    }, 80);
}

/* ==========================================================================
   Light/Dark Theme Persistence Logic
   ========================================================================== */
function initThemeEngine() {
    const toggle = document.getElementById("theme-toggle");
    const storedTheme = localStorage.getItem("portfolio-theme") || 
                        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    document.documentElement.setAttribute("data-theme", storedTheme);
    
    toggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("portfolio-theme", targetTheme);
    });
}

/* ==========================================================================
   Mobile Navigation & Scroll Track Behaviors
   ========================================================================== */
function initNavigationMenu() {
    const header = document.getElementById("main-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-link");

    // Sticky Scroll Listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        trackActiveNavigationLink();
    });

    // Mobile Navigation Drawer Toggle
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !expanded);
        navMenu.classList.toggle("open");
    });

    // Auto Collapse Navigation Drawer On Selection
    links.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            navMenu.classList.remove("open");
        });
    });
}

function trackActiveNavigationLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let currentActiveId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentActiveId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentActiveId}`) {
            link.classList.add("active");
        }
    });
}

/* ==========================================================================
   Typing Script Logic Implementation
   ========================================================================== */
function initTypewriterEffect() {
    const target = document.getElementById("typewriter");
    if (!target) return;
    
    const words = JSON.parse(target.getAttribute("data-words"));
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            target.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }
        
        let typingSpeed = isDeleting ? 40 : 100;
        
        if (!isDeleting && charIdx === currentWord.length) {
            typingSpeed = 2000; // Hold delay
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500; // Switch delay
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

/* ==========================================================================
   Visual Progress Indicators (Scroll & Counter Arrays)
   ========================================================================== */
function initScrollTracker() {
    const progressIndicator = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("back-to-top");
    
    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight === 0) return;
        
        const currentProgress = (window.scrollY / totalHeight) * 100;
        progressIndicator.style.width = `${currentProgress}%`;
        
        if (window.scrollY > 600) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function triggerAnimatedCounterMetrics() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        let current = 0;
        const speed = target / 50; 
        
        const updateCount = () => {
            current += speed;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + (counter.parentElement.innerText.includes("%") ? "" : "+");
            }
        };
        updateCount();
    });
}

function triggerSkillBarsAnimation() {
    const fills = document.querySelectorAll(".skill-bar-fill");
    fills.forEach(fill => {
        fill.style.width = fill.getAttribute("data-progress");
    });
}

/* ==========================================================================
   Tab Control Architecture Array
   ========================================================================== */
function initTabbedPanels() {
    const tabHeaders = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");
    
    tabHeaders.forEach(btn => {
        btn.addEventListener("click", () => {
            tabHeaders.forEach(h => h.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
        });
    });
}

/* ==========================================================================
   Animate Portfolio Component Filtering Matrix
   ========================================================================== */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            
            const selection = button.getAttribute("data-filter");
            
            portfolioCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (selection === "all" || category === selection) {
                    card.style.display = "flex";
                    setTimeout(() => card.style.opacity = "1", 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => card.style.display = "none", 300);
                }
            });
        });
    });
}

/* ==========================================================================
   Lightbox Gallery Functional Layout
   ========================================================================== */
function initLightboxComponent() {
    const lightbox = document.getElementById("lightbox");
    const caption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");
    const triggers = document.querySelectorAll(".lightbox-trigger");
    const preview = lightbox.querySelector(".lightbox-placeholder-preview");
    
    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            lightbox.style.display = "flex";
            caption.textContent = trigger.getAttribute("data-title");
            preview.textContent = `Asset Preview: ${trigger.getAttribute("data-title")}`;
            lightbox.setAttribute("aria-hidden", "false");
        });
    });
    
    const closeProtocol = () => {
        lightbox.style.display = "none";
        lightbox.setAttribute("aria-hidden", "true");
    };
    
    closeBtn.addEventListener("click", closeProtocol);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeProtocol();
    });
}

/* ==========================================================================
   Pricing Module Matrix Logic
   ========================================================================== */
function initPriceMatrixToggle() {
    const checkbox = document.getElementById("currency-checkbox");
    const usdAmounts = document.querySelectorAll(".price-amount");
    const symbols = document.querySelectorAll(".price-symbol");
    const labelUsd = document.querySelector(".label-usd");
    const labelBdt = document.querySelector(".label-bdt");
    
    checkbox.addEventListener("change", () => {
        const currentTarget = checkbox.checked ? "bdt" : "usd";
        
        if (currentTarget === "bdt") {
            labelBdt.classList.add("active");
            labelUsd.classList.remove("active");
        } else {
            labelUsd.classList.add("active");
            labelBdt.classList.remove("active");
        }
        
        usdAmounts.forEach(amt => {
            amt.textContent = amt.getAttribute(`data-${currentTarget}`);
        });
        symbols.forEach(sym => {
            sym.textContent = sym.getAttribute(`data-${currentTarget}`);
        });
    });
}

/* ==========================================================================
   Testimonial Array Carousel Engine
   ========================================================================== */
function initTestimonialCarousel() {
    const track = document.querySelector(".carousel-track-wrapper");
    const slides = document.querySelectorAll(".carousel-slide");
    const indicators = document.querySelectorAll(".indicator");
    if (!track || slides.length === 0) return;
    
    indicators.forEach(ind => {
        ind.addEventListener("click", () => {
            const index = parseInt(ind.getAttribute("data-slide"), 10);
            indicators.forEach(i => i.classList.remove("active"));
            ind.classList.add("active");
            
            track.style.transform = `translateX(-${index * 100}%)`;
        });
    });
}

/* ==========================================================================
   FAQ Accordion Functional Architecture
   ========================================================================== */
function initFAQAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const panel = header.nextElementSibling;
            const isExpanded = header.getAttribute("aria-expanded") === "true";
            
            headers.forEach(h => {
                h.setAttribute("aria-expanded", "false");
                h.nextElementSibling.setAttribute("hidden", "true");
                h.querySelector(".icon-toggle").textContent = "+";
            });
            
            if (!isExpanded) {
                header.setAttribute("aria-expanded", "true");
                panel.removeAttribute("hidden");
                header.querySelector(".icon-toggle").textContent = "-";
            }
        });
    });
}

/* ==========================================================================
   Secure Form Intake Validation Layer
   ========================================================================== */
function initValidationProtocol() {
    const form = document.getElementById("portfolio-contact-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isFormValid = true;
        
        const inputs = form.querySelectorAll("input[required], textarea[required]");
        
        inputs.forEach(input => {
            const parent = input.parentElement;
            if (input.type === "email") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    parent.classList.add("invalid");
                    isFormValid = false;
                } else {
                    parent.classList.remove("invalid");
                }
            } else {
                if (input.value.trim() === "") {
                    parent.classList.add("invalid");
                    isFormValid = false;
                } else {
                    parent.classList.remove("invalid");
                }
            }
        });
        
        if (isFormValid) {
            triggerNotificationToast("Project consultation parameters received securely.");
            form.reset();
        }
    });
}

function triggerNotificationToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast-alert";
    toast.textContent = message;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* ==========================================================================
   Scroll Animations Logic Matrix
   ========================================================================== */
function initScrollRevealAnimation() {
    const revealElements = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Secondary check implementations triggers
                if (entry.target.querySelector(".counter")) {
                    triggerAnimatedCounterMetrics();
                }
                if (entry.target.querySelector(".skill-bar-fill")) {
                    triggerSkillBarsAnimation();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Micro-Interaction Engine Features (Cursor / Button Ripples)
   ========================================================================== */
function initDesktopCursor() {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;
    
    window.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    const interactiveElements = document.querySelectorAll("a, button, .filter-btn, .accordion-header");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
    });
}

function initButtonRipples() {
    const rippleButtons = document.querySelectorAll(".ripple");
    
    rippleButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rippleCircle = document.createElement("span");
            rippleCircle.className = "ripple-effect";
            rippleCircle.style.left = `${x}px`;
            rippleCircle.style.top = `${y}px`;
            
            this.appendChild(rippleCircle);
            setTimeout(() => rippleCircle.remove(), 600);
        });
    });
}