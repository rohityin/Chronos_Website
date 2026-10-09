import React from 'react';
import { PenTool, CheckCircle2 } from 'lucide-react';

export const ArtisanAssembly: React.FC = () => {
  return (
    <section id="artisan" className="relative min-h-screen flex flex-col justify-end pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-transparent">
      <div className="relative max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full z-20">
        
        {/* Bilateral Flanking Layout Leaving 500px+ Central Corridor for the Watch */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 sm:gap-8 lg:gap-10 w-full">
          
          {/* Left Column: Symmetrically Bounded & Bottom-Anchored */}
          <div className="w-full lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] flex flex-col justify-between text-left">
            <div>
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#38bdf8]">
                  04 • Atelier Assembly
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tight text-white leading-tight mb-2.5">
                The Solitary Discipline. <br />
                <span className="italic font-light text-[#e2d9cc]">One Watchmaker. One Piece.</span>
              </h2>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />

              {/* Narrative description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                In an era of automated micro-assembly lines, Chronos honors the solitary discipline of independent horology. A single artisan watchmaker constructs, tunes, and regulates your specific serial number from raw components to chronometer casing.
              </p>
            </div>

            {/* Horological Charter Quote with Monospace Atelier Citation */}
            <div className="w-full p-3.5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 border-l-2 border-l-[#d4af37] mt-4 lg:mt-0">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1.5">
                <PenTool className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                  Horological Charter • Le Brassus
                </span>
              </div>
              <p className="font-serif text-xs italic text-slate-200 leading-relaxed">
                "We do not assemble timepieces to count the hours. We craft them to prove that human hands still possess transcendent patience."
              </p>
              <span className="text-[10px] font-mono text-slate-400 block mt-2">
                — Atelier Master Horologist, Vallée de Joux
              </span>
            </div>
          </div>

          {/* Right Column: Cohesive Devotion Ledger */}
          <div className="w-full lg:max-w-[310px] xl:max-w-[340px] 2xl:max-w-[360px] flex flex-col justify-between text-left">
            <div className="w-full">
              {/* Eyebrow & Provenance Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-base sm:text-lg font-light text-white tracking-wide">
                  180 Hours of Devotion
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white">
                  Vallée de Joux
                </span>
              </div>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />
            </div>

            {/* Bottom Group: Dossier Card + Footnote unified to prevent flex gap tearing */}
            <div className="w-full mt-4 lg:mt-0">
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                <div>
                  <p className="text-slate-300 text-xs leading-relaxed font-light mb-3.5">
                    Every pivot, tooth flank, and screw slot is individually inspected under 20x magnification to eliminate sub-micron flaws before casing.
                  </p>
                </div>

                {/* Cohesive 2x2 Devotion Ledger in Gold/White */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-[#d4af37] block">42 Hours</span>
                    <span className="text-[9px] text-[#e2d9cc] uppercase tracking-wider block mt-0.5">Hand Anglage</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-[#d4af37] block">36 Hours</span>
                    <span className="text-[9px] text-[#e2d9cc] uppercase tracking-wider block mt-0.5">Gear Meshing</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-[#d4af37] block">24 Hours</span>
                    <span className="text-[9px] text-[#e2d9cc] uppercase tracking-wider block mt-0.5">Hairspring Poise</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-[#d4af37] block">504 Hours</span>
                    <span className="text-[9px] text-[#e2d9cc] uppercase tracking-wider block mt-0.5">21-Day Regulation</span>
                  </div>
                </div>
              </div>

              {/* Horological Verification Footnote */}
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Signed handwritten register preserved in Swiss cantonal archives</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
