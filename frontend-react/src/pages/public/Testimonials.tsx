// import React from "react";

export const Testimonials = () => {
  return (
    <>
      <section className="testimonial-banner hidden min-[480px]:block min-[480px]:min-h-[500px] sm:min-h-[600px] md:min-h-[700px] min-[992px]:min-h-[900px] min-[1920px]:min-h-[1000px]"></section>
      <section className="mobile-testimonial-banner min-h-[800px] min-[375px]:min-h-[900px] min-[480px]:hidden"></section>
      <section className="py-[100px]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
          <div className="flex items-center gap-1 mb-[60px]">
            <h2 className="font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl text-black">
              4.5
            </h2>
            <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
              <i className="fa-solid fa-star"></i>
            </span>
            <span className="font-[family-name:--font-poppins] font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black">
              90.6k+
            </span>
            <span className="font-[family-name:--font-poppins] font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black">
              Average Rating
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex shrink-0">
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
              </div>

              <div className="h-[8px] flex-1 overflow-hidden border border-[--primary-color-1] bg-[#F4F1EA] rounded-full">
                <div className="h-full w-full bg-[--primary-color-1]"></div>
              </div>

              <span className="font-[family-name:--font-poppins] font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black text-right">
                50.2k+
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex shrink-0">
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="star font-[family-name:--font-Fredoka] text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] min-[1920px]:text-5xl">
                  <i className="fa-regular fa-star"></i>
                </span>
              </div>
              <div className="h-[8px] flex-1 overflow-hidden border border-[--primary-color-1] bg-[#F4F1EA] rounded-full">
                <div className="h-full w-[84%] bg-[--primary-color-1]"></div>
              </div>
              <span className="font-[family-name:--font-poppins] font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black text-right">
                30.3k+
              </span>
            </div>
          </div>
        </div>
      </section>
      Name
    </>
  );
};
export default Testimonials;
