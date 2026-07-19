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
    } 
    else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    // Loading state (replace the timeout with a real auth request, e.g. $.ajax)
    $loginBtn.prop("disabled", true);
    $loginBtnLabel.html('<span class="spinner"></span>');

    setTimeout(function () {
      $loginBtn.prop("disabled", false);
      $loginBtnLabel.html(loginBtnHtml);
      alert("Logged in! (Wire this up to your real authentication endpoint.)");
    }, 1200);
  });

  /* ---------- Social buttons (demo) ---------- */
  $(".social-btn").on("click", function () {
    alert("Continue with " + $(this).data("provider") + " — connect your OAuth flow here.");
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

