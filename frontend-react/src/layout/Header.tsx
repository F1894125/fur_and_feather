import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { logOut } from "../store/slices/authSlice";
import { FaPaw } from "react-icons/fa";
import { getImageUrl } from "../utils/getImageUrl";

export default function HeaderNav(): React.JSX.Element {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const toggleDropdown = (name: string): void => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

  const handleToggleBtn = () => {
    if (isAuthenticated) {
      dispatch(logOut());
    } else {
      navigate("/login");
    }
  };
  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  // Dynamic class styling for NavLinks with sliding underline
  const navLinkStyle = ({ isActive }: { isActive: boolean }): string =>
    `relative font-sans text-base font-semibold transition duration-300 hover:text-[#FF7043] hover:scale-105 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:bg-[#FF7043] after:transition-transform after:duration-300 after:origin-bottom-left ${
      isActive
        ? "text-[#F04336] after:scale-x-100"
        : "text-[#0A303A] after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <nav
      id="main-navigation"
      className="fixed top-0 left-0 w-full z-[999] shadow-sm pt-3"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img
          src={getImageUrl("icons/header.png")}
          alt=""
          className="w-full h-full object-cover md:object-fill"
        />
      </div>

      <div className="max-w-full h-[160px] px-4 sm:px-5 lg:px-4">
        {/* Top Sub-Nav Bar */}
        <div className="flex flex-col min-[992px]:flex-row min-[992px]:items-center justify-between gap-2 pb-2">
          {/* Address */}
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 30"
              className="w-4 h-4 min-[992px]:w-5 min-[992px]:h-5 text-[#0A303A]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.125 23.4C2.61022 23.9764 1 24.862 1 25.8552C1 27.592 5.92486 29 12 29C18.0752 29 23 27.592 23 25.8552C23 24.862 21.3897 23.9764 18.875 23.4M15.4375 10.8C15.4375 12.733 13.8985 14.3 12 14.3C10.1015 14.3 8.5625 12.733 8.5625 10.8C8.5625 8.86701 10.1015 7.3 12 7.3C13.8985 7.3 15.4375 8.86701 15.4375 10.8ZM13.7289 22.691C13.2651 23.1458 12.6453 23.4 12.0003 23.4C11.3551 23.4 10.7353 23.1458 10.2715 22.691C6.02466 18.5011 0.333386 13.8205 3.10885 7.02522C4.60951 3.35105 8.21179 1 12.0003 1C15.7887 1 19.3909 3.35106 20.8916 7.02522C23.6636 13.812 17.9862 18.5155 13.7289 22.691Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-sans text-xs sm:text-sm font-medium text-[#0A303A]">
              4517 Washington Ave. Manchester, Kentucky, 495
            </span>
          </div>

          {/* Email & Social Icons */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 min-[992px]:gap-6">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="18"
                viewBox="0 0 26 22"
                className="w-4 h-4 text-[#0A303A]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99999 6.88235L10.5304 8.92871C12.5886 10.1218 13.4113 10.1218 15.4696 8.92871L19 6.88235M1.01892 12.736C1.09737 16.3426 1.1366 18.1458 2.49395 19.4816C3.85129 20.8174 5.74039 20.8639 9.51859 20.9569C11.8471 21.0144 14.1528 21.0144 16.4814 20.9569C20.2596 20.8639 22.1487 20.8174 23.5061 19.4816C24.8634 18.1458 24.9026 16.3426 24.981 12.736C25.0063 11.5764 25.0063 10.4236 24.981 9.264C24.9026 5.65748 24.8634 3.85422 23.5061 2.51842C22.1487 1.18262 20.2596 1.1361 16.4814 1.04303C14.1528 0.98566 11.8471 0.98566 9.51857 1.04301C5.74039 1.13607 3.85129 1.1826 2.49394 2.51841C1.13658 3.85421 1.09737 5.65747 1.01891 9.264C0.993688 10.4236 0.9937 11.5764 1.01892 12.736Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <a
                href="mailto:info@petzorg.com"
                className="font-sans text-xs sm:text-sm font-medium text-[#0A303A] hover:text-[#F04336] transition-colors"
              >
                info@petzorg.com
              </a>
            </div>

            <ul className="flex items-center gap-2">
              <li className="bg-[#0A303A] w-7 h-7 rounded-full flex items-center justify-center transition duration-300 hover:bg-[#F04336] hover:scale-105">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 14 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.76299 8.24997C0.924908 8.24997 0.75 8.42268 0.75 9.24996V10.75C0.75 11.5774 0.924908 11.75 1.76299 11.75H3.78896V17.75C3.78896 18.5773 3.96387 18.75 4.80195 18.75H6.82791C7.66603 18.75 7.84089 18.5773 7.84089 17.75V11.75H10.1157C10.7514 11.75 10.9152 11.628 11.0898 11.0248L11.5239 9.52473C11.823 8.49126 11.6387 8.24997 10.5499 8.24997H7.84089V5.75C7.84089 5.19772 8.2944 4.75 8.85386 4.75H11.737C12.5751 4.75 12.75 4.57733 12.75 3.75V1.75C12.75 0.922665 12.5751 0.75 11.737 0.75H8.85386C6.05657 0.75 3.78896 2.98858 3.78896 5.75V8.24997H1.76299Z"
                      stroke="#F4F1EA"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li className="bg-[#0A303A] w-7 h-7 rounded-full flex items-center justify-center transition duration-300 hover:bg-[#F04336] hover:scale-105">
                <a
                  href="https://www.instagram.com/tanmoy_9088"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5276 4.08355H13.4165M0.75 8.75C0.75 4.97876 0.75 3.09315 1.92157 1.92157C3.09315 0.75 4.97876 0.75 8.75 0.75C12.5212 0.75 14.4069 0.75 15.5784 1.92157C16.75 3.09315 16.75 4.97876 16.75 8.75C16.75 12.5212 16.75 14.4069 15.5784 15.5784C14.4069 16.75 12.5212 16.75 8.75 16.75C4.97876 16.75 3.09315 16.75 1.92157 15.5784C0.75 14.4069 0.75 12.5212 0.75 8.75ZM12.3056 8.75C12.3056 10.7136 10.7136 12.3056 8.75 12.3056C6.78632 12.3056 5.19444 10.7136 5.19444 8.75C5.19444 6.78632 6.78632 5.19444 8.75 5.19444C10.7136 5.19444 12.3056 6.78632 12.3056 8.75ZM13.6387 4.08355C13.6387 4.20628 13.5392 4.30577 13.4165 4.30577C13.2937 4.30577 13.1943 4.20628 13.1943 4.08355C13.1943 3.96082 13.2937 3.86132 13.4165 3.86132C13.5392 3.86132 13.6387 3.96082 13.6387 4.08355Z"
                      stroke="#F4F1EA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li className="bg-[#0A303A] w-7 h-7 rounded-full flex items-center justify-center transition duration-300 hover:bg-[#F04336] hover:scale-105">
                <a
                  href="https://www.youtube.com/tanmoy_9088"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Youtube"
                >
                  <img
                    src={getImageUrl("icons/Frame 37.svg")}
                    alt=""
                    className="w-16"
                  />
                </a>
              </li>
              <li className="bg-[#0A303A] w-7 h-7 rounded-full flex items-center justify-center transition duration-300 hover:bg-[#F04336] hover:scale-105">
                <a
                  href="https://www.youtube.com/tanmoy_9088"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Youtube"
                >
                  <img
                    src={getImageUrl("icons/Frame 38.svg")}
                    alt=""
                    className="w-16"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#0A303A]/20 my-2" />

        <div>
          {/* Primary Row */}
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="block max-w-[140px] sm:max-w-[170px]">
              <img
                src={getImageUrl("brand/Logo-for-bright-bg .png")}
                alt="Fur & Feather Logo"
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Items */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
              <li>
                <NavLink to="/" end className={navLinkStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <div className="relative group">
                  <NavLink to="/petpages" className={navLinkStyle}>
                    <div className="flex gap-1">
                      {" "}
                      <span>Pages</span>
                      {/* Animated Chevron Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </NavLink>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full z-50 w-40 mt-2 p-2 border-2 bg-[#f4f1ea] rounded-md shadow-lg opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out">
                    <ul className="text-center font-poppins flex flex-col justify-center items-centers space-y-2">
                      <NavLink
                        to="/aboutus"
                        className="hover:text-[#F04336] cursor-pointer"
                      >
                        About Us
                      </NavLink>
                      <NavLink
                        to="/blog"
                        className="hover:text-[#F04336] cursor-pointer"
                      >
                        Blog
                      </NavLink>
                      <NavLink
                        to="/faq"
                        className="hover:text-[#F04336] cursor-pointer"
                      >
                        FAQ
                      </NavLink>
                      <NavLink
                        to="/testimonials"
                        className="hover:text-[#F04336] cursor-pointer"
                      >
                        Testimonials
                      </NavLink>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <NavLink to="/petspage" className={navLinkStyle}>
                  Pets
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={navLinkStyle}>
                  Shelters
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={navLinkStyle}>
                  Contact Us
                </NavLink>
              </li>
            </ul>

            {/* Action Icons & Hamburger */}
            <div className="flex items-center gap-3">
              <div
                className={`relative flex gap-1 isolate ${isAuthenticated ? "hidden" : "block"} overflow-hidden items-center gap-2 bg-[#F04336] border-2 border-[#F4F1EA] shadow-md px-4 py-2 rounded-full font-sans font-bold text-sm text-white hover:text-[#111111] hover:border-[#F04336] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:bg-white before:-translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:ease-in-out`}
              >
                <button onClick={handleToggleBtn}>Login</button>
                <span>
                  <FaPaw />
                </span>
              </div>

              {/* Profile Avatar & Dropdown Container */}
              <div className="relative">
                <button
                  onClick={handleProfile}
                  type="button"
                  className="block w-8 h-8 rounded-full overflow-hidden border border-[#0A303A]/20 focus:outline-none focus:ring-2 focus:ring-[#FF7043]"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={getImageUrl("icons/user.png")}
                    className="w-full h-full object-cover"
                    alt="User profile"
                    loading="lazy"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#0A303A] hover:bg-orange-50 hover:text-[#FF7043] transition-colors"
                    >
                      <i className="fa-regular fa-user text-xs w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#0A303A] hover:bg-orange-50 hover:text-[#FF7043] transition-colors"
                    >
                      <i className="fa-solid fa-table-columns text-xs w-4" />
                      Dashboard
                    </Link>
                    <div className="h-[1px] bg-gray-100 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleToggleBtn();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket text-xs w-4" />
                      {isAuthenticated ? "Logout" : "Login"}
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="lg:hidden text-2xl text-[#0A303A] focus:outline-none p-1 transition-transform hover:scale-105 active:scale-95"
                aria-label="Toggle navigation menu"
              >
                <i
                  className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* Mobile Slide Drawer */}
        <div
          className={`fixed top-0 h-screen w-[80%] max-w-[320px] bg-white shadow-xl transition-all duration-300 z-[] p-5 flex flex-col justify-between overflow-y-auto lg:hidden ${
            isMobileMenuOpen ? "left-0" : "left-[-100%]"
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block max-w-[130px]"
              >
                <img
                  src={getImageUrl("brand/Logo-for-bright-bg.png")}
                  alt="Fur & Feather Logo"
                />
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#0A303A] hover:bg-gray-100 transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>

            {/* Navigation List with Dropdown Accordions */}
            <ul className="flex flex-col gap-1 py-4">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-orange-50 text-[#FF7043]"
                        : "text-[#0A303A] hover:bg-gray-50"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* Expandable "Pages" Dropdown */}
              <li>
                <button
                  type="button"
                  onClick={() => toggleDropdown("pages")}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-medium text-[#0A303A] hover:bg-gray-50 transition-colors"
                >
                  <span>Pages</span>
                  <i
                    className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                      openMobileDropdown === "pages"
                        ? "rotate-180 text-[#FF7043]"
                        : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    openMobileDropdown === "pages"
                      ? "grid-rows-[1fr] opacity-100 mt-1"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden flex flex-col pl-4 border-l-2 border-orange-200 ml-3 space-y-1">
                    <NavLink
                      to="/petpages"
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `py-1.5 px-2 text-sm rounded ${
                          isActive
                            ? "text-[#FF7043] font-semibold"
                            : "text-gray-600"
                        }`
                      }
                    >
                      All Pet Pages
                    </NavLink>
                    <NavLink
                      to="/petpages/faq"
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `py-1.5 px-2 text-sm rounded ${
                          isActive
                            ? "text-[#FF7043] font-semibold"
                            : "text-gray-600"
                        }`
                      }
                    >
                      FAQ & Support
                    </NavLink>
                  </div>
                </div>
              </li>

              {/* Expandable "Services" Dropdown */}
              <li>
                <button
                  type="button"
                  onClick={() => toggleDropdown("services")}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-medium text-[#0A303A] hover:bg-gray-50 transition-colors"
                >
                  <span>Services</span>
                  <i
                    className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                      openMobileDropdown === "services"
                        ? "rotate-180 text-[#FF7043]"
                        : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    openMobileDropdown === "services"
                      ? "grid-rows-[1fr] opacity-100 mt-1"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden flex flex-col pl-4 border-l-2 border-orange-200 ml-3 space-y-1">
                    <NavLink
                      to="/services"
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `py-1.5 px-2 text-sm rounded ${
                          isActive
                            ? "text-[#FF7043] font-semibold"
                            : "text-gray-600"
                        }`
                      }
                    >
                      All Services
                    </NavLink>
                    <NavLink
                      to="/services/adoption"
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `py-1.5 px-2 text-sm rounded ${
                          isActive
                            ? "text-[#FF7043] font-semibold"
                            : "text-gray-600"
                        }`
                      }
                    >
                      Pet Adoption
                    </NavLink>
                  </div>
                </div>
              </li>

              <li>
                <NavLink
                  to="/blog"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-orange-50 text-[#FF7043]"
                        : "text-[#0A303A] hover:bg-gray-50"
                    }`
                  }
                >
                  Shelters / Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-orange-50 text-[#FF7043]"
                        : "text-[#0A303A] hover:bg-gray-50"
                    }`
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Drawer Footer Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                handleToggleBtn();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0A303A] text-white py-2.5 rounded-full font-bold text-sm hover:bg-[#F04336] transition-colors"
            >
              {isAuthenticated ? "Logout" : "Login"}{" "}
              <i className="fa-solid fa-user text-xs" />
            </button>

            <Link
              to="/shop"
              onClick={closeMobileMenu}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#FF7043] border-2 border-[#F4F1EA] px-4 py-2.5 rounded-full font-bold text-sm text-white hover:bg-[#0A303A] transition duration-300"
            >
              Contact Us <i className="fa-solid fa-paw" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
