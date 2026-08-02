// Login form
$(document).ready(function () {
  const $form = $("#loginForm");
  const $email = $("#email");
  const $password = $("#password");
  const $emailField = $("#emailField");
  const $passwordField = $("#passwordField");
  const $remember = $("#remember");
  const $toggleBtn = $("#togglePassword");
  const $eyeIcon = $("#eyeIcon");
  const $eyeOffIcon = $("#eyeOffIcon");
  const $loginBtn = $("#loginBtn");
  const $loginBtnLabel = $("#loginBtnLabel");
  const loginBtnHtml = $loginBtnLabel.html();

  /* ---------- Remember me (email only — never store passwords) ---------- */
  const REMEMBER_KEY = "fnf.rememberedEmail";
  const savedEmail = localStorage.getItem(REMEMBER_KEY);
  if (savedEmail) {
    $email.val(savedEmail);
    $remember.prop("checked", true);
  }

  /* ---------- Password visibility toggle ---------- */
  $toggleBtn.on("click", function () {
    const show = $password.attr("type") === "password";
    $password.attr("type", show ? "text" : "password");
    $eyeIcon.toggleClass("hidden", !show);
    $eyeOffIcon.toggleClass("hidden", show);
    $(this)
      .attr("aria-pressed", String(show))
      .attr("aria-label", show ? "Hide password" : "Show password");
  });

  /* ---------- Validation ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setFieldError($field, hasError) {
    $field.toggleClass("has-error", hasError);
    const $input = $field.find("input");
    const $msg = $field.find(".error-msg");
    if (!$msg.attr("id")) $msg.attr("id", $field.attr("id") + "-error");
    $input.attr("aria-invalid", String(hasError));
    if (hasError) $input.attr("aria-describedby", $msg.attr("id"));
    else $input.removeAttr("aria-describedby");
  }

  function validateEmail() {
    const ok = EMAIL_RE.test($.trim($email.val()));
    setFieldError($emailField, !ok);
    return ok;
  }

  function validatePassword() {
    const ok = $password.val().length >= 8;
    setFieldError($passwordField, !ok);
    return ok;
  }

  // Clear errors as the user fixes them
  $email.on("input", function () {
    if ($emailField.hasClass("has-error")) validateEmail();
  });
  $password.on("input", function () {
    if ($passwordField.hasClass("has-error")) validatePassword();
  });

  /* ---------- Submit ---------- */
  $form.on("submit", function (e) {
    e.preventDefault();

    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    if (!emailOk || !passwordOk) {
      (emailOk ? $password : $email).trigger("focus");
      return;
    }

    if ($remember.prop("checked")) {
      localStorage.setItem(REMEMBER_KEY, $.trim($email.val()));
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
    $loginBtn.prop("disabled", true);
    $loginBtnLabel.html('<span class="spinner"></span>');
    let users = JSON.parse(localStorage.getItem("users")) || [];

const email = $.trim($email.val());
const password = $password.val();

const user = users.find(
    u => u.email === email && u.password === password
);

if (user) {

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Successful!");
    window.location.href = "index.html";

} else {

    alert("Invalid Email or Password");

}

});
  /* ---------- Social buttons (demo) ---------- */
  $(".social-btn").on("click", function () {
    alert(
      "Continue with " +
        $(this).data("provider") +
        " — connect your OAuth flow here.",
    );
  });
});
// Login and signup button create
document.addEventListener("DOMContentLoaded", function () {

    const guestMenu = document.getElementById("guestMenu");
    const userMenu = document.getElementById("userMenu");

    if (localStorage.getItem("isLoggedIn") === "true") {
        guestMenu.style.display = "none";
        userMenu.style.display = "block";
    } else {
        guestMenu.style.display = "flex";
        userMenu.style.display = "none";
    }

});
// Logout button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "index.html";
    });
}
// Create Form
$(document).ready(function () {
  const $form = $("#create-form");
  const $fname = $("#fname");
  const $lname = $("#lname");
  const $email = $("#createEmail");
  const $password = $("#createPassword");
  const $confirmPassword = $("#confirmPassword");
  const $number = $("#number");
  const $terms = $("#terms");
  const $togglecreateBtn = $("#toggleCreatePassword");
  const $CreateeyeIcon = $("#createEyeIcon");
  const $CreateeyeOffIcon = $("#createEyeOffIcon");
  const $toggleconfirmBtn = $("#toggleConfirmPassword");
  const $ConfirmeyeIcon = $("#confirmEyeIcon");
  const $ConfirmeyeOffIcon = $("#confirmEyeOffIcon");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[6-9]\d{9}$/;

  function showError($field, message) {
    $field.addClass("has-error");
    $field.find(".error-msg").text(message).show();
  }

  function hideError($field) {
    $field.removeClass("has-error");
    $field.find(".error-msg").hide();
  }

  function validateFirstName() {
    if ($.trim($fname.val()) === "") {
      showError($("#fnameField"), "First name is required.");
      return false;
    }
    hideError($("#fnameField"));
    return true;
  }

  function validateLastName() {
    if ($.trim($lname.val()) === "") {
      showError($("#lnameField"), "Last name is required.");
      return false;
    }
    hideError($("#lnameField"));
    return true;
  }

  function validateEmail() {
    if (!EMAIL_RE.test($.trim($email.val()))) {
      showError($("#emailField"), "Enter a valid email.");
      return false;
    }
    hideError($("#emailField"));
    return true;
  }

  function validatePhone() {
    let phone = $.trim($number.val());

    if (phone === "") {
      hideError($("#numberField"));
      return true;
    }

    if (!PHONE_RE.test(phone)) {
      showError($("#numberField"), "Enter a valid 10-digit mobile number.");
      return false;
    }

    hideError($("#numberField"));
    return true;
  }

  function validatePassword() {
    if ($password.val().length < 8) {
      showError($("#passwordField"), "Password must be at least 8 characters.");
      return false;
    }

    hideError($("#passwordField"));
    return true;
  }

  function validateConfirmPassword() {
    if ($.trim($confirmPassword.val()) === "") {
      showError($("#confirmpasswordField"), "Confirm password is required.");
      return false;
    }

    if ($password.val() !== $confirmPassword.val()) {
      showError($("#confirmpasswordField"), "Passwords do not match.");
      return false;
    }

    hideError($("#confirmpasswordField"));
    return true;
  }
  $confirmPassword.on("input", validateConfirmPassword);
  $password.on("input", function () {
    if ($confirmPassword.val() !== "") {
      validateConfirmPassword();
    }
  });
  /* ---------- Password visibility toggle ---------- */
  $togglecreateBtn.on("click", function () {
    const show = $password.attr("type") === "password";
    $password.attr("type", show ? "text" : "password");
    $CreateeyeIcon.toggleClass("hidden", !show);
    $CreateeyeOffIcon.toggleClass("hidden", show);
    $(this)
      .attr("aria-pressed", String(show))
      .attr("aria-label", show ? "Hide password" : "Show password");
  });
  /* ---------- Password visibility toggle ---------- */
  $toggleconfirmBtn.on("click", function () {
    const show = $confirmPassword.attr("type") === "password";
    $confirmPassword.attr("type", show ? "text" : "password");
    $ConfirmeyeIcon.toggleClass("hidden", !show);
    $ConfirmeyeOffIcon.toggleClass("hidden", show);
    $(this)
      .attr("aria-pressed", String(show))
      .attr("aria-label", show ? "Hide password" : "Show password");
  });

  function validateTerms() {
    if (!$terms.is(":checked")) {
      alert("Please accept the Terms & Conditions.");
      return false;
    }

    return true;
  }

  $("input").on("input", function () {
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();
  });

  $form.on("submit", function (e) {
    e.preventDefault();

    const valid =
      validateFirstName() &&
      validateLastName() &&
      validateEmail() &&
      validatePhone() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateTerms();

    if (!valid) return;

    $("#loginBtn").prop("disabled", true);
    $("#loginBtnLabel").html('<span class="spinner"></span> Creating...');

  // Get existing users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Create new user
const newUser = {
    firstName: $.trim($fname.val()),
    lastName: $.trim($lname.val()),
    email: $.trim($email.val()),
    password: $password.val()
};

// Check duplicate email
const exists = users.some(user => user.email === newUser.email);

if (exists) {
    alert("Email already exists!");
    return;
}

// Add new user
users.push(newUser);

// Save array
localStorage.setItem("users", JSON.stringify(users));

alert("Account created successfully!");

window.location.href = "login.html";

});

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
        breakpoint: 640,
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
const counters = document.querySelectorAll("[data-target]");

counters.forEach((counter) => {
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

  requestAnimationFrame(updateCounter);
});
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
