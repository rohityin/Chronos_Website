import React, { useState } from 'react';
import { Sparkles, Shield, Flame, Cpu } from 'lucide-react';

interface FinishingTechnique {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  tool: string;
  tolerance: string;
  substrate: string;
  hours: string;
  magnification: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FINISHING_TECHNIQUES: FinishingTechnique[] = [
  {
    id: 'anglage',
    title: 'Anglage à la Main',
    tag: 'Hand-Chamfered Angles',
    subtitle: 'Gentian Wood & Diamond Paste',
    description: 'Every internal angle is manually beveled to an unyielding 45° incline using dried gentian wood stems from the Jura and 0.5µm diamond paste, yielding flawless specular reflection.',
    tool: 'Swiss Gentian Wood Peg',
    tolerance: '± 0.001 mm (1 Micron)',
    substrate: 'Untreated German Silver',
    hours: '42 Hours Manual Polish',
    magnification: '20x Optical',
    icon: Sparkles,
  },
  {
    id: 'poli-noir',
    title: 'Poli Noir (Black Polish)',
    tag: 'Specular Mirror Reflection',
    subtitle: 'Zinc Block Optical Flatness',
    description: 'The tourbillon bridge turns obsidian black head-on and blazes with intense mirror light from an angle, requiring extreme geometric sub-micron planarity.',
    tool: 'Lapped Zinc Plate',
    tolerance: 'Sub-Micron Flatness',
    substrate: 'Cryo-Forged 904L Steel',
    hours: '28 Hours Per Bridge',
    magnification: '25x Optical',
    icon: Shield,
  },
  {
    id: 'vis-bleutees',
    title: 'Vis Bleutées au Feu',
    tag: 'Thermal Oxidation',
    subtitle: '295°C Bed of Brass Shavings',
    description: 'Mirror-polished steel screwheads tempered individually over an incandescent tray of brass filings until the exact cobalt-blue oxide layer crystallizes.',
    tool: 'Incandescent Brass Bed',
    tolerance: 'Exact 295°C Thermal Point',
    substrate: 'Tempered Carbon Steel',
    hours: '18 Hours Batch Control',
    magnification: '15x Optical',
    icon: Flame,
  },
  {
    id: 'cotes-de-geneve',
    title: 'Côtes de Genève',
    tag: 'Parallel Wave Graining',
    subtitle: 'Rhythmic Light Dispersion',
    description: 'Uniform parallel ribbing applied across German silver bridges, dispersing ambient light in rhythmic waves as the timepiece moves with your wrist.',
    tool: 'Boxwood Circular Peg',
    tolerance: 'Equidistant Micro-Ribs',
    substrate: 'Maillechort Alloy',
    hours: '22 Hours Alignment',
    magnification: '10x Optical',
    icon: Cpu,
  },
];

export const MicroCraftsmanship: React.FC = () => {
  const [activeTechnique, setActiveTechnique] = useState<FinishingTechnique>(FINISHING_TECHNIQUES[0]);

  return (
    <section id="movement" className="relative min-h-screen flex flex-col justify-end pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-transparent">
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
                  01 • Microscopic Inspection
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tight text-white leading-tight mb-2.5">
                The Microscopic <br />
                <span className="italic font-light text-[#e2d9cc]">Architecture of Time.</span>
              </h2>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />

              {/* Narrative description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                No CNC tooling can replicate the subtle curve of a hand-beveled edge or the warmth of polished German silver. Over 180 hours of manual decoration are invested into every Calibre CH-01.
              </p>
            </div>

            {/* Interactive Finishing Discipline Selector: 2x2 Compact Grid */}
            <div className="w-full space-y-1.5 pt-1 mt-4 lg:mt-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                Select Finishing Discipline
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FINISHING_TECHNIQUES.map((tech, idx) => {
                  const isSelected = activeTechnique.id === tech.id;
                  const Icon = tech.icon;
                  return (
                    <button
                      key={tech.id}
                      onClick={() => setActiveTechnique(tech)}
                      className={`w-full py-2 px-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-[11px] font-mono ${
                        isSelected
                          ? 'bg-white/15 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                          : 'bg-black/20 backdrop-blur-sm border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#38bdf8]' : 'text-slate-400'}`} />
                        <span className="truncate font-serif text-xs">{tech.title.split(' ')[0]}</span>
                      </div>
                      <span className="text-[9px] text-[#d4af37] tracking-wider ml-1 shrink-0">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Finishing Dossier in Translucent Glass */}
          <div className="w-full lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] flex flex-col justify-between text-left">
            <div className="w-full">
              {/* Eyebrow & Metric Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-base sm:text-lg font-light text-white tracking-wide">
                  Atelier Finishing Dossier
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#38bdf8]">
                  {activeTechnique.magnification}
                </span>
              </div>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />
            </div>

            {/* Bottom Group: Dossier Card + Footnote unified to prevent flex gap tearing */}
            <div className="w-full mt-4 lg:mt-0">
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block mb-1">
                    {activeTechnique.subtitle}
                  </span>

                  <h4 className="font-serif text-lg sm:text-xl text-white font-normal mb-1.5">
                    {activeTechnique.title}
                  </h4>

                  <p className="text-slate-300 text-xs leading-relaxed font-light mb-3.5">
                    {activeTechnique.description}
                  </p>
                </div>

                {/* Tabular Monospace Specs */}
                <div className="divide-y divide-white/10 pt-2 border-t border-white/10 text-xs font-mono">
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Artisan Tool</span>
                    <span className="text-slate-200 text-xs">{activeTechnique.tool}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Tolerance</span>
                    <span className="text-[#38bdf8] text-xs font-semibold">{activeTechnique.tolerance}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Substrate</span>
                    <span className="text-slate-200 text-xs">{activeTechnique.substrate}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Manual Labor</span>
                    <span className="text-[#d4af37] text-xs font-semibold">{activeTechnique.hours}</span>
                  </div>
                </div>
              </div>

              {/* Horological Verification Footnote */}
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span>Individually verified under 20x optical loupe before casing</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
