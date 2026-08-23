import React from "react";
import { FaPaw, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 4.8,
    quote:
      "After losing my beloved dog, I wasn't sure I was ready to adopt again. The kindness and patience of the Fur & Feather team gave me confidence to take that step. Coco has filled my home with comfort, joy, and a brand-new beginning. Thank You Once again.",
    author: "Ishaani Ray",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    rating: 4.3,
    quote:
      "Adopting Kiwi was one of the best decisions I've ever made. The shelter shared everything I needed to know and made me feel completely prepared. Every morning now begins with cheerful chirps, and my home feels brighter, happier, and full of life.",
    author: "Suhana Rehman",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    rating: 4.5,
    quote:
      "The entire adoption process was so smooth and reassuring. The team answered every question, shared updates, and genuinely cared about finding the right match. Bruno settled in from day one, and now I honestly can't imagine life without him.",
    author: "Rohan Mukherjee",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 4,
    rating: 5.0,
    quote:
      "The team made finding our cat so seamless. The counseling session helped us choose the ideal companion for our apartment lifestyle. We're head over heels in love with Milo!",
    author: "Aarav Sharma",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="flex flex-col pt-10 px-4 md:px-8 max-w-full mx-auto text-[#0A303A] bg-[#D5E6EB]">
      {/* Header */}
      <div className="text-center mb-12 space-y-2">
        <div className="flex items-center justify-center gap-2 font-poppins text-xl font-semibold tracking-wider">
          <span>
            <FaPaw size={18} />
          </span>
          Happy Tails
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-fredoka">
          <span className="text-[#F04336]">Real</span> Stories. Forever{" "}
          <span className="text-[#F04336]">Bonds</span>.
        </h2>
        <p className="text-xl text-[#526E75] max-w-[1120px] mx-auto font-poppins font-semibold">
          Every adoption creates a story worth sharing. Hear from families who
          found unconditional love, endless joy, and lifelong companionship
          through Fur & Feather.
        </p>
      </div>

      {/* Swiper Carousel Container */}
      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-12 mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
            bulletClass: "testimonial-bullet",
            bulletActiveClass: "testimonial-bullet-active",
          }}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          breakpoints={{
            380: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!py-8"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="flex flex-col items-center h-full">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-16 h-16 -mb-8 rounded-full object-cover border-2 border-[#0A303A] bg-white z-10 shadow-sm"
                />

                {/* 2. Testimonial Card */}
                <div className="flex flex-col items-center max-w-[352px] flex-1 min-h-[460px] py-12 border-2 px-7 rounded-xl border-black bg-white shadow-xs">
                  <div className="pt-2 pb-4 text-sm font-semibold">
                    ⭐ {item.rating}
                  </div>
                  <p className="py-4 text-center text-xs md:text-lg font-poppins leading-relaxed text-neutral-700 ">
                    "{item.quote}"
                  </p>
                  <p className="text-right w-full px-0 md:px-2 font-medium text-xs text-[#0A303A]">
                    — {item.author}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev Navigation Button */}
        <button
          aria-label="Previous testimonial"
          className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[#0A303A] bg-white text-[#0A303A] flex items-center justify-center shadow-md hover:bg-neutral-100 transition z-20"
        >
          <FaChevronLeft size={14} />
        </button>

        {/* Next Navigation Button */}
        <button
          aria-label="Next testimonial"
          className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[#0A303A] bg-white text-[#0A303A] flex items-center justify-center shadow-md hover:bg-neutral-100 transition z-20"
        >
          <FaChevronRight size={14} />
        </button>

        {/* Custom Pagination Indicator Dots */}
        <div className="testimonial-pagination flex justify-center items-center gap-2 mt-4" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-16">
        <button className="friend-btn inline-flex items-center justify-center gap-2 w-full min-[480px]:w-auto px-6 py-3.5 bg-[#f4f1ea] hover:bg-[#F04336] font-poppins text-sm sm:text-base font-extrabold text-[#0A303A] hover:text-black border-2 border-[#0A303A] hover:border-white rounded-full shadow-lg transition-all duration-300">
          View More
          <FaPaw size={16} />
        </button>
        <button className="contact-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-4 border-[#F4F1EA] shadow-xl hover:border-[--btn-color] bg-[--btn-color] px-6 py-3 font-poppins font-bold text-white transition-all duration-300 ease-in hover:bg-[--heading-text] hover:text-[--btn-color] min-[480px]:w-auto text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          Share Experience <FaPaw size={16} />
        </button>
      </div>

      {/* Scoped CSS for Swiper Dots */}
      <style>{`
        .testimonial-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #d1d5db;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .testimonial-bullet-active {
          width: 24px;
          background-color: #0A303A;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
