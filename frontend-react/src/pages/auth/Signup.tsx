import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../services/validation/signupValidation";
import type { SignupPayload } from "../../interfaces/auth.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { ShowPassword, signupThunk } from "../../store/slices/authSlice";
import { getImageUrl } from "../../utils/getImageUrl";

export default function CreateAccountForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { showPassword, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      // phone: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  const onSubmit = async (data: SignupPayload) => {
    try {
      const res = await dispatch(signupThunk(data)).unwrap();
      if (res.user) {
        navigate("/login");
      }
      reset();
    } catch (error: any) {}
    console.log("Registration Submitted:", data);
    navigate("/signup");
  };

  return (
    <section className="bg-[#F4F1EA] relative overflow-hidden min-h-screen w-full flex items-center justify-center font-sans text-[#0A303A] py-6 sm:py-10">
      {/* Left Decorative Frame */}
      <img
        src={getImageUrl("icons/left-frame.png")}
        className="hidden lg:block absolute left-0 top-0 h-full w-auto max-w-[40vw] lg:max-w-[45vw] object-cover pointer-events-none opacity-90 select-none z-0"
        alt=""
      />
      <img
        src={getImageUrl("decorative/blue vector.svg")}
        alt=""
        className="hidden lg:block absolute bottom-0 left-52 w-[40%] object-contain pointer-events-none select-none z-0"
      />
      <img
        src={getImageUrl("decorative/bone.png")}
        alt=""
        className="hidden lg:block absolute bottom-3 left-[30%] w-[8%] object-contain pointer-events-none select-none z-30"
      />
      <img
        src={getImageUrl("decorative/bone.png")}
        alt=""
        className="hidden lg:block absolute bottom-2 left-[35%] w-[8%] object-contain pointer-events-none select-none z-30"
      />

      {/* Right Decorative Frame */}
      <img
        src={getImageUrl("icons/Right-login-frame.png")}
        className="hidden lg:block absolute right-0 top-0 h-full w-[240px] md:w-auto lg:max-w-[55vw] object-cover pointer-events-none opacity-90 select-none z-0"
        alt=""
      />

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6 lg:py-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center w-full">
          {/* ================= LEFT COLUMN ================= */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center gap-6 pr-4">
            <img
              src={getImageUrl("animals/cat-vector copy.png")}
              alt="cat-vector"
              className="absolute top-4 left-0 w-10 lg:w-12 object-contain pointer-events-none select-none"
            />

            {/* Header Content Box */}
            <div className="relative pl-12 lg:pl-16 max-w-[520px]">
              <div className="flex items-center gap-3">
                <h2 className="font-fredoka font-bold text-[#0A303A] leading-none text-3xl md:text-4xl lg:text-5xl">
                  Create Your
                </h2>
                <img
                  src={getImageUrl("decorative/arrow.png")}
                  alt=""
                  className="w-12 md:w-16 lg:w-20 select-none object-contain"
                />
              </div>

              <h3 className="font-fredoka mt-2 pl-4 font-bold text-[#0A303A] leading-none text-2xl md:text-3xl lg:text-4xl">
                Pet <span className="text-[#E06354]">Family!</span>
              </h3>

              <p className="font-poppins mt-4 font-semibold leading-relaxed text-sm md:text-base text-[#0A303A]/90">
                <span className="text-[#E06354]">Adopt</span>, care, and{" "}
                <span className="text-[#E06354]">connect</span> with ease. Join
                our community and make tails wag every day!
              </p>
            </div>

            {/* Illustration Canvas */}
            <div className="relative w-full max-w-[480px] mx-auto aspect-[4/3] flex items-end">
              {/* Red Background Vector */}
              <img
                src={getImageUrl("decorative/red-vector.svg")}
                alt=""
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] object-contain pointer-events-none select-none z-10"
              />

              {/* Dog / Pets Illustration */}
              <img
                src={getImageUrl("animals/dog.png")}
                alt="Pets illustration"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[75%] object-contain pointer-events-none select-none z-20"
              />

              {/* Accents */}
              <img
                src={getImageUrl("decorative/heart.png")}
                alt=""
                className="absolute top-2 right-16 w-[8%] object-contain pointer-events-none select-none z-30"
              />
              <img
                src={getImageUrl("decorative/paw.png")}
                alt=""
                className="absolute bottom-2 left-2 w-[14%] object-contain pointer-events-none select-none z-30"
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN: REGISTRATION FORM ================= */}
          <div className="w-full lg:col-span-5 max-w-[420px] sm:max-w-[480px] mx-auto">
            <div className="bg-white/90 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-3xl shadow-lg border border-white/60">
              {/* Logo Header */}
              <div className="text-center mb-3 sm:mb-4">
                <a
                  href="/"
                  className="inline-block transition-opacity hover:opacity-90 focus:outline-none rounded-lg"
                >
                  <img
                    src={getImageUrl("brand/Logo-for-bright-bg .png")}
                    alt="Fur & Feather Logo"
                    className="mx-auto w-28 sm:w-32 md:w-36 object-contain"
                  />
                </a>
              </div>

              {/* Title */}
              <h1 className="font-fredoka text-center font-bold text-[#0A303A] text-lg sm:text-xl md:text-2xl leading-tight mb-4">
                Open Your Heart, <span className="text-[#E06354]">Join Us</span>
              </h1>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="font-poppins space-y-3 sm:space-y-3.5"
              >
                {/* First & Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 font-bold text-xs text-[#0A303A]">
                      First Name
                    </label>
                    <div className="relative flex items-center">
                      <svg
                        className="w-4 h-4 absolute left-3.5 text-[#0A303A]/60 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        {...register("first_name")}
                        placeholder="First name"
                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-[#0A303A]/20 bg-white text-xs outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                      />
                    </div>
                    {errors.first_name && (
                      <p className="text-[#E06354] text-[10px] font-semibold mt-1">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-xs text-[#0A303A]">
                      Last Name
                    </label>
                    <div className="relative flex items-center">
                      <svg
                        className="w-4 h-4 absolute left-3.5 text-[#0A303A]/60 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        {...register("last_name")}
                        placeholder="Last name"
                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-[#0A303A]/20 bg-white text-xs outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                      />
                    </div>
                    {errors.last_name && (
                      <p className="text-[#E06354] text-[10px] font-semibold mt-1">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block mb-1 font-bold text-xs text-[#0A303A]">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      className="w-4 h-4 absolute left-3.5 text-[#0A303A]/60 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email"
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#0A303A]/20 bg-white text-xs outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[#E06354] text-[10px] font-semibold mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label className="block mb-1 font-bold text-xs text-[#0A303A]">
                    Phone Number{" "}
                    <span className="font-normal text-[#0A303A]/60">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      className="w-4 h-4 absolute left-3.5 text-[#0A303A]/60 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <input
                      type="tel"
                      // {...register("phone")}
                      placeholder="Enter phone number"
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#0A303A]/20 bg-white text-xs outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block mb-1 font-bold text-xs text-[#0A303A]">
                    Create Password
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      className="w-4 h-4 absolute left-3.5 text-[#0A303A]/60 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password1")}
                      placeholder="Create password"
                      className="w-full h-10 pl-10 pr-10 rounded-xl border border-[#0A303A]/20 bg-white text-xs outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(ShowPassword())}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 p-1 text-[#0A303A]/60 transition hover:text-[#0A303A]"
                    >
                      {showPassword ? (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7S3 14.5 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 3l18 18" />
                          <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c5 0 9 4.5 10 7a13.2 13.2 0 0 1-2.2 3.2M6.2 6.2C4 7.7 2.6 10 2 12c1 2.5 5 7 10 7 1.8 0 3.4-.5 4.8-1.3" />
                          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password1 && (
                    <p className="text-[#E06354] text-[10px] font-semibold mt-1">
                      {errors.password1.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block mb-1 font-bold text-xs text-[#0A303A]">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      className="w-4 h-4 absolute left-3.5 text-[#0A303A]/60 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password2")}
                      placeholder="Confirm password"
                      className="w-full h-10 pl-10 pr-10 rounded-xl border border-[#0A303A]/20 bg-white text-xs outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(ShowPassword())}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 p-1 text-[#0A303A]/60 transition hover:text-[#0A303A]"
                    >
                      {showPassword ? (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7S3 14.5 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 3l18 18" />
                          <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c5 0 9 4.5 10 7a13.2 13.2 0 0 1-2.2 3.2M6.2 6.2C4 7.7 2.6 10 2 12c1 2.5 5 7 10 7 1.8 0 3.4-.5 4.8-1.3" />
                          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password2 && (
                    <p className="text-[#E06354] text-[10px] font-semibold mt-1">
                      {errors.password2.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 sm:h-11 flex items-center justify-center gap-2 bg-[#E06354] text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all hover:bg-[#d45243] active:scale-[0.99] disabled:opacity-50 mt-2"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
                    <path d="M225.8 169.1c-16.2 0-31 6.5-42 17.5l-1.9 1.9c-11-11-25.9-17.5-42-17.5-32.9 0-59.5 26.6-59.5 59.5 0 25.4 15.8 47.1 38.1 55.7l50.2 110.2c5.3 11.6 16.9 19.1 29.7 19.1h.7c12.7-.2 24.1-7.8 29.2-19.4l49-110.7c21.8-8.8 37.1-30.3 37.1-55.4 0-32.9-26.7-59.5-59.6-59.5z" />
                  </svg>
                </button>
              </form>

              {/* Divider */}
              <div className="my-4 flex items-center gap-3">
                <span className="h-[1px] flex-1 bg-[#0A303A]/15"></span>
                <span className="text-[10px] sm:text-xs font-medium text-[#0A303A]/60 uppercase tracking-wider">
                  or continue with
                </span>
                <span className="h-[1px] flex-1 bg-[#0A303A]/15"></span>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="flex h-10 items-center justify-center rounded-xl border border-[#0A303A]/15 bg-white transition hover:bg-gray-50 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.1 3.57-5.17 3.57-8.81Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4.01-3.1Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.76c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.98 11.98 0 0 0 1.27 6.6l4.01 3.1C6.22 6.87 8.87 4.76 12 4.76Z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Continue with Facebook"
                  className="flex h-10 items-center justify-center rounded-xl border border-[#0A303A]/15 bg-white transition hover:bg-gray-50 active:scale-[0.98]"
                >
                  {isLoading ? (
                    "loading"
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#1877F2"
                        d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Login Link */}
              <p className="font-poppins mt-4 text-center text-xs font-medium text-[#0A303A]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#E06354] font-bold transition hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
