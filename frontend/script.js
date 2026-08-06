// Humbarger Menu
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("left-[-100%]");
    mobileMenu.classList.add("left-0");
    overlay.classList.remove("hidden");
  });

  function closeMenu() {
    mobileMenu.classList.remove("left-0");
    mobileMenu.classList.add("left-[-100%]");
    overlay.classList.add("hidden");
  }

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});

// Heart Button

const heartBtns = document.querySelectorAll(".heartBtn");

heartBtns.forEach((heartBtn) => {
  heartBtn.addEventListener("click", () => {
    const icon = heartBtn.querySelector("i");

    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("text-red-500");
  });
});
// clickable dropdown
const userBtn = document.getElementById("userMenu");
const userDropdown = document.getElementById("userDropdown");

userBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    if (
        !userDropdown.contains(e.target) &&
        !userBtn.contains(e.target)
    ) {
        userDropdown.classList.add("hidden");
    }
});
// Destop clickable menu
const desktopPagesBtn = document.getElementById("destoppagesBtn");
const desktopPagesMenu = document.getElementById("destoppagesMenu");
const desktopPagesArrow = document.getElementById("destoppagesArrow");


desktopPagesBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  desktopPagesMenu.classList.toggle("opacity-0");
  desktopPagesMenu.classList.toggle("invisible");
  desktopPagesMenu.classList.toggle("scale-95");

  desktopPagesArrow.classList.toggle("rotate-180");
});

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (!desktopPagesBtn.contains(e.target) && !desktopPagesMenu.contains(e.target)) {
    desktopPagesMenu.classList.add("opacity-0", "invisible", "scale-95");
    desktopPagesArrow.classList.remove("rotate-180");
  }
});

// Humberger clickable menu
const pagesBtn = document.getElementById("pagesBtn");
const pagesMenu = document.getElementById("pagesMenu");


pagesBtn.addEventListener("click", () => {
    if (pagesMenu.classList.contains("hidden")) {
        pagesMenu.classList.remove("hidden");

        // Allow browser to render before animating
        requestAnimationFrame(() => {
            pagesMenu.classList.remove("max-h-0");
            pagesMenu.classList.add("max-h-[400px]");
        });
    } else {
        pagesMenu.classList.remove("max-h-[400px]");
        pagesMenu.classList.add("max-h-0");

        setTimeout(() => {
            pagesMenu.classList.add("hidden");
        }, 500); // Match transition duration
    }
});

// Companion Slider
$(document).ready(function () {
  $(".responsive").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// Number Count
const counters = document.querySelectorAll(".counter-number");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;
      if (entry.isIntersecting) {
        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";
        const duration = 1200;
        const startTime = performance.now();
        function updateCounter(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          counter.textContent = value + suffix;
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + suffix;
          }
        }
        // Reset to 0 before starting
        counter.textContent = "0" + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        // Reset when the section leaves the viewport
        const suffix = counter.dataset.suffix || "";
        counter.textContent = "0" + suffix;
      }
    });
  },
  {
    threshold: 0.5,
  }
);
counters.forEach((counter) => observer.observe(counter));

// Shelter slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// blog slider
var swiper = new Swiper(".blogSwiper", {
  slidesPerView: 1,
  slidesToScroll: 1,
  spaceBetween: 80,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 60,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 60,
    },
    1024: {
      slidesPerView: 1.4,
      spaceBetween: 50,
    },
  },
});

// Shelter slider
var swiper = new Swiper(".storySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  slidesToScroll: 1,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
  },
});

// Accordian
const buttons = document.querySelectorAll(".faq-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentContent = button.nextElementSibling;
    const currentIcon = button.querySelector("i");

    // Close all items
    document.querySelectorAll(".faq-content").forEach((content) => {
      if (content !== currentContent) {
        content.classList.add("hidden");
      }
    });

    document.querySelectorAll(".faq-btn i").forEach((icon) => {
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    });

    // Toggle current item
    currentContent.classList.toggle("hidden");

    if (currentContent.classList.contains("hidden")) {
      currentIcon.classList.remove("fa-minus");
      currentIcon.classList.add("fa-plus");
    } else {
      currentIcon.classList.remove("fa-plus");
      currentIcon.classList.add("fa-minus");
    }
  });
});
// Marquee
$(document).ready(function () {
  $(".marquee-slider").slick({
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5.5,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    draggable: false,
    touchMove: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          speed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          speed: 1500,
        },
      },
    ],
  });
});
// newsletter
const form = document.getElementById("newsletterForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  alert("Subscribed Successfully!");
  form.reset();
});
