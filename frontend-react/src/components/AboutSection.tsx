import { FaPaw } from "react-icons/fa";
import { getImageUrl } from "../utils/getImageUrl";

export const AboutSection: React.FC = () => (
  <section className="about relative py-12 sm:py-16 lg:py-[100px]">
    <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
      <div className="flex flex-wrap gap-y-10 lg:gap-y-0 lg:mx-[-15px]">
        <div className="w-full min-[992px]:max-w-[40%] min-[992px]:basis-[40%] min-[992px]:px-[15px]">
          <div className="mx-auto w-full sm:max-w-[430px] rounded-[20px] border border-[--primary-color-1] bg-[--heading-text] p-5 shadow-xl sm:p-8 lg:p-10">
            <img
              src={getImageUrl("sections/About Us Image .png")}
              alt="about-us"
              className="w-full object-contain"
              loading="lazy"
            />
            <div className="-mt-[72px] min-[480px]:-mt-[90px] flex flex-col items-center text-center sm:-mt-16 lg:-mt-[84px]">
              <img
                src={getImageUrl("brand/about-logo.png")}
                alt="about-logo"
                className="max-w-[220px] object-contain sm:max-w-full"
                loading="lazy"
              />
              <div className="font-fredoka text-[25px] font-semibold text-[--primary-color-1] sm:text-[30px] lg:text-[34px]">
                Fur <span className="text-[--btn-color]">&</span> Feather
              </div>
              <div className="mt-4 font-[family-name:--font-poppins] text-base font-semibold text-[--primary-color-1] sm:mt-7 sm:text-xl">
                Find the One Who
                <span className="text-[--btn-color]">Finds You</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto min-[992px]:max-w-[60%] min-[992px]:basis-[60%] min-[992px]:px-[15px]">
          <span className="pt-4 min-[992px]:pt-14 xl:pt-28 mb-5 flex items-center gap-2 font-[family-name:--font-poppins] text-xs font-semibold tracking-[2px] text-[--primary-color-1] sm:gap-3 sm:text-sm md:text-base lg:text-lg xl:text-xl sm:tracking-[4px]">
            <FaPaw />
            Our Story
          </span>
          <h2 className="max-w-[766px] lg:max-w-[500px] font-fredoka font-semibold text-xl leading-[1.4] sm:text-2xl lg:text-3xl xl:text-4xl lg:leading-[1.3] 2xl:max-w-[550px] min-[1920px]:max-w-[766px] min-[1920px]:text-5xl">
            More Than Adoption. We're Creating
            <span className="text-[--btn-color]"> Forever Families</span>
          </h2>
          <p className="mt-5 mb-8 max-w-[766px] xl:max-w-[450px] 2xl:max-w-[500px] min-[1920px]:max-w-[672px] font-[family-name:--font-poppins] text-xs leading-normal font-semibold xl:leading-[1.64] text-[--primary-color-1] opacity-[60%] sm:mt-6 sm:mb-7 md:mt-7 md:mb-8 lg:mt-8 lg:mb-9 xl:mt-9 xl:mb-10 sm:text-sm md:text-base lg:text-lg xl:text-xl">
            At Fur & Feather, we believe every pet deserves more than a
            home—they deserve a family. We connect loving people with dogs,
            cats, rabbits, birds, hamsters, and many other companions, making
            every adoption a beautiful beginning.
          </p>

          <div className="flex flex-wrap min-[480px]:flex-row justify-center min-[992px]:justify-start items-center gap-4">
            <a
              href="aboutus.html"
              className="friend-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-[2px] border-[--primary-color-1] shadow-xl bg-[--heading-text] px-4 py-3 font-[family-name:--font-poppins] font-bold text-[--primary-color-1] transition-all duration-300 ease-in min-[480px]:w-auto sm:px-5 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:px-7 xl:text-xl"
            >
              Learn More
              <i className="fa-solid fa-paw"></i>
            </a>

            <a
              href="#"
              className="contact-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-2 border-[#F4F1EA] hover:border-2 hover:border-[--btn-color] bg-[--btn-color] px-4 py-3 font-[family-name:--font-poppins] font-bold text-white shadow-xl transition-all duration-300 ease-in hover:bg-[--heading-text] hover:text-[--btn-color] min-[480px]:w-auto sm:px-5 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:px-7 xl:text-xl"
            >
              Adopt Now
              <i className="fa-solid fa-paw"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="hidden xl:absolute xl:top-[15%] xl:right-0 xl:z-10 xl:block xl:w-[360px] 2xl:w-[471px]">
      <img
        src={getImageUrl("animals/about-us-dog.png")}
        alt="about-us-dog"
        className="w-full object-contain"
        loading="lazy"
      />
    </div>
  </section>
  // <section className="about relative py-12  px-5 md:px-8 lg:px-20 sm:py-16 lg:py-[100px]">
  //   <div className="max-w-[1350px]">
  //     <div className="flex flex-wrap gap-y-10 lg:gap-y-0 lg:mx-[-15px]">
  //       <div className="w-full min-[992px]:max-w-[40%] min-[992px]:basis-[40%] min-[992px]:px-[15px]">
  //         <div className="mx-auto w-full sm:max-w-[430px] rounded-[20px] border border-[--primary-color-1] bg-[--heading-text] p-5 shadow-xl sm:p-8 lg:p-10">
  //           <img
  //             src={getImageUrl("About Us Image.png")}
  //             alt="about-us"
  //             className="w-full object-contain"
  //             loading="lazy"
  //           />
  //           <div className="-mt-[72px] min-[480px]:-mt-[90px] flex flex-col items-center text-center sm:-mt-16 lg:-mt-[84px]">
  //             <img
  //               src={getImageUrl("about-logo.png")}
  //               alt="about-logo"
  //               className="max-w-[220px] object-contain sm:max-w-full"
  //               loading="lazy"
  //             />
  //             <div className="font-fredoka text-[25px] font-semibold text-[--primary-color-1] sm:text-[30px] lg:text-[34px]">
  //               Fur{" "}
  //               <span className="text-[--btn-color] font-semibold text-[34px]">
  //                 &
  //               </span>{" "}
  //               Feather
  //             </div>
  //             <div className="mt-4 font-poppins text-base font-semibold text-[--primary-color-1] sm:mt-7 sm:text-xl">
  //               Find the One Who{" "}
  //               <span className="text-[--btn-color]">Finds You</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="w-full mx-auto min-[992px]:max-w-[60%] min-[992px]:basis-[60%] min-[992px]:px-[15px]">
  //         <span className="pt-4 min-[992px]:pt-14 xl:pt-28 mb-5 flex items-center gap-2 font-poppins text-xs font-semibold tracking-[10%] text-[--primary-color-1] sm:gap-3 sm:text-sm md:text-base lg:text-lg xl:text-xl sm:tracking-[4px]">
  //           <img src={getImageUrl("smallPaw.png")} /> Our Story
  //         </span>
  //         <h2 className="font-fredoka text-5xl leading-[1.4] font-semibold lg:leading-[1.3] 2xl:max-w-[550px] min-[1920px]:max-w-[766px] min-[1920px]:text-5xl">
  //           More Than Adoption. We're Creating{" "}
  //           <span className="text-[--btn-color]">Forever Families</span>
  //         </h2>
  //         <p className="mt-5 mb-8 max-w-[766px] xl:max-w-[450px] 2xl:max-w-[500px] min-[1920px]:max-w-[672px] font-[family-name:--font-poppins] text-xs leading-normal font-semibold xl:leading-[1.64] text-[--primary-color-1] opacity-[60%] sm:mt-6 sm:mb-7 md:mt-7 md:mb-8 lg:mt-8 lg:mb-9 xl:mt-9 xl:mb-10 sm:text-sm md:text-base lg:text-lg xl:text-xl">
  //           At Fur & Feather, we believe every pet deserves more than a
  //           home—they deserve a family. We connect loving people with dogs,
  //           cats, rabbits, birds, hamsters, and many other companions, making
  //           every adoption a beautiful beginning.
  //         </p>
  //         <div className="flex flex-wrap min-[480px]:flex-row justify-center min-[992px]:justify-start items-center gap-4">
  //           <a
  //             href="#"
  //             className="friend-btn inline-flex flex-wrap gap-2 w-full sm:w-auto px-4 md:px-7 py-3 min-[992px]:py-4 bg-white hover:bg-[#F04336] min-[320px]:justify-center items-center xl:px-5 xl:py-3 font-poppins text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-extrabold text-[#0A303A] hover:text-white border-2 border-[#0A303A] shadow-xl hover:border-white rounded-full overflow-hidden transition-all ease-in duration-300"
  //           >
  //             Learn More
  //             <FaPaw size={24} />
  //           </a>
  //           <a
  //             href="#"
  //             className="contact-btn inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[30px] border-2 border-[#F4F1EA] shadow-xl bg-[--btn-color] px-4 py-3 font-[family-name:--font-poppins] font-bold text-white transition-all duration-300 ease-in hover:bg-[--heading-text] hover:text-[--btn-color] min-[480px]:w-auto sm:px-5 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:px-7 xl:text-xl"
  //           >
  //             Adopt Now <FaPaw size={24} />
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="hidden xl:absolute xl:top-[15%] xl:right-0 xl:z-10 xl:block xl:w-[360px] 2xl:w-[471px]">
  //     <img
  //       src={getImageUrl("about-us-dog.png")}
  //       alt="about-us-dog"
  //       className="w-full object-contain"
  //       loading="lazy"
  //     />
  //   </div>
  // </section>
);
