import React from "react";
import { getImageUrl } from "../utils/getImageUrl";

export const NewsletterSection: React.FC = () => (
  <section className="pt-14 pb-0 sm:pt-16 lg:py-14">
    <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
      <div className="max-w-[760px] mx-auto relative">
        <img
          src={getImageUrl("animals/left-dog.png")}
          alt="left-dog"
          className="absolute hidden min-[992px]:block -left-[80px] xl:-left-[127px] top-[3px] w-20 xl:w-32 object-contain"
          loading="lazy"
        />
        <div className="border border-[#1F506D] rounded-[21px] bg-[#F5F1E8] p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-[--btn-color] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold whitespace-nowrap font-fredoka">
              Newsletter
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col min-[480px]:flex-row w-full gap-4"
            >
              <input
                id="email"
                type="email"
                placeholder="Enter your E-mail ID"
                className="flex-1 border border-[--btn-color] px-4 py-3 text-xs sm:text-sm md:text-base outline-none placeholder:text-[#f04336] bg-transparent rounded-xl"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 border border-[--btn-color] font-[family-name:--font-poppins] text-sm sm:text-base md:text-lg font-bold text-[#F04336] hover:bg-[--btn-color] hover:text-white transition rounded-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <img
          src={getImageUrl("animals/right-dog.png")}
          alt="right-dog"
          className="absolute hidden min-[992px]:block -right-[80px] xl:-right-[127px] top-0 w-20 xl:w-32 object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);