import React from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { FaPaw } from "react-icons/fa";

export const BannerSection: React.FC = () => (
  <section
    className="relative min-h-[700px] bg-cover bg-center bg-no-repeat pt-16 md:pt-24 pb-16 px-5 md:px-10 lg:px-20 flex items-center"
    style={{
      backgroundImage: `url(${getImageUrl("backgrounds/Hero Banner.png")})`,
    }}
  >
    {/* Optional subtle overlay to ensure text contrast */}
    <div className="absolute inset-0 pointer-events-none" />

    <div className="relative z-10 max-w-[1350px] w-full mx-auto px-4 sm:px-5 lg:px-[15px]">
      <div className="max-w-[700px] xl:max-w-[850px] text-center min-[992px]:text-left">
        {/* Main Heading */}
        <h1 className="font-fredoka font-semibold text-4xl sm:text-5xl lg:text-[60px] leading-[1.2] lg:leading-[1.3] tracking-[2px] lg:tracking-[3px] text-white drop-shadow-sm">
          Some Are Fluffy. Some Have Feathers. All Need Love.
        </h1>

        {/* Subtext */}
        <p className="mt-6 mb-9 max-w-[620px] mx-auto min-[992px]:mx-0 font-poppins font-medium text-base sm:text-lg leading-[1.66] text-white/90 drop-shadow-sm">
          Behind every tiny paw, gentle hop, playful chirp, and happy tail is a
          friend waiting to be chosen. Give them the happy ending they've been
          hoping for.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col min-[480px]:flex-row gap-4 items-center justify-center min-[992px]:justify-start">
          {/* Primary Button */}
          <a
            href="#"
            className="friend-btn inline-flex items-center justify-center gap-2 w-full min-[480px]:w-auto px-6 py-3.5 bg-[#f4f1ea] hover:bg-[#F04336] font-poppins text-sm sm:text-base font-extrabold text-[#0A303A] hover:text-white border-2 border-[#0A303A] hover:border-white rounded-full shadow-lg transition-all duration-300"
          >
            <span>Find Your Forever Friend</span>
            <FaPaw size="1.25rem" />
          </a>

          {/* Secondary Button */}
          <a
            href="#"
            className="contact-btn inline-flex items-center justify-center gap-2 w-full min-[480px]:w-auto px-6 py-3.5 bg-[#F04336] hover:bg-white font-poppins text-sm sm:text-base font-bold text-white hover:text-[#0A303A] border-2 border-[#F4F1EA] hover:border-[#F04336] rounded-full shadow-lg transition-all duration-300"
          >
            <span>View Shelters</span>
            <FaPaw size="1.25rem" />
          </a>
        </div>

        {/* Social Proof Badge */}
        <div className="bg-white shadow-lg p-6 mt-9 rounded-[35px] max-w-[400px] mx-auto min-[992px]:mx-0">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <img
              src={getImageUrl("icons/adopter.png")}
              alt="Adopters"
              loading="lazy"
              className=""
            />
            <span className="font-poppins text-2xl font-bold text-[#0A303A] leading-tight ">
              More Than 150k+ adopters around the world
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
