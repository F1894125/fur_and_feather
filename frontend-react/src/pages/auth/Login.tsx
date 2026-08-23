// import React, { useState,} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginUserThunk, ShowPassword } from "../../store/slices/authSlice";
import type { LoginPayload } from "../../interfaces/auth.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../services/validation/loginValidation";
import { FaPaw } from "react-icons/fa";
import { getImageUrl } from "../../utils/getImageUrl";
// import { PawIcon } from "../PetAdoptionPage";

export default function LoginForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { showPassword, isLoading } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  // const getImageUrl = (name: string): string => {
  //   return new URL(`../../assets/images/${name}`, import.meta.url).href;
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await dispatch(loginUserThunk(data)).unwrap();
      console.log(res);

      if (res.user) {
        console.log("role--->", res.user.role);
        if (res.user.role === "admin") {
          console.log("role--->", res.user.role);
          navigate("/admin/");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error", error);
      navigate("/signup");
    }
  };

  if (isLoading) {
    <div>Loading......</div>;
  }

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
        alt="bone"
        className="hidden lg:block absolute bottom-3 left-[30%] w-[8%] object-contain pointer-events-none select-none z-30"
      />
      <img
        src={getImageUrl("decorative/bone.png")}
        alt="bone"
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
          {/* ================= LEFT COLUMN (RESTRUCTURED & SIMPLIFIED) ================= */}
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
                  Welcome
                </h2>
                <img
                  src={getImageUrl("decorative/arrow.png")}
                  alt="arrow"
                  className="w-12 md:w-16 lg:w-20 select-none object-contain"
                />
              </div>

              <h3 className="font-fredoka mt-2 pl-4 font-bold text-[#0A303A] leading-none text-2xl md:text-3xl lg:text-4xl">
                Back <span className="text-[#E06354]">Friend!</span>
              </h3>

              <p className="font-poppins mt-4 font-semibold leading-relaxed text-sm md:text-base text-[#0A303A]/90">
                Welcome back! Continue exploring
                <span className="text-[#E06354]"> loving companions</span> and
                make every login the start of a
                <span className="text-[#E06354]"> new friendship.</span>
              </p>
            </div>

            {/* Illustration Canvas (All absolute elements stay inside relative boundaries) */}
            <div className="relative w-full max-w-[480px] mx-auto aspect-[4/3] flex items-end">
              {/* Blue Vector: Fixed cleanly to the bottom */}

              {/* Red Background Vector */}
              <img
                src={getImageUrl("decorative/red-vector.svg")}
                alt=""
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] object-contain pointer-events-none select-none z-10"
              />

              {/* Dog Illustration */}
              <img
                src={getImageUrl("animals/dog.png")}
                alt="Pet dog illustration"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[75%] object-contain pointer-events-none select-none z-20"
              />

              {/* Foreground Accents: Heart, Paw, and Bones */}
              <img
                src={getImageUrl("decorative/heart.png")}
                alt="heart"
                className="absolute top-2 right-16 w-[8%] object-contain pointer-events-none select-none z-30"
              />
              <img
                src={getImageUrl("decorative/paw.png")}
                alt=""
                className="absolute bottom-2 left-2 w-[14%] object-contain pointer-events-none select-none z-30"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: LOGIN FORM */}
          <div className="w-full lg:col-span-5 max-w-[420px] sm:max-w-[460px] mx-auto">
            <div className="bg-white/90 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-3xl shadow-lg border border-white/60">
              {/* Logo Header */}
              <div className="text-center mb-3 sm:mb-4 rounded-xl">
                <a
                  href="/login"
                  className="inline-block transition-opacity hover:opacity-90 focus:outline-none rounded-lg"
                >
                  <img
                    src={getImageUrl("brand/Logo-for-bright-bg .png")}
                    alt="Fur & Feather Logo"
                    className="mx-auto w-32 md:w-36 lg:w-64 object-contain"
                  />
                </a>
              </div>

              {/* Title */}
              <h1 className="font-fredoka text-center font-bold text-[#0A303A] text-lg sm:text-xl md:text-2xl leading-tight mb-5">
                Welcome Back To{" "}
                <span className="text-[#E06354]">Compassion</span>
              </h1>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="font-poppins space-y-3.5 sm:space-y-4"
              >
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-bold text-xs sm:text-sm text-[#0A303A]"
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 22 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pointer-events-none absolute left-3.5 sm:left-4 text-[#0A303A]/60"
                    >
                      <path
                        d="M5.75 5.75L8.69202 7.4894C10.4072 8.5035 11.0928 8.5035 12.808 7.4894L15.75 5.75M0.76577 10.7256C0.83114 13.7912 0.86383 15.3239 1.99496 16.4594C3.12608 17.5948 4.70033 17.6343 7.84883 17.7134C9.7893 17.7622 11.7107 17.7622 13.6512 17.7134C16.7997 17.6343 18.3739 17.5948 19.5051 16.4594C20.6362 15.3239 20.6689 13.7912 20.7342 10.7256C20.7553 9.7399 20.7553 8.7601 20.7342 7.7744C20.6689 4.70886 20.6362 3.17609 19.5051 2.04066C18.3739 0.905231 16.7997 0.865681 13.6512 0.786571C11.7107 0.737811 9.7893 0.737811 7.84882 0.786561C4.70033 0.865661 3.12608 0.905211 1.99495 2.04065C0.86382 3.17608 0.83114 4.70885 0.76576 7.7744C0.74474 8.7601 0.74475 9.7399 0.76577 10.7256Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email"
                      className={`w-full h-10 sm:h-11 pl-10 sm:pl-12 pr-4 rounded-xl border bg-white text-xs sm:text-sm outline-none transition placeholder:text-[#0A303A]/40 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-[#0A303A]/20 focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20"
                      }`}
                    />
                  </div>
                  <p className="text-red-400 pt-1">{errors.email?.message}</p>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 font-bold text-xs sm:text-sm text-[#0A303A]"
                  >
                    Password
                  </label>

                  <div className="relative flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pointer-events-none absolute left-3.5 sm:left-4 text-[#0A303A]/60"
                    >
                      <path
                        opacity="0.8"
                        d="M17.8611 9.85751C17.2807 9.512 16.6121 9.3012 15.8994 9.26891C14.1744 9.19076 12.422 9.15 10.4922 9.15C8.56237 9.15 6.80996 9.19076 5.08486 9.26891C3.0347 9.36179 1.34999 10.932 1.07614 12.9364C0.8974 14.2444 0.75 15.5849 0.75 16.95C0.75 18.3151 0.897412 19.6556 1.07614 20.9636C1.34999 22.968 3.0347 24.5382 5.08486 24.6311C6.80996 24.7092 8.56237 24.75 10.4922 24.75C12.2422 24.75 13.8465 24.7165 15.4167 24.652M5.02778 9.15V6.15C5.02778 3.16766 7.49021 0.75 10.5278 0.75C13.5654 0.75 16.0278 3.16766 16.0278 6.15V9.15M11.9028 16.95H11.75M20.4583 24.45H20.3056M7.01389 16.95H6.86111M17.8611 16.35C17.8611 15.0245 18.9555 13.95 20.3056 13.95C21.6556 13.95 22.75 15.0245 22.75 16.35C22.75 17.0434 22.4506 17.668 21.9717 18.1061C21.231 18.7838 20.3056 19.5559 20.3056 20.55M12.0556 16.95C12.0556 17.1157 11.9188 17.25 11.75 17.25C11.5812 17.25 11.4444 17.1157 11.4444 16.95C11.4444 16.7843 11.5812 16.65 11.75 16.65C11.9188 16.65 12.0556 16.7843 12.0556 16.95ZM20.6111 24.45C20.6111 24.6157 20.4743 24.75 20.3056 24.75C20.1368 24.75 20 24.6157 20 24.45C20 24.2843 20.1368 24.15 20.3056 24.15C20.4743 24.15 20.6111 24.2843 20.6111 24.45ZM7.16667 16.95C7.16667 17.1157 7.02986 17.25 6.86111 17.25C6.69236 17.25 6.55556 17.1157 6.55556 16.95C6.55556 16.7843 6.69236 16.65 6.86111 16.65C7.02986 16.65 7.16667 16.7843 7.16667 16.95Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password")}
                      // value={formData.password}
                      // onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full h-10 sm:h-11 pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-xl border border-[#0A303A]/20 bg-white text-xs sm:text-sm outline-none transition focus:border-[#0A303A] focus:ring-2 focus:ring-[#0A303A]/20 placeholder:text-[#0A303A]/40"
                    />

                    {/* Toggle Password Visibility */}
                    <button
                      type="button"
                      onClick={() => dispatch(ShowPassword())}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2.5 sm:right-3 p-1 text-[#0A303A]/60 transition hover:text-[#0A303A]"
                    >
                      {showPassword ? (
                        <svg
                          className="w-4 sm:w-5 h-4 sm:h-5"
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
                          className="w-4 sm:w-5 h-4 sm:h-5"
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

                  <div className="w-full text-right mt-1">
                    <a
                      href="/forgot-password"
                      className="text-[11px] sm:text-xs font-semibold text-[#0A303A]/80 transition hover:text-[#E06354] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <p className="text-red-400">{errors.password?.message}</p>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    // checked={formData.remember}
                    // onChange={handleChange}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-[#0A303A]/30 text-[#E06354] focus:ring-[#E06354]/20 cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs sm:text-sm font-medium text-[#0A303A]/90 cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-10 sm:h-11 flex items-center justify-center gap-2 bg-[#E06354] text-white font-semibold text-xs sm:text-sm md:text-base rounded-xl shadow transition-all hover:bg-[#d45243] active:scale-[0.99]"
                >
                  {isLoading ? "Loading" : "Log In"}
                  <FaPaw />
                </button>
              </form>

              {/* Divider */}
              <div className="my-4 sm:my-5 flex items-center gap-3">
                <span className="h-[1px] flex-1 bg-[#0A303A]/15"></span>
                <span className="text-[10px] sm:text-xs font-medium text-[#0A303A]/60 uppercase tracking-wider">
                  or continue with
                </span>
                <span className="h-[1px] flex-1 bg-[#0A303A]/15"></span>
              </div>

              {/* Social Login Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="flex h-10 sm:h-11 items-center justify-center rounded-xl border border-[#0A303A]/15 bg-white transition hover:bg-gray-50 active:scale-[0.98]"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 24 24">
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
                  className="flex h-10 sm:h-11 items-center justify-center rounded-xl border border-[#0A303A]/15 bg-white transition hover:bg-gray-50 active:scale-[0.98]"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 24 24">
                    <path
                      fill="#1877F2"
                      d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z"
                    />
                  </svg>
                </button>
              </div>

              {/* Signup Link */}
              <p className="font-poppins mt-4 sm:mt-5 text-center text-xs sm:text-sm font-medium text-[#0A303A]">
                New here?{" "}
                <a
                  href="/signup"
                  className="text-[#E06354] font-bold transition hover:underline"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
