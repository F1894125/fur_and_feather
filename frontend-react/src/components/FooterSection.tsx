import React from "react";
import { getImageUrl } from "../utils/getImageUrl";

export const FooterSection: React.FC = () => (
  <footer className="footer-banner relative pt-24 pb-16 sm:pt-24 lg:pt-28 bg-[#0A303A] text-white">
    <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
      <div className="flex flex-wrap mx-[-15px]">
        <div className="max-w-full lg:max-w-[40%] lg:basis-[40%] lg:px-[15px]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 pt-12 lg:pt-0">
            <a
              href="index.html"
              className="block max-w-[260px] lg:max-w-[320px]"
            >
              <img
                src={getImageUrl("Logo.png")}
                alt="Footer Logo"
                className="w-full object-contain"
              />
            </a>
            <p className="max-w-full lg:max-w-[430px] text-[#F4F1EA] font-medium leading-relaxed text-xs sm:text-sm md:text-base">
              Some companions don't just enter your life. They become a part of
              who you are—through every ordinary moment and every unforgettable
              memory.
            </p>
            <div className="flex flex-wrap flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start items-center mt-4">
              <a
                href="contact.html"
                className="friend-btn inline-flex items-center justify-center gap-2 rounded-[30px] border-2 border-white bg-[--heading-text] px-5 py-3 text-sm font-bold text-[--primary-color-1] hover:text-[--btn-color]"
              >
                Contact Us <i className="fa-solid fa-paw"></i>
              </a>
              <a
                href="#"
                className="contact-btn inline-flex items-center justify-center gap-2 rounded-[30px] border-4 border-[#F4F1EA] bg-[--btn-color] px-5 py-3 text-sm font-bold text-white hover:text-[--btn-color]"
              >
                Adopt Now <i className="fa-solid fa-paw"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-full w-full lg:max-w-[20%] lg:basis-[20%] lg:px-[15px] mt-8 lg:mt-0">
          <div className="text-center lg:text-left">
            <span className="text-[--btn-color] font-semibold text-base sm:text-lg">
              Utility pages
            </span>
            <ul className="space-y-3 mt-4 text-xs sm:text-sm text-[#F4F1EA]">
              <li>
                <a
                  href="index.html"
                  className="hover:text-[--btn-color] transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="aboutus.html"
                  className="hover:text-[--btn-color] transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="blog.html"
                  className="hover:text-[--btn-color] transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="faq.html"
                  className="hover:text-[--btn-color] transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-full w-full lg:max-w-[20%] lg:basis-[20%] lg:px-[15px] mt-8 lg:mt-0">
          <div className="text-center lg:text-left">
            <span className="text-[--btn-color] font-semibold text-base sm:text-lg">
              Our Services
            </span>
            <ul className="space-y-3 mt-4 text-xs sm:text-sm text-[#F4F1EA]">
              <li>
                <a href="#" className="hover:text-[--btn-color] transition">
                  Adoption
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[--btn-color] transition">
                  Shelter Networking
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-full w-full lg:max-w-[20%] lg:basis-[20%] lg:px-[15px] mt-8 lg:mt-0">
          <div className="text-center lg:text-left">
            <span className="text-[--btn-color] font-semibold text-base sm:text-lg">
              Our Partners
            </span>
            <ul className="space-y-3 mt-4 text-xs sm:text-sm text-[#F4F1EA]">
              <li>PETA India</li>
              <li>Blue Cross of India</li>
              <li>People For Animals</li>
              <li>World Animal Protection</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#F4F1EA]/20 w-full h-[1px] my-8"></div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-[#F4F1EA]">
        <div>
          Copyright &copy; 2026{" "}
          <a href="index.html" className="hover:text-[--btn-color] font-bold">
            Fur & Feather.
          </a>{" "}
          All Rights Reserved.
        </div>
        <ul className="flex gap-4 text-lg">
          <li>
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook hover:text-[--btn-color]"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram hover:text-[--btn-color]"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in hover:text-[--btn-color]"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter hover:text-[--btn-color]"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="absolute left-0 bottom-0 z-10 w-[120px] sm:w-[160px] pointer-events-none opacity-50 lg:opacity-100">
      <img
        src={getImageUrl("left-footer.png")}
        alt="footer decoration"
        className="w-full object-contain"
        loading="lazy"
      />
    </div>
  </footer>
);
