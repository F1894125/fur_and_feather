// Preloader
window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

      preloader.classList.add("opacity-0");

      setTimeout(() => {
        preloader.classList.add("hidden");
      }, 500);

    }, 2000);

  });
// tab switch
document.addEventListener("DOMContentLoaded", () => {
  const adopterTab = document.getElementById("adopterTab");
  const shelterTab = document.getElementById("shelterTab");

  const adopterForm = document.getElementById("adopterForm");
  const shelterForm = document.getElementById("shelterForm");

  // Stop if this page doesn't contain the registration tabs
  if (!adopterTab || !shelterTab || !adopterForm || !shelterForm) {
    return;
  }

  // ================================
  // SHOW ADOPTER FORM
  // ================================
  function showAdopterForm() {
    adopterForm.classList.remove("hidden");
    shelterForm.classList.add("hidden");

    adopterTab.classList.add("tab-active");
    adopterTab.classList.remove("tab-inactive");

    shelterTab.classList.add("tab-inactive");
    shelterTab.classList.remove("tab-active");
  }

  // ================================
  // SHOW SHELTER FORM
  // ================================
  function showShelterForm() {
    adopterForm.classList.add("hidden");
    shelterForm.classList.remove("hidden");

    shelterTab.classList.add("tab-active");
    shelterTab.classList.remove("tab-inactive");

    adopterTab.classList.add("tab-inactive");
    adopterTab.classList.remove("tab-active");
  }

  // ================================
  // TAB CLICK EVENTS
  // ================================
  adopterTab.addEventListener("click", showAdopterForm);
  shelterTab.addEventListener("click", showShelterForm);

  // ================================
  // DEFAULT TAB
  // ================================
  showAdopterForm();
});

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
  if (!userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
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
  if (
    !desktopPagesBtn.contains(e.target) &&
    !desktopPagesMenu.contains(e.target)
  ) {
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
        breakpoint: 576,
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
  },
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
const faqContents = document.querySelectorAll(".faq-content");

// =====================================
// INITIAL STATE
// FIRST FAQ OPEN BY DEFAULT
// =====================================

faqContents.forEach((content, index) => {
  const icon = content.previousElementSibling.querySelector("i");

  if (index === 0) {
    content.classList.remove("opacity-0");
    content.classList.add("opacity-100");

    content.style.maxHeight = content.scrollHeight + "px";

    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
  } else {
    content.style.maxHeight = "0px";

    content.classList.remove("opacity-100");
    content.classList.add("opacity-0");

    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
  }
});

// =====================================
// FAQ CLICK
// =====================================

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector("i");

    // Check whether current FAQ is open
    const isOpen =
      content.style.maxHeight !== "0px" && content.style.maxHeight !== "";

    // =================================
    // CLOSE ALL FAQ ITEMS
    // =================================

    faqContents.forEach((item) => {
      item.style.maxHeight = "0px";

      item.classList.remove("opacity-100");
      item.classList.add("opacity-0");

      const otherIcon = item.previousElementSibling.querySelector("i");

      otherIcon.classList.remove("fa-minus");
      otherIcon.classList.add("fa-plus");
    });

    // =================================
    // OPEN CURRENT FAQ
    // =================================

    if (!isOpen) {
      // Important:
      // Let the browser render the closed state first
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";

        content.classList.remove("opacity-0");
        content.classList.add("opacity-100");
      });

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

