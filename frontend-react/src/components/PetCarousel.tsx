import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper required styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl } from "../utils/getImageUrl";

interface PetItem {
  id: number;
  name: string;
  gender: string;
  fileName: string;
}

const pets: PetItem[] = [
  {
    id: 1,
    name: "Luna (Persian Cat)",
    gender: "Female",
    fileName: "icons/persian.png",
  },
  {
    id: 2,
    name: "Max (Labrador)",
    gender: "Male",
    fileName: "icons/labrador.png",
  },
  {
    id: 3,
    name: "Rio (Lovebird)",
    gender: "Female",
    fileName: "icons/lovebird.png",
  },
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

export const PetCarousel: React.FC = () => {
  return (
    <div className="w-full max-w-[1350px] mx-auto px-4 py-8">
      <Swiper
        // Modules to activate
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        // Responsive Breakpoints
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-12"
      >
        {pets.map((pet) => (
          <SwiperSlide key={pet.id}>
            <div className="rounded-[21px] border-[3px] border-[#0A303A] p-4 bg-white shadow-md">
              <div className="relative overflow-hidden rounded-[21px]">
                <img
                  src={getImageUrl(pet.fileName)}
                  alt={pet.name}
                  className="w-full h-[220px] object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base font-bold text-[#0A303A]">
                  {pet.name}
                </h3>
                <p className="text-xs text-[#0A303A] opacity-80">
                  {pet.gender}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
