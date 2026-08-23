import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  counters: {
    customers: number;
    projects: number;
    awards: number;
  };
}

// Reusable Count-Up Item Component
const AnimatedCount: React.FC<{
  target: number;
  suffix?: string;
  duration?: number;
}> = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLHeadingElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function (easeOutExpo) for a smooth finish
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(easeProgress * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 } // Triggers when 30% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <h2
      ref={elementRef}
      className=" leading-none text-[#f54842] text-5xl md:text-6xl lg:text-7xl font-semibold font-fredoka hover:text-[--primary-color-1] ease-in-out duration-300"
    >
      {count}
      {suffix}
    </h2>
  );
};

export const CounterSection: React.FC<CounterProps> = ({ counters }) => (
  <section className="pt-24 pb-11">
    <div className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:gap-0">
          
          {/* Customers */}
          <div className="border-b border-red-800 pb-8 sm:border-b-0 sm:border-r sm:pb-0">
            <AnimatedCount target={counters.customers} suffix="k" />
            <p className="mt-2 px-3 text-sm font-medium text-[#f54842] sm:text-base lg:text-lg">
              Happy Customers Who Trusted
            </p>
          </div>

          {/* Projects */}
          <div className="border-b border-red-800 pb-8 sm:border-b-0 sm:border-r sm:pb-0">
            <AnimatedCount target={counters.projects} suffix="+" />
            <p className="mt-2 px-3 text-sm font-medium text-[#f54842] sm:text-base lg:text-lg">
              Projects Completed in Last 5 Years
            </p>
          </div>

          {/* Awards */}
          <div>
            <AnimatedCount target={counters.awards} />
            <p className="mt-2 px-3 text-sm font-medium text-[#f54842] sm:text-base lg:text-lg">
              Awards For Success Projects
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
);