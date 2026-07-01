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
       REAL-TIME CLOCK
    ========================= */
    function updateClock() {
        const timeDisplay = document.getElementById("timeDisplay");
        const fullTimeDisplay = document.getElementById("fullTimeDisplay");
        
        if (timeDisplay || fullTimeDisplay) {
            const now = new Date();
            
            // Format time HH:MM:SS
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;
            
            // Format full date and time
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const fullTimeString = now.toLocaleDateString('en-US', options);
            
            if (timeDisplay) timeDisplay.textContent = timeString;
            if (fullTimeDisplay) fullTimeDisplay.textContent = fullTimeString;
        }
    }

    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

    /* =========================
       GEOLOCATION
    ========================= */
    function getLocation() {
        const locationText = document.getElementById("locationText");
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // Use reverse geocoding to get location name
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            let locationName = "Location Unknown";
                            
                            if (data.address) {
                                const address = data.address;
                                // Try to get city, then town, then village
                                locationName = address.city || address.town || address.village || address.county || "Kenya";
                            }
                            
                            if (locationText) {
                                locationText.textContent = locationName;
                            }
                        })
                        .catch(error => {
                            console.log("Reverse geocoding failed:", error);
                            if (locationText) {
                                locationText.textContent = `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
                            }
                        });
                },
                (error) => {
                    console.log("Geolocation error:", error);
                    // Fallback to IP-based location
                    getLocationFromIP();
                },
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            // Geolocation not supported, try IP-based location
            getLocationFromIP();
        }
    }

    // Fallback: Get location from IP
    function getLocationFromIP() {
        const locationText = document.getElementById("locationText");
        
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (locationText && data.city) {
                    locationText.textContent = `${data.city}, ${data.country_name}`;
                }
            })
            .catch(error => {
                console.log("IP-based location failed:", error);
                if (locationText) {
                    locationText.textContent = "Kenya";
                }
            });
    }

    // Get location on page load
    getLocation();

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

    const sections = document.querySelectorAll("section");

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

    /* =========================
       CONTACT FORM VALIDATION & FORMSPREE
    ========================= */

    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        // Configure Formspree form ID
        const FORMSPREE_FORM_ID = "meebrapj";

        // Form field validators
        const validators = {
            name: (value) => {
                if (!value.trim()) return "Name is required";
                if (value.trim().length < 2) return "Name must be at least 2 characters";
                return "";
            },
            email: (value) => {
                if (!value.trim()) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Please enter a valid email";
                return "";
            },
            subject: (value) => {
                if (!value.trim()) return "Subject is required";
                if (value.trim().length < 3) return "Subject must be at least 3 characters";
                return "";
            },
            message: (value) => {
                if (!value.trim()) return "Message is required";
                if (value.trim().length < 10) return "Message must be at least 10 characters";
                return "";
            }
        };

        // Real-time validation
        Object.keys(validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener("blur", () => validateField(fieldName));
                field.addEventListener("input", () => {
                    const formGroup = field.parentElement;
                    if (formGroup.classList.contains("error")) {
                        validateField(fieldName);
                    }
                });
            }
        });

        // Validate single field
        function validateField(fieldName) {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(fieldName + "Error");
            const formGroup = field.parentElement;
            const error = validators[fieldName](field.value);

            if (error) {
                formGroup.classList.add("error");
                errorElement.textContent = error;
                return false;
            } else {
                formGroup.classList.remove("error");
                errorElement.textContent = "";
                return true;
            }
        }

        // Validate entire form
        function validateForm() {
            let isValid = true;
            Object.keys(validators).forEach(fieldName => {
                if (!validateField(fieldName)) {
                    isValid = false;
                }
            });
            return isValid;
        }

        // Handle form submission
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            const submitBtn = contactForm.querySelector(".form-btn");
            const statusDiv = document.getElementById("formStatus");
            const originalBtnText = submitBtn.textContent;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
            statusDiv.className = "";
            statusDiv.textContent = "";

            try {
                // Prepare form data for Formspree
                const formData = new FormData(contactForm);
                
                // Submit to Formspree with proper headers
                const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
                    method: "POST",
                    body: formData
                });

                if (response.ok || response.status === 200 || response.status === 201) {
                    // Success
                    statusDiv.className = "form-status success";
                    statusDiv.textContent = "✓ Message sent successfully! I'll get back to you soon.";
                    contactForm.reset();
                    
                    // Clear error states
                    Object.keys(validators).forEach(fieldName => {
                        const formGroup = document.getElementById(fieldName).parentElement;
                        formGroup.classList.remove("error");
                    });

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        statusDiv.className = "";
                        statusDiv.textContent = "";
                    }, 3000);
                } else {
                    throw new Error(`Form submission failed with status ${response.status}`);
                }
            } catch (error) {
                // Error
                statusDiv.className = "form-status error";
                statusDiv.textContent = "✗ Error sending message. Please try again or email me directly.";
                console.error("Form error:", error);

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

});
