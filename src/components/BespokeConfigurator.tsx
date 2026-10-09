import React, { useState } from 'react';
import { ChevronRight, Shield, Sparkles } from 'lucide-react';
import type { WatchEdition } from '../types/horology';

interface BespokeConfiguratorProps {
  onSelectEditionForPreorder: (edition: WatchEdition, customNotes: { strap: string; monogram: string }) => void;
}

export const EDITIONS = [
  {
    id: 'steel',
    name: 'Origin 904L Cryo-Steel',
    subname: 'The Signature Reference No. 01',
    price: '$48,000 USD',
    deposit: '$5,000 USD Deposit',
    strap: 'Hand-Stitched Matte Black Alligator',
    image: '/assets/hero_watch.jpg',
    availability: 'Limited to 10 Pieces Worldwide',
    remainingSlots: 4,
    description: 'The pure horological purist specification. High specular reflection steel case contrasting against flame-blued titanium hands and exposed tourbillon escapement.',
  }
] as const satisfies readonly WatchEdition[];

export interface StrapOption {
  readonly id: 'alligator' | 'cordovan' | 'milanese';
  readonly label: string;
  readonly name: string;
}

const STRAP_OPTIONS = [
  { id: 'alligator', label: 'Alligator', name: 'Hand-Stitched Matte Black Alligator' },
  { id: 'cordovan', label: 'Cordovan', name: 'Honey Brown Horween Cordovan' },
  { id: 'milanese', label: 'Milanese', name: '904L Milanese Steel Mesh' },
] as const satisfies readonly StrapOption[];

export const BespokeConfigurator: React.FC<BespokeConfiguratorProps> = ({
  onSelectEditionForPreorder,
}) => {
  const edition = EDITIONS[0];
  const [selectedStrap, setSelectedStrap] = useState<string>(STRAP_OPTIONS[0].name);
  const [monogram, setMonogram] = useState<string>('L.M. 2026');

  const handleMonogramChange = (val: string) => {
    // Sanitize: uppercase alphanumeric, spaces, periods, dashes, max 16 chars
    const cleaned = val.toUpperCase().replace(/[^A-Z0-9.\- ]/g, '').slice(0, 16);
    setMonogram(cleaned);
  };

  return (
    <section id="configurator" className="relative min-h-screen flex flex-col justify-end pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-transparent">
      <div className="relative max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full z-20">
        
        {/* Bilateral Flanking Layout Leaving 500px+ Central Corridor for the Watch */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 sm:gap-8 lg:gap-10 w-full">
          
          {/* Left Column: Atelier Allocation, Reference No. 01, Pricing & Security Guarantees */}
          <div className="w-full lg:max-w-[310px] xl:max-w-[340px] 2xl:max-w-[360px] flex flex-col justify-end text-left space-y-4">
            <div>
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#38bdf8]">
                  05 • Atelier Allocation
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tight text-white leading-tight mb-2.5">
                Configure Ref. No. 01. <br />
                <span className="italic font-light text-[#e2d9cc]">Strict Allocation of 25.</span>
              </h2>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />

              {/* Reference & Pricing Block */}
              <div className="mb-3">
                <span className="font-serif text-base sm:text-lg text-white block mb-0.5">
                  {edition.name}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-lg sm:text-xl font-bold text-white">
                    {edition.price}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    ({edition.deposit})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#d4af37] mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  <span>Only 4 allocation slots remain available worldwide</span>
                </div>
              </div>
            </div>

            {/* Security Guarantees: Translucent Glass */}
            <div className="w-full p-3.5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 text-xs font-mono space-y-2 mt-4 lg:mt-0">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                <span>Fully Refundable Escrow Deposit</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Numbered Swiss Cantonal Origin Certificate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek 3-Pill Toggle, Monospace Burin Engraving, Primary CTA */}
          <div className="w-full lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] flex flex-col justify-between text-left">
            <div className="w-full">
              {/* Eyebrow & Live Inscription Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-base sm:text-lg font-light text-white tracking-wide">
                  Atelier Specification
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37]">
                  {monogram ? `Burin: ${monogram}` : 'Series 01/25'}
                </span>
              </div>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />
            </div>

            {/* Bottom Group: Configurator Card + Footnote unified to prevent flex gap tearing */}
            <div className="w-full mt-4 lg:mt-0">
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 space-y-4">
                {/* Strap Selection with Sleek 3-Pill Toggle */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      1. Handcrafted Strap Selection
                    </label>
                    <span className="text-[10px] font-mono text-slate-300 truncate max-w-[160px]">
                      {STRAP_OPTIONS.find(s => s.name === selectedStrap)?.label || 'Alligator'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {STRAP_OPTIONS.map((strap) => {
                      const isSelected = selectedStrap === strap.name;
                      return (
                        <button
                          key={strap.id}
                          type="button"
                          onClick={() => setSelectedStrap(strap.name)}
                          className={`py-2 px-2.5 rounded-full border text-xs font-mono text-center transition-all ${
                            isSelected
                              ? 'bg-white text-black border-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                              : 'bg-black/20 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {strap.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Monospace Burin Engraving Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      2. Bespoke Caseback Monogram
                    </label>
                    <span className="text-[9px] font-mono text-[#d4af37]">Max 16 chars</span>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    value={monogram}
                    onChange={(e) => handleMonogramChange(e.target.value)}
                    placeholder="e.g. L.M. 2026"
                    className="w-full bg-black/30 border border-white/15 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#38bdf8] transition-colors uppercase tracking-wider placeholder:text-slate-600"
                  />
                </div>

                {/* Primary Pill CTA Matching Hero Style */}
                <div className="pt-1">
                  <button
                    onClick={() =>
                      onSelectEditionForPreorder(edition, {
                        strap: selectedStrap,
                        monogram: monogram || 'L.M. 2026',
                      })
                    }
                    className="w-full py-2.5 px-6 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Request Allocation</span>
                    <ChevronRight className="w-3.5 h-3.5 text-black" />
                  </button>
                  <span className="text-[9px] font-mono text-slate-500 block text-center mt-2">
                    Strict allocation queue • Fully refundable escrow deposit
                  </span>
                </div>
              </div>

              {/* Footnote */}
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span>Direct communication with master watchmaker upon allocation confirmation</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
