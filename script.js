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
