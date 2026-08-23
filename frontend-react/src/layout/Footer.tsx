import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";

export const FooterSection: React.FC = () => (
  <footer className="footer-banner relative overflow-hidden pt-20 pb-12 sm:pt-24 lg:pt-28 bg-[#0A303A] text-white">
    {/* Full Footer Background Image */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img
        src={getImageUrl("backgrounds/footer-background.jpg")}
        alt=""
        className="w-full h-full object-cover "
      />
    </div>

    {/* Content Container */}
    <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
      <div className="flex flex-wrap mx-[-15px]">
        {/* Brand & Description Column */}
        <div className="max-w-full lg:max-w-[40%] lg:basis-[40%] lg:px-[15px]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 pt-12 lg:pt-0">
            <Link to="/" className="block max-w-[260px] lg:max-w-[320px]">
              <img
                src={getImageUrl("brand/footer-logo.png")}
                alt="Footer Logo"
                className="w-full object-contain"
              />
            </Link>
            <p className="max-w-full lg:max-w-[430px] text-[#F4F1EA] font-medium leading-relaxed text-xs sm:text-sm md:text-base">
              Some companions don't just enter your life. They become a part of
              who you are—through every ordinary moment and every unforgettable
              memory.
            </p>
            <div className="flex flex-wrap flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start items-center mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[30px] border-2 border-white bg-white px-5 py-3 text-sm font-bold text-[#0A303A] hover:bg-[#FF7043] hover:border-[#FF7043] hover:text-white transition-all duration-300"
              >
                Contact Us <i className="fa-solid fa-paw"></i>
              </Link>
              <Link
                to="/pages"
                className="inline-flex items-center justify-center gap-2 rounded-[30px] border-2 border-[#FF7043] bg-[#FF7043] px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#0A303A] hover:border-white transition-all duration-300"
              >
                Adopt Now <i className="fa-solid fa-paw"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Utility Pages Column */}
        <div className="max-w-full w-full lg:max-w-[20%] lg:basis-[20%] lg:px-[15px] mt-8 lg:mt-0">
          <div className="text-center lg:text-left">
            <span className="text-[#FF7043] font-bold text-base sm:text-lg block tracking-wider">
              Utility pages
            </span>
            <ul className="space-y-3 mt-4 text-xs text-[#b1b1b1]">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#FF7043] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#FF7043] transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-[#FF7043] transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-[#FF7043] transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Our Services Column */}
        <div className="max-w-full w-full lg:max-w-[20%] lg:basis-[20%] lg:px-[15px] mt-8 lg:mt-0">
          <div className="text-center lg:text-left">
            <span className="text-[#FF7043] font-bold text-base sm:text-lg block tracking-wider">
              Our Services
            </span>
            <ul className="space-y-3 mt-4 text-xs text-[#b1b1b1]">
              <li>
                <Link
                  to="/pets"
                  className="hover:text-[#FF7043] transition-colors duration-200"
                >
                  Adoption
                </Link>
              </li>
              <li>
                <Link
                  to="/shelters"
                  className="hover:text-[#FF7043] transition-colors duration-200"
                >
                  Shelter Networking
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Our Partners Column */}
        <div className="max-w-full w-full lg:max-w-[20%] lg:basis-[20%] lg:px-[15px] mt-8 lg:mt-0">
          <div className="text-center lg:text-left">
            <span className="text-[#FF7043] font-bold text-base sm:text-lg block tracking-wider">
              Our Partners
            </span>
            <ul className="space-y-3 mt-4 text-sm md:text-xs text-[#b1b1b1]">
              <li>PETA India</li>
              <li>Blue Cross of India</li>
              <li>People For Animals</li>
              <li>World Animal Protection</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#F4F1EA]/20 w-full h-[1px] my-8"></div>

      {/* Bottom Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-[#F4F1EA]">
        <div>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <Link to="/" className="text-[#FF7043] hover:underline font-bold">
            Fur & Feather.{" "}
          </Link>
          All Rights Reserved.
        </div>
        <ul className="flex gap-4 text-lg">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook hover:text-[#FF7043] transition-colors"></i>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram hover:text-[#FF7043] transition-colors"></i>
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in hover:text-[#FF7043] transition-colors"></i>
            </a>
          </li>
          <li>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-x-twitter hover:text-[#FF7043] transition-colors"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Footer Background Graphic */}
    <div className="absolute left-0 bottom-0 z-10 w-[120px] sm:w-[160px] pointer-events-none opacity-50 lg:opacity-100">
      <img
        src={getImageUrl("icons/left-footer.png")}
        alt="footer decoration"
        className="w-full object-contain"
        loading="lazy"
      />
    </div>
  </footer>
);