// Scroll to Top button
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");
  const backToTopIcon = document.getElementById("backToTopIcon");

  // Stop if button doesn't exist
  if (!backToTop || !backToTopIcon) {
    console.log("Back to top button not found");
    return;
  }

  // Show / hide button
  window.addEventListener("scroll", () => {
    // Show after scrolling 300px
    if (window.scrollY > 300) {
      backToTop.classList.remove("invisible", "opacity-0", "translate-y-5");

      backToTop.classList.add("visible", "opacity-100", "translate-y-0");
    } else {
      backToTop.classList.remove("visible", "opacity-100", "translate-y-0");

      backToTop.classList.add("invisible", "opacity-0", "translate-y-5");
    }

    // Check bottom of page
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5;

    if (atBottom) {
      // Arrow UP
      backToTopIcon.classList.add("rotate-180");
      backToTop.setAttribute("aria-label", "Back to top");
    } else {
      // Arrow DOWN
      backToTopIcon.classList.remove("rotate-180");
      backToTop.setAttribute("aria-label", "Scroll down");
    }
  });

  // Button click
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// newsletter
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");

  if (!form) {
    console.error("newsletterForm was not found in the HTML.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");

    if (!emailInput) {
      console.error("Email input was not found in the HTML.");
      return;
    }

    const email = emailInput.value.trim();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Subscribed Successfully!");

    form.reset();
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

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTS
  // =====================================

  const blogCards = document.querySelectorAll(".blog-card");

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  const categoryButtons =
    document.querySelectorAll(".category-btn");

  const tagButtons =
    document.querySelectorAll(".tag-btn");


  // =====================================
  // CHECK ELEMENTS
  // =====================================

  console.log("Blog Cards:", blogCards.length);
  console.log("Search Input:", searchInput);
  console.log("Search Button:", searchBtn);
  console.log("Category Buttons:", categoryButtons.length);
  console.log("Tag Buttons:", tagButtons.length);


  // =====================================
  // FILTER BLOGS
  // =====================================

  function filterBlogs(type, value) {

    blogCards.forEach((card) => {

      let showCard = false;


      // =====================================
      // CATEGORY FILTER
      // =====================================

      if (type === "category") {

        const category = card.dataset.category || "";

        if (value === "all") {
          showCard = true;
        }
        else if (category === value) {
          showCard = true;
        }

      }


      // =====================================
      // TAG FILTER
      // =====================================

      if (type === "tag") {

        const tags = card.dataset.tags || "";

        if (
          tags
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          showCard = true;
        }

      }


      // =====================================
      // SEARCH FILTER
      // =====================================

      if (type === "search") {

        const title =
          card.dataset.title || "";

        const descriptionElement =
          card.querySelector(".blog-description");

        const description =
          descriptionElement
            ? descriptionElement.textContent
            : "";

        const searchValue =
          value.toLowerCase().trim();

        if (
          title
            .toLowerCase()
            .includes(searchValue) ||

          description
            .toLowerCase()
            .includes(searchValue)
        ) {
          showCard = true;
        }

      }


      // =====================================
      // SHOW / HIDE CARD
      // =====================================

      if (showCard) {
        card.classList.remove("hide");
      }
      else {
        card.classList.add("hide");
      }

    });

  }


  // =====================================
  // CATEGORY CLICK
  // =====================================

  categoryButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      event.preventDefault();

      const category =
        button.dataset.filter || "all";

      filterBlogs("category", category);

      if (searchInput) {
        searchInput.value = "";
      }

    });

  });


  // =====================================
  // TAG CLICK
  // =====================================

  tagButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      event.preventDefault();

      const tag =
        button.dataset.tag || "";

      filterBlogs("tag", tag);

      if (searchInput) {
        searchInput.value = "";
      }

    });

  });


  // =====================================
  // SEARCH
  // =====================================

  function performSearch() {

    if (!searchInput) {
      return;
    }

    const value =
      searchInput.value.trim();


    // Empty search = show all
    if (value === "") {

      blogCards.forEach((card) => {
        card.classList.remove("hide");
      });

      return;
    }


    filterBlogs("search", value);

  }


  // =====================================
  // SEARCH BUTTON
  // =====================================

  if (searchBtn) {

    searchBtn.addEventListener(
      "click",
      performSearch
    );

  }


  // =====================================
  // SEARCH WHILE TYPING
  // =====================================

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      performSearch
    );


    // =====================================
    // ENTER KEY
    // =====================================

    searchInput.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {

          event.preventDefault();

          performSearch();

        }

      }
    );

  }

});

// Rating 
document.addEventListener("DOMContentLoaded", () => {

  const stars = document.querySelectorAll(".select-star");
  const rating = document.getElementById("rating");
  const submitBtn = document.getElementById("submitBtn");

  let selectedRating = 0;

  // Check elements
  console.log("Rating container:", rating);
  console.log("Submit button:", submitBtn);
  console.log("Stars:", stars.length);

  // If rating elements don't exist, stop
  if (!rating || !submitBtn || stars.length === 0) {
    console.warn("Rating elements were not found.");
    return;
  }

  // =====================================
  // STAR HOVER + CLICK
  // =====================================

  stars.forEach((star, index) => {

    // Hover
    star.addEventListener("mouseenter", () => {

      stars.forEach((s, i) => {
        s.textContent = i <= index ? "★" : "☆";
      });

    });

    // Click
    star.addEventListener("click", () => {

      selectedRating = index + 1;

      stars.forEach((s, i) => {
        s.textContent =
          i < selectedRating ? "★" : "☆";
      });

    });

  });


  // =====================================
  // MOUSE LEAVE
  // =====================================

  rating.addEventListener("mouseleave", () => {

    stars.forEach((s, i) => {
      s.textContent =
        i < selectedRating ? "★" : "☆";
    });

  });


  // =====================================
  // SUBMIT
  // =====================================

  submitBtn.addEventListener("click", () => {

    if (selectedRating === 0) {

      alert("Please select a rating.");

      return;
    }

    alert(
      `You selected ${selectedRating} star${
        selectedRating > 1 ? "s" : ""
      }!`
    );

  });

}); 

