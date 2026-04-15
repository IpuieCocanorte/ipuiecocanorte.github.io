// NAVBAR SCROLL 

window.addEventListener("scroll", function () { 

    const navbar = document.getElementById("navbar"); 

  

    if (window.scrollY > 50) { 

        navbar.classList.add("scrolled"); 

    } else { 

        navbar.classList.remove("scrolled"); 

    } 

}); 

  

// SCROLL SUAVE 

document.querySelectorAll('a[href^="#"]').forEach(anchor => { 

    anchor.addEventListener("click", function (e) { 

        e.preventDefault(); 

  

        const target = document.querySelector(this.getAttribute("href")); 

  

        if (target) { 

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

  

document.querySelectorAll(".section, .card, .info-box, .stat-box").forEach(el => { 

    el.classList.add("hidden"); 

    observer.observe(el); 

}); 

  

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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const success = document.getElementById("successMessage");

    if (form) {
        form.addEventListener("submit", () => {
            setTimeout(() => {
                success.classList.add("show");

                setTimeout(() => {
                    success.classList.remove("show");
                }, 4000);

            }, 500);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const success = document.getElementById("successMessage");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch("https://formsubmit.co/ajax/ipuiegestion@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                success.classList.add("show");
                form.reset();

                setTimeout(() => {
                    success.classList.remove("show");
                }, 4000);

            })
            .catch(error => {
                alert("Error al enviar");
            });
        });
    }

});
