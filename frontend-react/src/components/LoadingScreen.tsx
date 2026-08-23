import React, { useEffect, useState } from "react";

export interface LoadingScreenProps {
  progress: number; // 0 to 100
  statusText?: string;
  onFinished?: () => void;
  brandName?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  statusText = "Initializing core subsystems...",
  onFinished,
  brandName = "PETZORG SYSTEM",
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const isComplete = clampedProgress >= 100;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setShouldRender(false);
        onFinished?.();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onFinished]);

  if (!shouldRender) return null;

  const milestones = [
    { label: "Core", target: 25 },
    { label: "Assets", target: 50 },
    { label: "Data", target: 75 },
    { label: "Sync", target: 100 },
  ];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#070913] text-white selection:bg-pink-500 selection:text-white transition-opacity duration-700 ease-out ${
        isComplete
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Background SVG Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Dynamic Ambient Background Flares */}
      <div className="absolute top-[10%] left-[20%] w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/20 blur-[130px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[10%] right-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-pink-600/25 to-rose-500/15 blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none" />

      {/* Main Glassmorphic HUD Card */}
      <div className="relative z-10 flex flex-col items-center w-[92%] max-w-[440px] p-8 sm:p-10 rounded-[32px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]">
        {/* Brand/System Tag */}
        <div className="flex items-center gap-2 mb-8 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 font-semibold">
            {brandName}
          </span>
        </div>

        {/* Orbit Kinetic Visualizer */}
        <div className="relative flex items-center justify-center w-32 h-32 mb-8">
          {/* Outermost Orbit Track */}
          <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin duration-[20000ms]" />

          {/* Ring 1 - Outer Gradient Swirl */}
          <div
            className="absolute inset-1 rounded-full border-2 border-transparent border-t-indigo-500 border-r-pink-500/80 border-b-cyan-400/20 animate-spin"
            style={{ animationDuration: "2.4s" }}
          />

          {/* Ring 2 - Inner Reverse Counter Orbit */}
          <div
            className="absolute inset-5 rounded-full border-2 border-transparent border-b-cyan-400 border-l-purple-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.6s" }}
          />

          {/* Ring 3 - High-Speed Accent Dashes */}
          <div
            className="absolute inset-8 rounded-full border border-dashed border-pink-400/40 animate-spin"
            style={{ animationDuration: "3.5s" }}
          />

          {/* Center Glowing Core Orb */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-[0_0_24px_rgba(99,102,241,0.6)]">
            <div className="w-full h-full rounded-full bg-[#0d1020] flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#fff] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Status Text & Numeric Percent */}
        <div className="w-full space-y-2 mb-4">
          <div className="flex justify-between items-baseline">
            <div className="flex items-center gap-2 max-w-[240px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-xs font-medium text-slate-300 truncate tracking-wide font-mono">
                {statusText}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-mono tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                {clampedProgress}
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold ml-0.5">
                %
              </span>
            </div>
          </div>

          {/* Primary Progress Bar with Glow Head */}
          <div className="relative w-full h-2 bg-white/[0.06] rounded-full p-[1px] overflow-visible">
            <div
              className="relative h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${clampedProgress}%` }}
            >
              {/* Glowing Leading Pinpoint */}
              {clampedProgress > 0 && clampedProgress < 100 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_#06b6d4,0_0_20px_#ec4899]" />
              )}
            </div>
          </div>
        </div>

        {/* Step Milestones Checkpoints */}
        <div className="grid grid-cols-4 gap-2 w-full pt-4 mt-2 border-t border-white/[0.06]">
          {milestones.map((step, idx) => {
            const isPassed = clampedProgress >= step.target;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-full h-1 rounded-full transition-all duration-500 ${
                    isPassed
                      ? "bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                      : "bg-white/[0.06]"
                  }`}
                />
                <span
                  className={`text-[10px] font-mono transition-colors duration-300 ${
                    isPassed ? "text-slate-200 font-medium" : "text-slate-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
