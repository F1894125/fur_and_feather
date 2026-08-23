import React from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../utils/getImageUrl";
import { FaPaw } from "react-icons/fa";

interface BadgeItem {
  id: number;
  icon: React.ReactNode;
}

// Custom Badge SVG Visuals matching the image badges
const badgeItems: BadgeItem[] = [
  {
    id: 1,

    icon: <img src={getImageUrl("sections/awards-8.png")} alt="" />,
  },
  {
    id: 2,
    icon: <img src={getImageUrl("sections/awards-1.png")} alt="" />,
  },
  {
    id: 3,
    icon: <img src={getImageUrl("sections/awards-2.png")} alt="" />,
  },
  {
    id: 4,

    icon: <img src={getImageUrl("sections/awards-3.png")} alt="" />,
  },
  {
    id: 5,
    icon: <img src={getImageUrl("sections/awards-4.png")} alt="" />,
  },
  {
    id: 6,
    icon: <img src={getImageUrl("sections/awards-5.png")} alt="" />,
  },
  {
    id: 7,
    icon: <img src={getImageUrl("sections/awards-6.png")} alt="" />,
  },
  {
    id: 8,

    icon: <img src={getImageUrl("sections/awards-7.png")} alt="" />,
  },
];

// Duplicate array for infinite seamless looping
const duplicatedBadges = [...badgeItems, ...badgeItems];

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-14 px-4 max-w-6xl mx-auto text-center overflow-hidden">
      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#0A303A] uppercase bg-[#EAE6DD] px-4 py-1.5 rounded-full border border-[#0A303A]/20 shadow-xs mb-8"
      >
        <span>
          <FaPaw />
        </span>{" "}
        Awards
      </motion.div>

      {/* Infinite Motion Carousel Track */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft Mask Gradient Overlays on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F2EB] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F2EB] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-6 md:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedBadges.map((badge, idx) => (
            <motion.div
              key={`${badge.id}-${idx}`}
              whileHover={{ scale: 1.1, rotate: 3, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Circular Badge Graphic */}
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center text-center shadow-md group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Outer Dashed Seal Ring */}
                <div className="absolute inset-1 rounded-full border border-dashed border-white/40 pointer-events-none" />

                {/* Badge Icon */}
                <div className="relative z-10">{badge.icon}</div>

                {/* Badge Primary Label */}
                <span className="text-[8px] md:text-[9px] font-black text-white tracking-wider uppercase leading-tight mt-0.5 relative z-10 drop-shadow-xs px-1">
                  {/* {badge.label} */}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
