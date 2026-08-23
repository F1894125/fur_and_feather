import React from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { FaPaw } from "react-icons/fa";

export const ForeverOneBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[480px] md:min-h-[550px] w-screen bg-[#D5E6EB] bg-cover bg-center bg-no-repeat px-6 md:px-8 overflow-hidden flex "
      style={{
        backgroundImage: `url(${getImageUrl("backgrounds/forever banner.png")})`,
      }}
    >
      {/* Soft overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="relative z-10 w-full mt-12 mb-6 px-6 flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between gap-8">
        <div className="max-w-lg space-y-5">
          <h2 className="text-3xl font-fredoka md:text-5xl font-extrabold text-[#0A303A] leading-tight drop-shadow-sm">
            Until They Find Their <br />
            <span className="text-[#F04336]">Forever One.</span>
          </h2>

          <button className="bg-[#F04336] text-white px-6 py-3 rounded-full text-xl font-bold inline-flex items-center gap-2 hover:bg-[#d83a2f] transition shadow-md">
            Discover Shelter Companions{" "}
            <span>
              <FaPaw />
            </span>
          </button>
        </div>

        <p className="text-xl font-poppins font-seminbold text-[#0A303A]/80 md:text-[#526E75] max-w-xs leading-relaxed font-medium bg-white/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-xl">
          Every pet in our partner shelters is cared for with patience, dignity,
          and hope—waiting for the moment someone chooses them, not for what
          they are, but for who they are.
        </p>
      </div>
      {/* <div className="">
        <div>
          <h1>Hero</h1>
          <button>Discover</button>
        </div>

      </div> */}
    </section>
  );
};
