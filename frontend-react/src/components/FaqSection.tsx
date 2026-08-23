import React from "react";
import type { FAQItem } from "../types/home.interface";
import { getImageUrl } from "../utils/getImageUrl";
import { FaPaw } from "react-icons/fa";

const faqData: FAQItem[] = [
  {
    question: "How does the adoption process work?",
    answer:
      "Browse pets, submit a request, meet your chosen companion, and complete the adoption once approved.",
  },
  {
    question: "Can I meet the pet before adopting?",
    answer:
      "Yes. We encourage every adopter to meet the pet first to ensure it's the right match.",
  },
  {
    question: "Are the pets vaccinated and healthy?",
    answer:
      "Each pet profile includes available health records, vaccination status, and medical information.",
  },
  {
    question: "What if the adoption doesn't work out?",
    answer:
      "Many rescue partners have return policies to ensure the pet's wellbeing. Check the pet's profile for details.",
  },
  {
    question: "How long does the adoption process take?",
    answer:
      "It depends on the rescue partner, but most requests are reviewed within a few days.",
  },
  {
    question: "Are the pet profiles verified?",
    answer:
      "We work with trusted shelters and partners to provide accurate information.",
  },
  {
    question: "Do you provide post-adoption support?",
    answer:
      "Yes. We offer care guides and access to trusted pet care resources.",
  },
];

interface FaqProps {
  openFaqIndex: number | null;
  handleFaqToggle: (index: number) => void;
}

const FaqSection: React.FC<FaqProps> = ({ openFaqIndex, handleFaqToggle }) => {
  return (
    <section className="py-12">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
        {/* Section Label */}
        <span className="mb-4 flex items-center justify-center gap-2 text-center font-[family-name:--font-poppins] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-[2px] text-[--primary-color-1] sm:mb-9 sm:gap-3 sm:tracking-[4px]">
          <FaPaw />
          Ask Away
        </span>

        {/* Heading */}
        <h2 className="mx-auto max-w-[358px] text-center font-[family-name:--font-Fredoka] text-xl sm:text-2xl lg:text-3xl xl:text-4xl min-[1920px]:text-5xl font-semibold leading-[1.2] text-[--primary-color-1] sm:max-w-[650px]">
          Got <span className="text-[--btn-color]">Questions</span>? We've Got{" "}
          <span className="text-[--btn-color]">Answers</span>.
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 mb-8 max-w-[310px] text-center font-[family-name:--font-poppins] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-6 text-[--primary-color-1] opacity-60 sm:mt-6 sm:mb-14 sm:max-w-[850px]">
          From adoption to pet care, we've answered the questions every future
          pet parent asks—so you can focus on welcoming your new best friend
          home.
        </p>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Illustration */}
          <div>
            <img
              src={getImageUrl("icons/Frame 126.png")}
              alt="FAQ Illustration"
              loading="lazy"
              className="w-full max-w-[600px] mx-auto object-contain"
            />
          </div>

          {/* FAQ List */}
          <div className="w-full space-y-7">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="faq-item border border-[#3E5667] rounded-xl overflow-hidden bg-white shadow-sm transition-colors duration-200"
                >
                  {/* FAQ Question */}
                  <button
                    type="button"
                    onClick={() => handleFaqToggle(idx)}
                    className="faq-btn w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-[#163042] transition-colors hover:bg-gray-50 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-[family-name:--font-poppins] text-sm sm:text-base md:text-lg font-semibold leading-[1.4] pr-4">
                      {faq.question}
                    </span>

                    {/* Plus / Minus Icon */}
                    <div
                      className={`relative w-5 h-5 flex items-center justify-center shrink-0 text-[#163042] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      {/* Horizontal Bar */}
                      <span className="absolute w-4 h-[2px] bg-current rounded-full" />

                      {/* Vertical Bar */}
                      <span
                        className={`absolute w-[2px] h-4 bg-current rounded-full transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "rotate-90 scale-y-0 opacity-0"
                            : "rotate-0 scale-y-100 opacity-100"
                        }`}
                      />
                    </div>
                  </button>

                  {/* FAQ Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="faq-content px-5 pb-5">
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col min-[480px]:flex-row gap-4 items-center justify-center mt-10">
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
          <span>View More</span>
          <FaPaw size="1.25rem" />
        </a>
      </div>
    </section>
  );
};

export default FaqSection;
