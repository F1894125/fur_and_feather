import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { ShelterItem } from "../types/home.interface";
import { getImageUrl } from "../utils/getImageUrl";
import { FaPaw } from "react-icons/fa";

const shelterData: ShelterItem[] = [
  {
    title: "Maple Tails Rescue",
    location: "Baner, Pune",
    fileName: "sections/shelter-1.png",
  },
  {
    title: "The Nest & Nook Sanctuary",
    location: "Jubilee Hills, Hyderabad",
    fileName: "sections/shelter-2.png",
  },
  {
    title: "Happy Tails Rescue Home",
    location: "Banjara Hills, Hyderabad",
    fileName: "sections/shelter-3.png",
  },
  {
    title: "Golden Paws Sanctuary",
    location: "Andheri, Mumbai",
    fileName: "sections/shelter-4.png",
  },
  {
    title: "Golden Paws Sanctuary",
    location: "Andheri, Mumbai",
    fileName: "sections/shelter-5.png",
  },
  {
    title: "Golden Paws Sanctuary",
    location: "Andheri, Mumbai",
    fileName: "sections/shelter-6.png",
  },
];

export const ShelterSection: React.FC = () => (
  <section className="relative pb-12 md:pb-14 lg:pb-16">
    <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
      <span className="mb-4 flex items-center justify-center gap-2 text-center font-poppins text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wider text-[#0A303A] sm:mb-9 ">
        <FaPaw size={24} /> Shelters
      </span>
      <h2 className="mx-auto max-w-[1320px] text-center  font-fredoka text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-[1.2] tracking-wider text-[#0A303A] ">
        A Little <span className="text-[#F04336]">Shelter</span>. A Lifetime of{" "}
        <span className="text-[#F04336]">Love</span>.
      </h2>
      <p className="mx-auto mt-4 mb-8 max-w-[310px] text-center font-sans text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-6 text-[#0A303A] opacity-60 sm:mt-6 sm:mb-14 sm:max-w-[850px] sm:leading-normal">
        Explore expert advice, real journeys, and thoughtful tips to help you
        and your companion thrive together.
      </p>

      {/* Swiper Carousel Container */}
      <div className="relative px-2 sm:px-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          // navigation
          // pagination={{
          //   clickable: true,
          //   el: ".testimonial-pagination",
          //   bulletClass: "testimonial-bullet",
          //   bulletActiveClass: "testimonial-bullet-active",
          // }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14 shelter-swiper"
        >
          {shelterData.map((shelter, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <div className="w-full h-full p-[30px] bg-[#F4F1EA] border-[2px] border-[#0A303A] rounded-[30px] hover:bg-[#0A303A] text-[#0A303A] hover:text-white transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="overflow-hidden rounded-[30px]">
                    <img
                      src={getImageUrl(shelter.fileName)}
                      alt={shelter.title}
                      className="w-full object-contain duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full mx-auto text-center mt-[-18px] flex justify-center">
                    <FaPaw size={24} />
                  </div>
                </div>

                <div className="mx-auto text-center mt-[33px]">
                  <h3 className="mb-[21px] font-sans text-base sm:text-lg font-semibold">
                    {shelter.title}
                  </h3>
                  <p className="font-sans text-sm font-normal">
                    {shelter.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonial-pagination flex justify-center items-center gap-2 mt-4" />
      </div>

      <div className="flex flex-wrap justify-center items-center mt-[30px]">
        <button
          type="button"
          className="contact-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-4 border-[#F4F1EA] shadow-xl hover:border-[#F04336] bg-[#F04336] px-4 py-3 font-sans font-bold text-white transition-all duration-300 ease-in hover:bg-white hover:text-[#0A303A] min-[480px]:w-auto sm:px-5 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:px-7 xl:text-xl cursor-pointer"
        >
          View More <i className="fa-solid fa-paw"></i>
        </button>
      </div>
    </div>
  </section>
);
