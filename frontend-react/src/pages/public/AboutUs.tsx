// import React from "react";
import { getImageUrl } from "../../utils/getImageUrl";
import { AboutSection } from "../../components/AboutSection";
import { FaPaw } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section>
      <section className="about-banner bg-[#] relative hidden min-[480px]:block min-[480px]:min-h-[500px] min-[576px]:min-h-[600px] md:min-h-[800px] min-[992px]:min-h-[900px] lg:min-h-[1000px] xl:min-h-[1100px] min-[1920px]:min-h-[1277px]"></section>
      <section className="mobile-about-banner relative min-h-[600px] min-[375px]:min-h-[650px] min-[480px]:hidden"></section>

      <AboutSection/>

      <section className="relative py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-16">
            <div className="w-full">
              <span
                className="mb-4 flex items-center gap-2
            font-[family-name:--font-poppins]
            text-xs font-semibold
            tracking-[2px]
            text-[--primary-color-1]

            sm:mb-5 sm:gap-3 sm:text-sm sm:tracking-[3px]

            md:text-base
            md:tracking-[3px]

            lg:text-lg
            lg:tracking-[4px]

            xl:text-xl"
              >
               <FaPaw/>
                Our History
              </span>
              <h2
                className=" max-w-[650px]
            font-[family-name:--font-Fredoka]
            text-xl
            leading-[1.35]

            min-[375px]:text-2xl
            min-[375px]:leading-[1.35]

            sm:text-2xl
            sm:leading-[1.3]

            md:text-3xl
            md:leading-[1.3]

            lg:text-4xl
            lg:leading-[1.25]

            xl:text-4xl
            xl:leading-[1.25]

            2xl:text-5xl
            2xl:leading-[1.2]"
              >
                A <span className="text-[--btn-color]">Journey</span> of Love,
                Rescue & New
                <span className="text-[--btn-color]">Beginnings</span>
              </h2>
              <p
                className="mt-5
            font-[family-name:--font-poppins]
            text-xs
            font-semibold
            leading-[1.7]
            text-[--primary-color-1]

            sm:mt-6
            sm:text-sm
            sm:leading-[1.7]

            md:mt-6
            md:text-sm
            md:leading-[1.7]

            lg:mt-7
            lg:text-base
            lg:leading-[1.7]

            xl:mt-8
            xl:leading-[1.64]"
              >
                Our journey has been shaped by countless moments of
                kindness—from rescuing vulnerable animals to celebrating
                thousands of successful adoptions. Each year has strengthened
                our commitment to creating a world where no pet is left behind
                and every family has the opportunity to experience the
                unconditional love of a loyal companion.
              </p>
              <p
                className="mt-5
            font-[family-name:--font-poppins]
            text-xs
            font-semibold
            leading-[1.7]
            text-[--primary-color-1]

            sm:mt-6
            sm:text-sm
            sm:leading-[1.7]

            md:mt-7
            md:text-sm

            lg:mt-8
            lg:text-base

            xl:mt-9
            xl:leading-[1.64]"
              >
                What started as a humble initiative has become a growing
                movement driven by compassion, trust, and a shared vision of
                giving every pet the happy future they deserve. Because our
                history isn't measured by the years we've existed—it's measured
                by the lives we've changed, one paw at a time. 🐾
              </p>
            </div>

            <div
              className="relative
          mx-auto
          w-full
          max-w-[650px]
          md:max-w-none mt-6 md:mt-12"
            >
              <img
                src={getImageUrl("Image And Frame.png")}
                alt="dog"
                className="block
            h-auto
            w-full
            object-contain"
              />

              <div
                className="absolute
            right-0
            top-2
            z-10
            bg-white
            shadow-[0_8px_20px_rgba(0,0,0,0.16)]
            min-[375px]:right-0
            min-[375px]:top-4
            px-2
            py-1
            min-[480px]:px-5
            min-[480px]:py-4
            md:py-8
            min-[992px]:px-10
            min-[992px]:py-12
            lg:px-4
            lg:py-8
            sm:top-5
            rounded-[12px]
            md:top-6"
              >
                <p
                  className="text-center
              text-[8px]
              font-medium
              text-[#0A303A]
              min-[375px]:text-[9px]
              sm:text-[13px]"
                >
                  Monthly Orders
                </p>
                <p
                  className="mt-1
              text-center
              text-base
              font-bold
              text-[#0A303A]
              min-[375px]:text-lg
              sm:text-[28px]
              md:text-[30px]
              lg:text-[32px]
              xl:text-[34px]"
                >
                  1.3k+
                </p>
              </div>

              <div
                className="absolute
            bottom-[33px]
            left-[22px]
            z-10
            rounded-[12px]
            bg-white
            px-3
            py-2
            shadow-[0_8px_20px_rgba(0,0,0,0.15)]
            min-[375px]:bottom-[30px]
            min-[375px]:left-[22px]
            min-[375px]:px-4
            min-[375px]:py-3
            sm:bottom-20
            sm:left-16
            min-[992px]:bottom-[130px]
            lg:bottom-[64px]
            lg:left-[50px]
            xl:bottom-[84px]
            xl:left-[54px]"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="flex -space-x-2">
                    <img
                      src={getImageUrl("about-client-1.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <img
                      src={getImageUrl("about-client-3.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <img
                      src={getImageUrl("about-client-4.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />

                    <img
                      src={getImageUrl("about-client-2.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <div
                      className=" flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  border-2 border-gray-200
                  bg-white
                  shadow-xl

                  sm:h-7
                  sm:w-7

                  md:h-8
                  md:w-8"
                    >
                      <i
                        className="fa-solid
                    fa-plus
                    text-[7px]
                    text-[#0A303A]

                    sm:text-[8px]
                    md:text-[9px]"
                      ></i>
                    </div>
                  </div>
                  <p
                    className=" mt-1
                whitespace-nowrap
                text-[8px]
                font-medium
                text-[#0A303A]

                min-[375px]:text-[9px]

                sm:mt-2
                sm:text-sm

                md:text-base

                xl:text-lg"
                  >
                    8000+ reviews
                  </p>
                </div>
              </div>

              <div
                className="absolute
            right-[45px]
            -top-[35px]
            z-10
            w-12
            min-[375px]:right-14
            min-[375px]:-top-10
            min-[375px]:w-14
            min-[576px]:right-[80px]
            sm:right-20
            sm:-top-12
            sm:w-20
            md:-top-[75px]
            md:w-24
            min-[992px]:right-[120px]
            lg:right-6
            lg:-top-20
            lg:w-28
            xl:right-10
            xl:-top-24
            xl:w-32"
              >
                <img
                  src={getImageUrl("bone-shape.png")}
                  alt="bone"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-5 lg:px-[15px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-16">
            <div
              className="relative
          mx-auto
          w-full
          max-w-[650px]
          md:max-w-none mt-6"
            >
              <img
                src={getImageUrl("Image And Frame - 1.png")}
                alt="dog"
                className="block
            h-auto
            w-full
            object-contain"
              />

              <div
                className="absolute
            right-0
            top-2
            z-10
            bg-white
            shadow-[0_8px_20px_rgba(0,0,0,0.16)]
            min-[375px]:right-0
            min-[375px]:top-4
            px-2
            py-1
            min-[480px]:px-5
            min-[480px]:py-4
            md:py-8
            min-[992px]:px-10
            min-[992px]:py-12
            lg:px-4
            lg:py-8
            sm:top-5
            rounded-[12px]
            md:top-6"
              >
                <p
                  className="text-center
              text-[8px]
              font-medium
              text-[#0A303A]
              min-[375px]:text-[9px]
              sm:text-[13px]"
                >
                  Monthly Members
                </p>
                <p
                  className="mt-1
              text-center
              text-base
              font-bold
              text-[#0A303A]
              min-[375px]:text-lg
              sm:text-[28px]
              md:text-[30px]
              lg:text-[32px]
              xl:text-[34px]"
                >
                  5000+
                </p>
              </div>

              <div
                className="absolute
            bottom-[33px]
            left-[22px]
            z-10
            rounded-[12px]
            bg-white
            px-3
            py-2
            shadow-[0_8px_20px_rgba(0,0,0,0.15)]
            min-[375px]:bottom-[30px]
            min-[375px]:left-[22px]
            min-[375px]:px-4
            min-[375px]:py-3
            sm:bottom-20
            sm:left-16
            min-[992px]:bottom-[130px]
            lg:bottom-[64px]
            lg:left-[50px]
            xl:bottom-[84px]
            xl:left-[54px]"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="flex -space-x-2">
                    <img
                      src={getImageUrl("about-client-3.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <img
                      src={getImageUrl("about-client-4.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <img
                      src={getImageUrl("about-client-5.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <img
                      src={getImageUrl("about-client-2.png")}
                      className="h-6
                  w-6
                  rounded-full
                  object-contain
                  shadow-xl
                  sm:h-7
                  sm:w-7
                  md:h-8
                  md:w-8"
                      alt=""
                    />
                    <div
                      className=" flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  border-2 border-gray-200
                  bg-white
                  shadow-xl

                  sm:h-7
                  sm:w-7

                  md:h-8
                  md:w-8"
                    >
                      <i
                        className="fa-solid
                    fa-plus
                    text-[7px]
                    text-[#0A303A]

                    sm:text-[8px]
                    md:text-[9px]"
                      ></i>
                    </div>
                  </div>
                  <p
                    className=" mt-1
                whitespace-nowrap
                text-[8px]
                font-medium
                text-[#0A303A]

                min-[375px]:text-[9px]

                sm:mt-2
                sm:text-sm

                md:text-base

                xl:text-lg"
                  >
                    8000+ reviews
                  </p>
                </div>
              </div>

              <div
                className="absolute
            right-[70px]
            -top-[22px]
            -z-10
            w-12
            min-[375px]:-top-[24px]
            min-[375px]:right-[85px]
            min-[375px]:w-14
            min-[480px]:right-28
            min-[480px]:-top-[17px]
            min-[576px]:-top-[8px]
            sm:right-36
            sm:-top-[26px]
            sm:w-20
            md:-top-[30px]
            md:w-24
            min-[992px]:right-[200px]
            min-[992px]:-top-[13px]
            lg:right-[96px]
            lg:-top-16
            lg:w-28
            xl:-top-[72px]
            xl:right-[120px]
            xl:w-32"
              >
                <img
                  src="Images/dog-face.png"
                  alt="bone"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="w-full">
              <span
                className="mb-4 flex items-center gap-2
            font-[family-name:--font-poppins]
            text-xs font-semibold
            tracking-[2px]
            text-[--primary-color-1]

            sm:mb-5 sm:gap-3 sm:text-sm sm:tracking-[3px]

            md:text-base
            md:tracking-[3px]

            lg:text-lg
            lg:tracking-[4px]

            xl:text-xl"
              >
                <i className="fa-solid fa-paw"></i>
                Our Story
              </span>
              <h2
                className=" max-w-[650px]
            font-[family-name:--font-Fredoka]
            text-xl
            leading-[1.35]

            min-[375px]:text-2xl
            min-[375px]:leading-[1.35]

            sm:text-2xl
            sm:leading-[1.3]

            md:text-3xl
            md:leading-[1.3]

            lg:text-4xl
            lg:leading-[1.25]

            xl:text-4xl
            xl:leading-[1.25]

            2xl:text-5xl
            2xl:leading-[1.2]"
              >
                More Than <span className="text-[--btn-color]">Adoption</span>.
                A <br />
                Lifetime of <span className="text-[--btn-color]">Love</span>.
              </h2>
              <p
                className="mt-5
            font-[family-name:--font-poppins]
            text-xs
            font-semibold
            leading-[1.7]
            text-[--primary-color-1]

            sm:mt-6
            sm:text-sm
            sm:leading-[1.7]

            md:mt-6
            md:text-sm
            md:leading-[1.7]

            lg:mt-7
            lg:text-base
            lg:leading-[1.7]

            xl:mt-8
            xl:leading-[1.64]"
              >
                What began as a simple act of kindness for one abandoned pet
                soon became a heartfelt mission to transform the lives of
                countless animals in need. We realized that every rescue carries
                a story, every adoption creates a new beginning, and every
                wagging tail is a reminder that love has the power to heal.
              </p>
              <p
                className="mt-5
            font-[family-name:--font-poppins]
            text-xs
            font-semibold
            leading-[1.7]
            text-[--primary-color-1]

            sm:mt-6
            sm:text-sm
            sm:leading-[1.7]

            md:mt-7
            md:text-sm

            lg:mt-8
            lg:text-base

            xl:mt-9
            xl:leading-[1.64]"
              >
                Today, we're more than just a pet adoption platform—we're a
                community of compassionate people who believe every pet deserves
                a safe home, unconditional love, and a family to call their own.
                With every connection we make, we bring together hopeful hearts
                and waiting paws, creating lifelong friendships built on trust,
                care, and second chances.Because sometimes, all it takes is one
                small act of compassion to change a life forever—and every
                beautiful story starts with a single paw.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
