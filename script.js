document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("themeToggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀️";
        
    }

    // Toggle theme
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            toggleBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
/* =========================
   TYPING ANIMATION
========================= */

const text = [
    "Software Developer",
    "Computer Science Student",
    "Frontend Web Developer",
    "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const current = text[textIndex];

    if (!deleting) {

        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % text.length;
        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();
    });
    
const sections = document.querySelectorAll("section:not(#projects)");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});
const projects = document.querySelectorAll(".project");

const projectObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            projects.forEach((project, index) => {

                setTimeout(() => {
                    project.classList.add("show");
                }, index * 200);

            });

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold:0.2
});

const projectSection = document.querySelector("#projects");

projectObserver.observe(projectSection);
});
