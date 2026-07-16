// Humbarger Menu
const menuBtn = document.getElementById("menu-btn");
     const closeBtn = document.getElementById("close-btn");
     const mobileMenu = document.getElementById("mobile-menu");
     const overlay = document.getElementById("overlay");
        // Open Menu
    menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("left-[-100%]");
    mobileMenu.classList.add("left-0");
    overlay.classList.remove("hidden");
    });
    // Close Menu Function
    function closeMenu() {
    mobileMenu.classList.remove("left-0");
    mobileMenu.classList.add("left-[-100%]");
    overlay.classList.add("hidden");
    }
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);