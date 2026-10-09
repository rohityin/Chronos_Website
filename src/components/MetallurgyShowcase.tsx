import React, { useState } from 'react';
import { ShieldCheck, Compass, Droplet, Layers } from 'lucide-react';

interface MaterialSpec {
  id: string;
  name: string;
  shortName: string;
  chemicalFormula: string;
  hardness: string;
  role: string;
  description: string;
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
  metric3: { label: string; value: string };
  icon: React.ComponentType<{ className?: string }>;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'steel',
    name: '904L Cryo-Forged Steel',
    shortName: '904L Steel',
    chemicalFormula: 'Fe-Cr-Ni-Mo Low Carbon',
    hardness: '220 HV Hardened',
    role: 'Case, Bezel & Lugs',
    description: 'Elevated molybdenum superalloy cryogenically treated at -196°C to stabilize martensitic micro-structure, enabling mirror reflections indistinguishable from precious white gold.',
    metric1: { label: 'Density', value: '8.0 g/cm³' },
    metric2: { label: 'Cryo Temp', value: '-196°C' },
    metric3: { label: 'Hardness', value: '220 HV' },
    icon: ShieldCheck,
  },
  {
    id: 'sapphire',
    name: 'Corundum Sapphire Crystal',
    shortName: 'Sapphire',
    chemicalFormula: 'Al₂O₃ Monocrystalline',
    hardness: '2,000 HV (9 Mohs)',
    role: 'Dial & Exhibition Caseback',
    description: 'Synthesized at 2,050°C and diamond-lapped for 14 hours. Treated on both surfaces with 7-layer vacuum anti-reflective vapor coatings producing subtle violet refraction.',
    metric1: { label: 'Mohs Scale', value: '9 Mohs' },
    metric2: { label: 'Fusion Point', value: '2,050°C' },
    metric3: { label: 'Hardness', value: '2,000 HV' },
    icon: Droplet,
  },
  {
    id: 'maillechort',
    name: 'Untreated German Silver',
    shortName: 'Maillechort',
    chemicalFormula: 'Cu-Ni-Zn Maillechort',
    hardness: '160 HV Stable',
    role: 'Bridges & Balance Cock',
    description: 'Traditional Saxon horological alloy consisting of copper, nickel, and zinc. Never electro-plated: it breathes ambient air and gradually develops an exquisite warm honey patina.',
    metric1: { label: 'Alloy Ratio', value: 'Cu-Ni-Zn' },
    metric2: { label: 'Aging', value: 'Natural Patina' },
    metric3: { label: 'Hardness', value: '160 HV' },
    icon: Layers,
  },
  {
    id: 'titanium',
    name: 'Flame-Blued Titanium',
    shortName: 'Titanium',
    chemicalFormula: 'Ti-6Al-4V Grade 5',
    hardness: '349 HV Kinetic',
    role: 'Tourbillon Cage & Hands',
    description: 'Chosen for extreme strength-to-weight ratio. The rotating tourbillon carriage weighs merely 0.28 grams, reducing escapement inertia and maximizing kinetic efficiency.',
    metric1: { label: 'Carriage Mass', value: '0.28 g' },
    metric2: { label: 'Oxidation', value: '300°C Fire' },
    metric3: { label: 'Hardness', value: '349 HV' },
    icon: Compass,
  },
];

export const MetallurgyShowcase: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<MaterialSpec>(MATERIALS[0]);

  return (
    <section id="metallurgy" className="relative min-h-screen flex flex-col justify-end pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-transparent">
      <div className="relative max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full z-20">
        
        {/* Bilateral Flanking Layout Leaving 500px+ Central Corridor for the Watch */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 sm:gap-8 lg:gap-10 w-full">
          
          {/* Left Column: Symmetrically Bounded & Bottom-Anchored */}
          <div className="w-full lg:max-w-[310px] xl:max-w-[340px] 2xl:max-w-[360px] flex flex-col justify-between text-left">
            <div>
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#38bdf8]">
                  02 • Material Science
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tight text-white leading-tight mb-2.5">
                The Raw Alchemy of <br />
                <span className="italic font-light text-[#e2d9cc]">Metal & Crystal.</span>
              </h2>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />

              {/* Narrative description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                Selected for elemental permanence, zero magnetic degradation, and hand-finishing under cryogenic stabilization.
              </p>
            </div>

            {/* Interactive Material Specification Selector: 2x2 Compact Grid */}
            <div className="w-full space-y-1.5 pt-1 mt-4 lg:mt-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                Select Elemental Alloy
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MATERIALS.map((mat, idx) => {
                  const isSelected = activeMaterial.id === mat.id;
                  const Icon = mat.icon;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setActiveMaterial(mat)}
                      className={`w-full py-2 px-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-[11px] font-mono ${
                        isSelected
                          ? 'bg-white/15 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                          : 'bg-black/20 backdrop-blur-sm border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#38bdf8]' : 'text-slate-400'}`} />
                        <span className="truncate font-serif text-xs">{mat.shortName}</span>
                      </div>
                      <span className="text-[9px] text-[#d4af37] tracking-wider ml-1 shrink-0">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Material Spec Sheet in Translucent Glass */}
          <div className="w-full lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] flex flex-col justify-between text-left">
            <div className="w-full">
              {/* Eyebrow & Hardness Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-base sm:text-lg font-light text-white tracking-wide">
                  Metallurgical Profile
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37]">
                  {activeMaterial.hardness}
                </span>
              </div>

              {/* Clean hairline divider line */}
              <div className="w-full h-px bg-white/20 mb-3" />
            </div>

            {/* Bottom Group: Spec Sheet Card + Footnote unified to prevent flex gap tearing */}
            <div className="w-full mt-4 lg:mt-0">
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider block mb-1">
                    {activeMaterial.chemicalFormula}
                  </span>

                  <h4 className="font-serif text-lg sm:text-xl text-white font-normal mb-1">
                    {activeMaterial.name}
                  </h4>

                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                    Application: <span className="text-slate-200">{activeMaterial.role}</span>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-2.5" />

                  <p className="text-slate-300 text-xs leading-relaxed font-light mb-3.5">
                    {activeMaterial.description}
                  </p>
                </div>

                {/* Single-Line Consolidated Metric Row */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center font-mono">
                  <div className="py-2 px-1.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block truncate">{activeMaterial.metric1.label}</span>
                    <span className="text-xs text-white font-semibold truncate block mt-0.5">{activeMaterial.metric1.value}</span>
                  </div>
                  <div className="py-2 px-1.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block truncate">{activeMaterial.metric2.label}</span>
                    <span className="text-xs text-[#38bdf8] font-semibold truncate block mt-0.5">{activeMaterial.metric2.value}</span>
                  </div>
                  <div className="py-2 px-1.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block truncate">{activeMaterial.metric3.label}</span>
                    <span className="text-xs text-[#d4af37] font-semibold truncate block mt-0.5">{activeMaterial.metric3.value}</span>
                  </div>
                </div>
              </div>

              {/* Cryogenic Stabilization Footnote */}
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                <span>Cryogenically stabilized at -196°C in liquid nitrogen</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
