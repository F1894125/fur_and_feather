import React from "react";
import type { PetItem } from "../types/home.interface";
import { getImageUrl } from "../utils/getImageUrl";
import { FaHeart, FaPaw, FaSearch } from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const petData: PetItem[] = [
  {
    id: 1,
    name: "Luna (Persian Cat)",
    gender: "Female",
    fileName: "icons/persian.png",
  },
  { id: 2, name: "Max (Labrador)", gender: "Male", fileName: "icons/labrador.png" },
  { id: 3, name: "Rio (Lovebird)", gender: "Female", fileName: "animals/lovebird.png" },
  {
    id: 4,
    name: "Bil (Syrian Hamster)",
    gender: "Male",
    fileName: "icons/syrian.png",
  },
  {
    id: 5,
    name: "Snowy (White Rabbit)",
    gender: "Male",
    fileName: "icons/rabit.png",
  },
];

interface PetMatchProps {
  wishlist: Record<number, boolean>;
  toggleWishlist: (id: number, e: React.MouseEvent) => void;
}

export const PetMatchSection: React.FC<PetMatchProps> = ({
  // wishlist,
  // toggleWishlist,
}) => (
  <section className="relative pb-16 lg:pb-40">
    <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
      <span className="mb-4 flex items-center justify-center gap-2 text-center font-poppins text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-[2px] text-[--primary-color-1] sm:mb-9 sm:gap-3 sm:tracking-[4px]">
        <FaPaw className="size-3 sm:size-4"/> Meet Your Match <i></i>
      </span>
      <h2 className="mx-auto max-w-[300px] text-center font-fredoka text-xl sm:text-2xl lg:text-3xl xl:text-4xl min-[1920px]:text-5xl font-semibold leading-[1.2] text-[--primary-color-1] sm:max-w-[650px]">
        Find the Companion{" "}
        <span className="text-[--btn-color]">Meant for You</span>
      </h2>
      <p className="mx-auto mt-4 mb-8 max-w-[310px] text-center font-poppins text-xs font-semibold leading-normal text-[--primary-color-1] opacity-60 sm:mt-6 sm:mb-14 sm:max-w-[850px] sm:text-sm md:text-base lg:text-lg xl:text-xl">
        From playful puppies and curious kittens to gentle rabbits and cheerful
        birds, discover companions ready to become part of your story.
      </p>

      {/* Swiper Carousel */}
      <div className="w-full relative px-2 sm:px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          // navigation
          // pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pet-match-swiper !pb-14"
        >
          {petData.map((pet) => (
            <SwiperSlide key={pet.id} className="!h-auto flex justify-center">
              <div className="w-full rounded-[21px] border-[2px] border-[--primary-color-1] p-3 sm:p-4">
                <div className="relative">
                  <div className="overflow-hidden rounded-[21px]">
                    <img
                      src={getImageUrl(pet.fileName)}
                      alt="persian"
                      loading="lazy"
                      className="block w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>

                  <div className="bg-[--heading-text] pl-2 pb-2 rounded-bl-[21px] absolute top-0 right-[-3px] flex gap-4">
                    <a
                      href="#"
                      className="border border-[--primary-color-1] rounded-[11px] p-[6px] lg:p-[10px] hover:bg-[--btn-color] hover:text-white transition-all duration-300 flex items-center justify-center text-lg lg:text-xl"
                    >
                      <FaSearch />
                    </a>

                    <a
                      href="#"
                      className="border border-[--primary-color-1] rounded-[11px] p-[6px] lg:p-[10px] flex items-center justify-center heartBtn text-lg lg:text-xl"
                    >
                      <FaHeart color="white" stroke="black" strokeWidth={10} />
                    </a>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <FaHeart color="red" size={20} />
                    <span className="font-poppins font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#F4F1EA]">
                      (12k+)
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm sm:text-base md:text-[15px] xl:text-xl font-bold text-[#0A303A]">
                    {pet.name}
                  </h3>
                  <p className="mt-2 text-xs lg:text-sm xl:text-base text-[#0A303A] opacity-80">
                    Female
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA Button */}
      <div className="flex flex-wrap justify-center items-center">
        <a
          href="#"
          className="contact-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-4 border-[#F4F1EA] shadow-xl hover:border-[--btn-color] bg-[--btn-color] px-6 py-3 font-poppins font-bold text-white transition-all duration-300 ease-in hover:bg-[--heading-text] hover:text-[--btn-color] min-[480px]:w-auto text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
        >
          <span>View All Companions</span>
          <FaPaw size={20} />
        </a>
      </div>
    </div>

    {/* Decorative Bird */}
    <div className="hidden xl:absolute xl:top-[-142px] xl:z-10 xl:block xl:w-[480px] 2xl:w-full pointer-events-none">
      <img
        src={getImageUrl("bird.png")}
        alt="bird decoration"
        loading="lazy"
        className="object-contain"
      />
    </div>
  </section>
);
