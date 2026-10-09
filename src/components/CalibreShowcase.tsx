import React from 'react';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';

export const CalibreShowcase: React.FC = () => {
  return (
    <section id="calibre" className="relative min-h-screen flex flex-col justify-end pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-transparent">
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
                  03 • Kinetic Engine
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tight text-white leading-tight mb-2.5">
                Calibre CH-01. <br />
                <span className="italic font-light text-[#e2d9cc]">Kinetic Chronometry.</span>
              </h2>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />

              {/* Narrative description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                Witness the pulse of pure mechanical kinetic life. The sapphire exhibition exposes sweeping Côte de Genève bridges and deep 18K screwed gold chatons beating in harmonic synchrony.
              </p>
            </div>

            {/* Kinetic Performance Matrix as Open Horological Ledger Directly on Canvas */}
            <div className="w-full pt-1 mt-4 lg:mt-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/20">
                <span className="flex items-center gap-2 text-[#38bdf8]">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white">Kinetic Ledger</span>
                </span>
                <span className="text-[10px] font-mono text-[#d4af37]">Manufacture Cal. CH-01</span>
              </div>
              <div className="divide-y divide-white/10 font-mono text-xs">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-300 text-[11px]">Escapement Frequency</span>
                  <span className="text-white font-semibold text-xs">4 Hz (28,800 vph)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-300 text-[11px]">Power Autonomy</span>
                  <span className="text-white font-semibold text-xs">72 Hours (Twin Barrels)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-300 text-[11px]">Total Jewel Count</span>
                  <span className="text-[#d4af37] font-semibold text-xs">31 Synthetic Rubies</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-300 text-[11px]">Components</span>
                  <span className="text-slate-200 font-semibold text-xs">234 Hand-Finished</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Architectural Callouts with Floating COSC Badge */}
          <div className="w-full lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] flex flex-col justify-between text-left">
            <div className="w-full">
              {/* Eyebrow & Floating Chronometric COSC Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-base sm:text-lg font-light text-white tracking-wide">
                  Exhibition Architecture
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <Gauge className="w-3 h-3 text-emerald-400" />
                  <span>COSC Certified • -1/+2s</span>
                </span>
              </div>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />
            </div>

            {/* Bottom Group: Dossier Card + Footnote unified to prevent flex gap tearing */}
            <div className="w-full mt-4 lg:mt-0">
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 space-y-4">
                <div className="space-y-3.5">
                  <div className="border-l-2 border-[#38bdf8] pl-3.5">
                    <h4 className="font-serif text-sm text-white mb-0.5">Twin Serial Barrels</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      Two mainspring barrels deliver flat torque to the escapement, preventing amplitude drop-off as power reserves deplete.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#d4af37] pl-3.5">
                    <h4 className="font-serif text-sm text-white mb-0.5">Screwed Gold Chatons</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      18K solid gold collars secure jewel bearings into German silver bridges with thermally blued micro-screws.
                    </p>
                  </div>
                </div>

                {/* Chronometric Testing Verification Matrix */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>6 Positions Tested</span>
                  </span>
                  <span className="text-slate-300">8°C • 23°C • 38°C</span>
                </div>
              </div>

              {/* Horological Verification Footnote */}
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Tested to Swiss Official Chronometer (COSC) standards</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