// Filter
document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     ELEMENTS
  ========================================== */

  const filterButton = document.getElementById("filterButton");
  const sortButton = document.getElementById("sortButton");

  const filterPanel = document.getElementById("filterPanel");
  const sortPanel = document.getElementById("sortPanel");

  const filterToggles =
    document.querySelectorAll(".filter-toggle");

  const filterOptions =
    document.querySelectorAll(".filter-option");

  const sortOptions =
    document.querySelectorAll(".sort-option");

  /*
   * All testimonial cards
   */
  const testimonialContainer =
    document.querySelector(".grid.grid-cols-12.gap-x-5");

  const testimonialCards =
    testimonialContainer
      ? Array.from(
          testimonialContainer.children
        )
      : [];


  /* ==========================================
     CURRENT FILTER STATE
  ========================================== */

  let selectedFilters = {
    pet: "All",
    rating: "All",
    shelter: "All",
    experience: "All"
  };


  /* ==========================================
     OPEN FILTER PANEL
  ========================================== */

  filterButton.addEventListener("click", (e) => {

    e.stopPropagation();

    sortPanel.classList.add("hidden");

    filterPanel.classList.toggle("hidden");

  });


  /* ==========================================
     OPEN SORT PANEL
  ========================================== */

  sortButton.addEventListener("click", (e) => {

    e.stopPropagation();

    filterPanel.classList.add("hidden");

    sortPanel.classList.toggle("hidden");

  });


  /* ==========================================
     STOP PANEL FROM CLOSING
  ========================================== */

  filterPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  sortPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });


  /* ==========================================
     CLICK OUTSIDE
  ========================================== */

  document.addEventListener("click", () => {

    filterPanel.classList.add("hidden");
    sortPanel.classList.add("hidden");

  });


  /* ==========================================
     FILTER ACCORDION
  ========================================== */

  filterToggles.forEach((toggle) => {

    toggle.addEventListener("click", () => {

      const content =
        toggle.nextElementSibling;

      const arrow =
        toggle.querySelector(".filter-arrow");

      const isOpen =
        content.classList.contains("max-h-[500px]");


      /*
       * Close all other accordions
       */

      filterToggles.forEach((otherToggle) => {

        const otherContent =
          otherToggle.nextElementSibling;

        const otherArrow =
          otherToggle.querySelector(".filter-arrow");

        if (otherToggle !== toggle) {

          otherContent.classList.remove(
            "max-h-[500px]",
            "opacity-100"
          );

          otherContent.classList.add(
            "max-h-0",
            "opacity-0"
          );

          otherArrow.classList.remove(
            "rotate-180"
          );

          otherToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      });


      /*
       * Toggle current accordion
       */

      if (isOpen) {

        content.classList.remove(
          "max-h-[500px]",
          "opacity-100"
        );

        content.classList.add(
          "max-h-0",
          "opacity-0"
        );

        arrow.classList.remove(
          "rotate-180"
        );

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      } else {

        content.classList.remove(
          "max-h-0",
          "opacity-0"
        );

        content.classList.add(
          "max-h-[500px]",
          "opacity-100"
        );

        arrow.classList.add(
          "rotate-180"
        );

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  /* ==========================================
     FILTER OPTIONS
  ========================================== */

  filterOptions.forEach((option) => {

    option.addEventListener("click", () => {

      const value =
        option.textContent.trim();

      const filterGroup =
        option.closest(".filter-group");

      const title =
        filterGroup
          .querySelector(".filter-toggle span")
          .textContent
          .trim();


      /*
       * Active state
       */

      filterGroup
        .querySelectorAll(".filter-option")
        .forEach((item) => {

          item.classList.remove(
            "font-semibold",
            "underline"
          );

        });

      option.classList.add(
        "font-semibold",
        "underline"
      );


      /*
       * Save selected filter
       */

      if (title === "Pet Type") {

        selectedFilters.pet = value;

      }

      else if (title === "Rating") {

        selectedFilters.rating = value;

      }

      else if (title === "Shelter") {

        selectedFilters.shelter = value;

      }

      else if (title === "Experience") {

        selectedFilters.experience = value;

      }


      /*
       * Apply filters
       */

      applyFilters();

    });

  });


  /* ==========================================
     APPLY FILTERS
  ========================================== */

  function applyFilters() {

    testimonialCards.forEach((card) => {

      const pet =
        card.dataset.pet;

      const rating =
        parseFloat(card.dataset.rating);

      const shelter =
        card.dataset.shelter;

      const experience =
        card.dataset.experience;


      /*
       * PET FILTER
       */

      let petMatch =
        selectedFilters.pet === "All" ||
        pet === selectedFilters.pet;


      /*
       * RATING FILTER
       */

      let ratingMatch = true;

      if (selectedFilters.rating === "5-4") {

        ratingMatch =
          rating >= 4 &&
          rating <= 5;

      }

      else if (selectedFilters.rating === "3-2") {

        ratingMatch =
          rating >= 2 &&
          rating < 4;

      }

      else if (selectedFilters.rating === "1") {

        ratingMatch =
          rating >= 0 &&
          rating < 2;

      }


      /*
       * SHELTER FILTER
       */

      let shelterMatch =
        selectedFilters.shelter === "All" ||
        shelter === selectedFilters.shelter;


      /*
       * EXPERIENCE FILTER
       */

      let experienceMatch =
        selectedFilters.experience === "All" ||
        experience === selectedFilters.experience;


      /*
       * SHOW / HIDE CARD
       */

      if (
        petMatch &&
        ratingMatch &&
        shelterMatch &&
        experienceMatch
      ) {

        card.classList.remove("hidden");

      } else {

        card.classList.add("hidden");

      }

    });

  }


  /* ==========================================
     SORT OPTIONS
  ========================================== */

  sortOptions.forEach((option) => {

    option.addEventListener("click", () => {

      const sortType =
        option.dataset.sort;


      /*
       * Active state
       */

      sortOptions.forEach((item) => {

        item.classList.remove(
          "font-bold",
          "underline"
        );

      });

      option.classList.add(
        "font-bold",
        "underline"
      );


      /*
       * Sort cards
       */

      sortCards(sortType);


      /*
       * Close sort panel
       */

      sortPanel.classList.add("hidden");

    });

  });


  /* ==========================================
     SORT FUNCTION
  ========================================== */

  function sortCards(type) {

    if (!testimonialContainer) return;


    const cards =
      Array.from(
        testimonialContainer.children
      );


    switch (type) {

      /*
       * RECOMMENDED
       */

      case "recommended":

        cards.sort((a, b) => {

          const ratingA =
            parseFloat(a.dataset.rating) || 0;

          const ratingB =
            parseFloat(b.dataset.rating) || 0;

          return ratingB - ratingA;

        });

        break;


      /*
       * MOST POPULAR
       */

      case "popular":

        cards.sort((a, b) => {

          const ratingA =
            parseFloat(a.dataset.rating) || 0;

          const ratingB =
            parseFloat(b.dataset.rating) || 0;

          return ratingB - ratingA;

        });

        break;


      /*
       * NEWEST
       */

      case "newest":

        cards.sort((a, b) => {

          const dateA =
            new Date(a.dataset.date);

          const dateB =
            new Date(b.dataset.date);

          return dateB - dateA;

        });

        break;


      /*
       * OLDEST
       */

      case "oldest":

        cards.sort((a, b) => {

          const dateA =
            new Date(a.dataset.date);

          const dateB =
            new Date(b.dataset.date);

          return dateA - dateB;

        });

        break;


      /*
       * MOST HELPFUL
       */

      case "helpful":

        cards.sort((a, b) => {

          const helpfulA =
            parseInt(a.dataset.helpful) || 0;

          const helpfulB =
            parseInt(b.dataset.helpful) || 0;

          return helpfulB - helpfulA;

        });

        break;

    }


    /*
     * Put sorted cards back
     */

    cards.forEach((card) => {

      testimonialContainer.appendChild(card);

    });

  }


});
// Pet
document.addEventListener("DOMContentLoaded", () => {

  const categories = document.querySelectorAll(".category-item");

  categories.forEach((category) => {

    category.addEventListener("click", () => {

      const targetId = category.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });

});