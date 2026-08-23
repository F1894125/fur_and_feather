import React, { useState, useEffect } from "react";
import { BannerSection } from "../../components/BannerSection";
import { AboutSection } from "../../components/AboutSection";
import { PetMatchSection } from "../../components/PetMatchSection";
import { WhoFindsYouSection } from "../../components/WhoFindsYouSection";
import { CounterSection } from "../../components/CounterSection";
import { ShelterSection } from "../../components/ShelterSection";
import { BlogSection } from "../../components/BlogSection";
import { TestimonialsSection } from "../../components/TestimonialsSection";
import FaqSection from "../../components/FaqSection";
import { ForeverOneBanner } from "../../components/ForeverOneBanner";
import { AwardsSection } from "../../components/AwardsSection";
import { NewsletterSection } from "../../components/NewsletterSection";

export const HomePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const [counters, setCounters] = useState({
    customers: 0,
    projects: 0,
    awards: 0,
  });

  // Animated counter hook logic
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        customers: Math.floor(12 * progress),
        projects: Math.floor(250 * progress),
        awards: Math.floor(155 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters({ customers: 12, projects: 250, awards: 155 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="font-sans text-[#0A303A] bg-[#F4F1EA] antialiased overflow-x-hidden">
      <main className="space-y-0">
        {/* 1. Hero / Main Banner */}
        <BannerSection />

        {/* 2. Our Story / About Section */}
        <AboutSection />

        {/* 3. Meet Your Match / Pet Cards Section */}
        <PetMatchSection wishlist={wishlist} toggleWishlist={toggleWishlist} />

        {/* 4. Find the One Who Finds You Section */}
        <WhoFindsYouSection />

        {/* 5. Metrics / Counter Section (12k | 250+ | 155) */}
        <CounterSection counters={counters} />

        {/* 6. Shelters Section */}
        <ShelterSection />

        {/* 7. Stories / Blog Section */}
        <BlogSection />

        {/* 8. Happy Tails / Testimonials Section */}
        <TestimonialsSection />

        {/* 9. Ask Away / FAQ Section */}
        <FaqSection
          openFaqIndex={openFaqIndex}
          handleFaqToggle={handleFaqToggle}
        />

        {/* 10. Until They Find Their Forever One Banner */}
        <ForeverOneBanner />

        {/* 11. Awards Marquee Slider */}
        <AwardsSection />

        {/* 12. Newsletter Section */}
        <NewsletterSection />
      </main>
    </div>
  );
};

export default HomePage;
