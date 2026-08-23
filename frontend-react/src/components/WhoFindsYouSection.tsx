import React from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { FaPaw } from "react-icons/fa";

export const WhoFindsYouSection: React.FC = () => (
  <section className="bg-[#D5E6EB] pt-12 pb-14 lg:py-[80px] xl:py-[130px] 2xl:pt-[187px] 2xl:pb-[140px]">
    <div className="mx-auto max-w-[1350px] px-4 sm:px-5 lg:px-[15px]">
      <div className="relative text-center min-[992px]:text-left">
        <div className="font-[family-name:--font-Fredoka] text-xl font-bold leading-[0.98] tracking-wide text-[#0A303A] sm:text-2xl md:text-3xl min-[992px]:text-4xl lg:text-5xl xl:text-6xl [text-shadow:5px_2px_4px_rgba(0,0,0,0.3)]">
          Find the One Who Finds You.
        </div>

        <img
          src={getImageUrl("animals/finds-dog.png")}
          className="absolute bottom-[-311px] lg:bottom-[-333px] xl:bottom-[-425px] 2xl:bottom-[-438px] right-0 z-10 hidden min-[992px]:block min-[992px]:max-w-[290px] lg:max-w-[338px] xl:max-w-[430px] 2xl:max-w-[480px] object-contain"
          alt="Dog"
        />
      </div>
      <p className="mt-4 sm:mt-8 text-center min-[992px]:text-left text-[#38535B] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-normal max-w-[500px] lg:max-w-[620px] mx-auto min-[992px]:mx-0 font-['Poppins']">
        At Fur & Feather, we make pet adoption simple, trusted, and full of
        heart. Browse adorable companions, connect with experts, book vet
        appointments, and shop everything your new best friend needs—all in one
        place.
      </p>
      <div className="flex flex-wrap justify-center min-[992px]:justify-start gap-5 mt-10">
        <a
          href="pets.html"
          className="friend-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-[2px] border-[--primary-color-1] bg-[--heading-text] px-4 py-3 font-[family-name:--font-poppins] font-bold text-[--primary-color-1] shadow-xl transition-all duration-300 ease-in min-[480px]:w-auto sm:px-5 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:px-7 xl:text-xl"
        >
          Meet Your Friend
          <FaPaw />
        </a>
        <a
          href="#"
          className="contact-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-2 border-[#F4F1EA] bg-[--btn-color] px-4 py-3 font-[family-name:--font-poppins] font-bold text-white shadow-xl transition-all duration-300 ease-in hover:border-[--btn-color] hover:bg-[--heading-text] hover:text-[--btn-color] min-[480px]:w-auto sm:px-5 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:px-7 xl:text-xl"
        >
          Explore Shelters
          <FaPaw />
        </a>
      </div>
    </div>
  </section>
);
