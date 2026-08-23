import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";

const NotFound: React.FC = () => {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1180px]">
        {/* 404 Illustration */}
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={getImageUrl("backgrounds/404Page.png")}
            alt="404 - Page not found"
            className="w-full h-auto block"
          />

          {/* Back to Home Button */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%]">
            <Link
              to="/"
              className="
                inline-flex items-center justify-center
                px-7 py-3
                rounded-full
                bg-[#F04336]
                text-white
                font-semibold
                text-sm sm:text-base
                shadow-lg
                transition-all duration-300
                hover:bg-[#0A303A]
                hover:scale-105
              "
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
