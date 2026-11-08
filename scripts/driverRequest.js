document.addEventListener("DOMContentLoaded", () => {

    // NAVBAR TOGGLE
    const toggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");

    if (toggle && navbar) {
        toggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });
    }
});
