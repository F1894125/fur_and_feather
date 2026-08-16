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
  userDropdown.classList.toggle("flex");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (
    !userDropdown.contains(e.target) &&
    !userBtn.contains(e.target)
  ) {
    userDropdown.classList.add("hidden");
    userDropdown.classList.remove("flex");
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
  const isOpen = pagesMenu.classList.toggle("active");

  if (isOpen) {
    // Open menu
    pagesMenu.classList.remove("hidden");

    requestAnimationFrame(() => {
      pagesMenu.classList.remove("max-h-0");
      pagesMenu.classList.add("max-h-[400px]");
    });
  } else {
    // Close menu
    pagesMenu.classList.remove("max-h-[400px]");
    pagesMenu.classList.add("max-h-0");

    setTimeout(() => {
      pagesMenu.classList.add("hidden");
    }, 500);
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
    pauseOnHover: true,
    pauseOnFocus: true,
    draggable: true,
    swipe: true,
    touchMove: true,
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
const faqButtons = document.querySelectorAll(".faq-btn");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector("i");

    // Close other FAQ items
    document.querySelectorAll(".faq-content").forEach((item) => {
      if (item !== content) {
        item.style.maxHeight = null;
        item.classList.remove("opacity-100");
        item.classList.add("opacity-0");

        const otherIcon = item.previousElementSibling.querySelector("i");

        otherIcon.classList.remove("fa-minus");
        otherIcon.classList.add("fa-plus");
      }
    });

    // Close all icons first
    document.querySelectorAll(".faq-btn i").forEach((itemIcon) => {
      itemIcon.classList.remove("fa-minus");
      itemIcon.classList.add("fa-plus");
    });

    // Toggle current FAQ
    if (content.style.maxHeight) {
      // CLOSE
      content.style.maxHeight = null;
      content.classList.remove("opacity-100");
      content.classList.add("opacity-0");

      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    } else {
      // OPEN
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.remove("opacity-0");
      content.classList.add("opacity-100");

      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
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

// Scroll to Top button
const backToTop = document.getElementById("backToTop");
const backToTopIcon = document.getElementById("backToTopIcon");
// Show / hide button
window.addEventListener("scroll", () => {
// Show button after scrolling 300px
  if (window.scrollY > 300) {
    backToTop.classList.remove(
      "invisible",
      "opacity-0",
      "translate-y-5"
    );
    backToTop.classList.add(
      "visible",
      "opacity-100",
      "translate-y-0"
    );
  } else {
    backToTop.classList.remove(
      "visible",
      "opacity-100",
      "translate-y-0"
    );
    backToTop.classList.add(
      "invisible",
      "opacity-0",
      "translate-y-5"
    );
  }
// Check if user reached the bottom
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5;
if (atBottom) {
// Change arrow to UP
    backToTopIcon.classList.add("rotate-180");
    backToTop.setAttribute("aria-label", "Back to top");
  } else {
// Change arrow to DOWN
    backToTopIcon.classList.remove("rotate-180");
    backToTop.setAttribute("aria-label", "Scroll down");
  }
});
// Button click
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// blog section 
document.addEventListener("DOMContentLoaded", function () {
  const sidebarButtons = document.querySelectorAll(".sidebar-toggle");

  sidebarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.dataset.target;
      const target = document.getElementById(targetId);
      const icon = this.querySelector(".sidebar-icon");

      const isOpen = target.classList.contains("max-h-[200px]");

      // Close all other sections
      document.querySelectorAll(".sidebar-content").forEach((content) => {
        content.classList.remove("max-h-[200px]");
        content.classList.add("max-h-0");
      });

      document.querySelectorAll(".sidebar-icon").forEach((arrow) => {
        arrow.classList.remove("rotate-180");
      });

      // Open clicked section
      if (!isOpen) {
        target.classList.remove("max-h-0");
        target.classList.add("max-h-[200px]");

        icon.classList.add("rotate-180");
      }
    });
  });
});

    // =====================================
    // SELECT ELEMENTS
    // =====================================

    const blogCards = document.querySelectorAll(".blog-card");

    const searchInput = document.getElementById("searchInput");

    const searchBtn = document.getElementById("searchBtn");

    const categoryButtons =
      document.querySelectorAll(".category-btn");

    const tagButtons =
      document.querySelectorAll(".tag-btn");


    // =====================================
    // FILTER BLOGS
    // =====================================

    function filterBlogs(type, value) {

      blogCards.forEach((card) => {

        let showCard = false;

        // -----------------------------
        // CATEGORY FILTER
        // -----------------------------

        if (type === "category") {

          const category =
            card.dataset.category;

          if (value === "all") {

            showCard = true;

          } else if (category === value) {

            showCard = true;

          }

        }


        // -----------------------------
        // TAG FILTER
        // -----------------------------

        if (type === "tag") {

          const tags =
            card.dataset.tags.toLowerCase();

          if (tags.includes(value.toLowerCase())) {

            showCard = true;

          }

        }


        // -----------------------------
        // SEARCH FILTER
        // -----------------------------

        if (type === "search") {

          const title =
            card.dataset.title.toLowerCase();

          const description =
            card
              .querySelector(".blog-description")
              .textContent
              .toLowerCase();

          const searchValue =
            value.toLowerCase().trim();

          if (
            title.includes(searchValue) ||
            description.includes(searchValue)
          ) {

            showCard = true;

          }

        }


        // -----------------------------
        // SHOW / HIDE
        // -----------------------------

        if (showCard) {

          card.classList.remove("hide");

        } else {

          card.classList.add("hide");

        }

      });

    }


    // =====================================
    // CATEGORY CLICK
    // =====================================

    categoryButtons.forEach((button) => {

      button.addEventListener("click", () => {

        const category =
          button.dataset.filter;

        filterBlogs("category", category);

        // Clear search
        searchInput.value = "";

      });

    });


    // =====================================
    // TAG CLICK
    // =====================================

    tagButtons.forEach((button) => {

      button.addEventListener("click", () => {

        const tag =
          button.dataset.tag;

        filterBlogs("tag", tag);

        // Clear search
        searchInput.value = "";

      });

    });


    // =====================================
    // SEARCH
    // =====================================

    function performSearch() {

      const value =
        searchInput.value;

      if (value === "") {

        blogCards.forEach((card) => {
          card.classList.remove("hide");
        });

        return;
      }

      filterBlogs("search", value);

    }


    // Search button
    searchBtn.addEventListener(
      "click",
      performSearch
    );


    // Search while typing
    searchInput.addEventListener(
      "input",
      performSearch
    );


    // =====================================
    // ENTER KEY SEARCH
    // =====================================

    searchInput.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {

          performSearch();

        }

      }
    );
