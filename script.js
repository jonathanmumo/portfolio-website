document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       DARK MODE
    ========================= */
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

    });

    /* =========================
       TYPING ANIMATION
    ========================= */

    const words = [
        "Software Developer",
        "Computer Science Student",
        "Frontend Web Developer",
        "Problem Solver"
    ];

    const typingElement = document.getElementById("typing");

    if (typingElement) {

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }

            }

            setTimeout(typeEffect, deleting ? 60 : 120);

        }

        typeEffect();
    }

    /* =========================
       SECTION FADE-IN
    ========================= */

    const sections = document.querySelectorAll("section:not(#projects)");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.2
    });

    sections.forEach(section => observer.observe(section));

    /* =========================
       PROJECT STAGGER ANIMATION
    ========================= */

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
        threshold: 0.2
    });

    const projectSection = document.querySelector("#projects");

    if (projectSection) {
        projectObserver.observe(projectSection);
    }

});
