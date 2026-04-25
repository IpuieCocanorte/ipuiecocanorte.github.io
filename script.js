// NAVBAR SCROLL
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});

// ANIMACIONES DE SCROLL
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".section, .card, .info-box, .stat-box, .ministry-card").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
    // CONTADOR ANIMADO
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const current = +counter.innerText;
            const increment = target / 100;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });

    // ANIMACIÓN WHATSAPP
    const whatsapp = document.querySelector(".whatsapp");

    if (whatsapp) {
        setInterval(() => {
            whatsapp.style.transform = "scale(1.1)";
            setTimeout(() => {
                whatsapp.style.transform = "scale(1)";
            }, 300);
        }, 3000);
    }

    // FORMULARIO
    const form = document.getElementById("contactForm");
    const success = document.getElementById("successMessage");

    if (form && success) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch("https://formsubmit.co/ajax/ipuiegestion@gmail.com", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("No se pudo enviar el formulario");
                }

                success.classList.add("show");
                form.reset();

                setTimeout(() => {
                    success.classList.remove("show");
                }, 4000);

            } catch (error) {
                alert("Hubo un error al enviar el formulario");
                console.error(error);
            }
        });
    }
});
// DROPDOWN EN MÓVIL
document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle("active");
            }
        });
    });
});

// ACORDEÓN DE CREENCIAS
document.addEventListener("DOMContentLoaded", () => {
    const beliefItems = document.querySelectorAll(".belief-item");
    const beliefToggles = document.querySelectorAll(".belief-toggle");

    function isMobileView() {
        return window.innerWidth <= 900;
    }

    function closeItem(item) {
        item.classList.remove("active");
        const icon = item.querySelector(".belief-icon");
        if (icon) {
            icon.textContent = "+";
        }
    }

    function openItem(item) {
        item.classList.add("active");
        const icon = item.querySelector(".belief-icon");
        if (icon) {
            icon.textContent = "−";
        }
    }

    // Inicializar iconos
    beliefItems.forEach(item => {
        const icon = item.querySelector(".belief-icon");
        if (icon) {
            icon.textContent = item.classList.contains("active") ? "−" : "+";
        }
    });

    beliefToggles.forEach((toggle, index) => {
        toggle.addEventListener("click", () => {
            const currentItem = toggle.parentElement;
            const isActive = currentItem.classList.contains("active");

            // Si ya está abierta, se cierra
            if (isActive) {
                closeItem(currentItem);
                return;
            }

            if (isMobileView()) {
                // En móvil: solo una abierta
                beliefItems.forEach(item => closeItem(item));
                openItem(currentItem);
            } else {
                // En escritorio: una abierta por columna
                // izquierda = índices 0,2,4
                // derecha   = índices 1,3,5
                const currentColumn = index % 2;

                beliefItems.forEach((item, itemIndex) => {
                    if (itemIndex % 2 === currentColumn) {
                        closeItem(item);
                    }
                });

                openItem(currentItem);
            }
        });
    });
});

// SLIDERS DE EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    const sliderShells = document.querySelectorAll(".events-slider-shell");

    sliderShells.forEach(shell => {
        const slider = shell.querySelector(".events-slider");
        const track = shell.querySelector(".events-track");
        const leftArrow = shell.querySelector(".events-arrow-left");
        const rightArrow = shell.querySelector(".events-arrow-right");

        if (!slider || !track || !leftArrow || !rightArrow) return;

        let paused = false;
        let autoEnabled = window.innerWidth > 768;
        let singleSetWidth = 0;

        function getPanelStep() {
            const panel = slider.querySelector(".event-panel");
            if (!panel) return 312;
            const style = window.getComputedStyle(track);
            const gap = parseInt(style.gap) || 0;
            return panel.offsetWidth + gap;
        }

        function getSingleSetWidth() {
            const panels = track.querySelectorAll(".event-panel");
            const setCount = panels.length / 3;
            if (!setCount) return 0;

            const style = window.getComputedStyle(track);
            const gap = parseInt(style.gap) || 0;

            let total = 0;
            for (let i = 0; i < setCount; i++) {
                total += panels[i].offsetWidth;
            }

            total += gap * (setCount - 1);
            return total;
        }

        function setInitialPosition() {
            singleSetWidth = getSingleSetWidth();
            if (singleSetWidth > 0) {
                slider.scrollLeft = singleSetWidth;
            }
        }

        function normalizeScroll() {
            if (singleSetWidth <= 0) return;

            if (slider.scrollLeft >= singleSetWidth * 2) {
                slider.scrollLeft -= singleSetWidth;
            }

            if (slider.scrollLeft <= 0) {
                slider.scrollLeft += singleSetWidth;
            }
        }

        function autoScroll() {
            if (autoEnabled && !paused) {
                slider.scrollLeft += 0.35;
                normalizeScroll();
            }
            requestAnimationFrame(autoScroll);
        }

        function manualMove(direction) {
            const step = getPanelStep();
            paused = true;

            slider.scrollBy({
                left: direction * step,
                behavior: "smooth"
            });

            setTimeout(() => {
                normalizeScroll();
                paused = false;
            }, 700);
        }

        slider.addEventListener("mouseenter", () => {
            paused = true;
        });

        slider.addEventListener("mouseleave", () => {
            paused = false;
        });

        leftArrow.addEventListener("click", () => {
            manualMove(-1);
        });

        rightArrow.addEventListener("click", () => {
            manualMove(1);
        });

        window.addEventListener("resize", () => {
            autoEnabled = window.innerWidth > 768;
            setInitialPosition();
        });

        requestAnimationFrame(() => {
            setInitialPosition();
            autoScroll();
        });
    });
});

// PRÓXIMAMENTE EN EVENTOS LOCALES
document.addEventListener("DOMContentLoaded", () => {
    const localPanels = document.querySelectorAll(".local-slider .event-panel");
    const comingSoonBox = document.getElementById("local-coming-soon");

    if (!localPanels.length || !comingSoonBox) return;

    localPanels.forEach(panel => {
        panel.addEventListener("click", () => {
            comingSoonBox.classList.add("active");

            setTimeout(() => {
                comingSoonBox.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 120);
        });
    });
});