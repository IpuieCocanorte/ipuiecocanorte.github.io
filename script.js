// NAVBAR SCROLL
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// SCROLL SUAVE MEJORADO
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

// ANIMACIONES SCROLL
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".section, .card").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// WHATSAPP ANIMACIÓN
const whatsapp = document.querySelector(".whatsapp");

if (whatsapp) {
    setInterval(() => {
        whatsapp.style.transform = "scale(1.1)";
        setTimeout(() => {
            whatsapp.style.transform = "scale(1)";
        }, 300);
    }, 3000);
}