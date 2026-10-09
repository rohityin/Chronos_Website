import React from 'react';
import { useParallax } from '../hooks/useParallax';

interface HeroProps {
  onOpenPreorder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPreorder }) => {
  const { smoothScrollY } = useParallax();

  // Subtle Parallax transform on scroll
  const copyOffsetY = smoothScrollY * 0.08;

  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-transparent">
      <div
        className="relative max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full z-20"
        style={{
          transform: `translateY(${-copyOffsetY}px)`,
        }}
      >
        {/* Symmetrical Balanced 2-Column Layout flanking Central Watch */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-12 w-full">
          
          {/* Left Column: Symmetrically bounded & bottom-anchored */}
          <div className="w-full lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[380px] flex flex-col items-start justify-between text-left">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-normal tracking-tight text-white leading-[1.15] mb-6">
              Time is not measured. <br />
              <span className="italic font-light text-[#e2d9cc]">It is carved.</span>
            </h1>

            {/* Action control */}
            <div>
              {/* Primary Pill Button */}
              <button
                onClick={onOpenPreorder}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
              >
                Request Collector Allocation
              </button>
            </div>
          </div>

          {/* Right Column: Symmetrically bounded & bottom-anchored */}
          <div className="w-full lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[380px] flex flex-col items-start justify-between text-left">
            <div className="w-full">
              {/* Eyebrow / Headline */}
              <h2 className="font-sans text-base sm:text-lg font-light text-white tracking-wide mb-3">
                Vallée de Joux Masterpiece
              </h2>

              {/* Clean horizontal divider line */}
              <div className="w-full h-px bg-white/20 mb-4" />
            </div>

            {/* Narrative description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              The Chronos Atelier No. 01 is a hand-assembled mechanical triumph. 
              Featuring a free-sprung chronometer tourbillon, cryo-forged 904L steel, 
              and mirror-polished anglage bevels created entirely by hand in the Swiss Jura.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
