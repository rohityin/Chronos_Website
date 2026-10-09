import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, Sparkles, Layers } from 'lucide-react';
import type { Hotspot } from '../types/horology';

interface WatchmakerLoupeProps {
  imageSrc: string;
  zoomFactor?: number;
  loupeSize?: number;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'anglage',
    title: 'Anglage Spéculaire',
    subtitle: 'Hand-Chamfered Internal Angles',
    description: 'Each bridge corner is beveled by hand at an exact 45-degree angle using gentian wood pegs and 0.5-micron diamond paste, achieving black mirror reflection with zero machining marks.',
    x: 48,
    y: 35,
    magnification: '20x Optical',
    artisanTechnique: 'Wood peg & diamond paste polish (42 hrs)'
  },
  {
    id: 'balance',
    title: 'Free-Sprung Gyromax Balance',
    subtitle: 'Breguet Overcoil Hairspring',
    description: 'Poised with 4 gold masselotte micro-screws, beating at 28,800 vibrations per hour. The hand-formed terminal Breguet curve ensures concentric breathing in all 6 chronometric positions.',
    x: 52,
    y: 53,
    magnification: '15x Optical',
    artisanTechnique: 'Manual terminal curve bending with calipers'
  },
  {
    id: 'screws',
    title: 'Flame-Blued Steel Screws',
    subtitle: '300°C Thermal Oxidation',
    description: 'Mirror-polished steel screwheads tempered individually on a heated brass tray until the exact cobalt blue oxide layer crystallizes, protecting against oxidation for centuries.',
    x: 77,
    y: 22,
    magnification: '25x Optical',
    artisanTechnique: 'Fire bluing on brass filings'
  },
  {
    id: 'perlage',
    title: 'Maillechort Perlage',
    subtitle: 'Circular Graining on German Silver',
    description: 'Overlapping circular graining hand-applied grain-by-grain with an abrasive peg. Maillechort ages with a warm golden hue unlike common rhodium-plated brass.',
    x: 22,
    y: 65,
    magnification: '10x Optical',
    artisanTechnique: 'Manual drill press overlapping circles'
  }
];

export const WatchmakerLoupe: React.FC<WatchmakerLoupeProps> = ({
  imageSrc,
  zoomFactor = 3.2,
  loupeSize = 220,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 300, y: 300 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[1]);
  const [isLocked, setIsLocked] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setPos({ x, y });
  }, [isLocked]);

  const selectHotspot = (hotspot: Hotspot) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: (hotspot.x / 100) * rect.width,
      y: (hotspot.y / 100) * rect.height,
    });
    setActiveHotspot(hotspot);
    setIsLocked(true);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Loupe Header info without button */}
      <div className="mb-8 max-w-3xl">
        <h3 className="font-serif text-3xl md:text-4xl text-white font-normal tracking-tight">
          Microscopic Finishing Verification
        </h3>
        <p className="text-sm text-slate-400 mt-2 font-light">
          Hover your cursor to traverse the Calibre CH-01 escapement, or click precision hotspots to lock inspection directly onto hand-anglage corners, jewel sinks, and the free-sprung balance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Loupe Viewport (8 cols) */}
        <div className="lg:col-span-8 relative">
          <div
            ref={containerRef}
            onClick={() => setIsLocked(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              if (!isLocked) setIsHovered(false);
            }}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden rounded-2xl border border-white/15 bg-black cursor-crosshair select-none shadow-2xl group aspect-square md:aspect-4/3"
          >
            {/* Base Image */}
            <img
              src={imageSrc}
              alt="Calibre CH-01 Escapement Macro"
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Hotspot Markers on Canvas */}
            {HOTSPOTS.map((hs) => {
              const isSelected = activeHotspot.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectHotspot(hs);
                  }}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group/btn transition-transform ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                  title={hs.title}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-[#38bdf8]' : 'bg-white/40'
                      }`}
                    />
                    <span
                      className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-[10px] font-mono font-bold border transition-colors ${
                        isSelected
                          ? 'bg-[#38bdf8] text-black border-white shadow-[0_0_15px_#38bdf8]'
                          : 'bg-black/80 text-white border-white/40 group-hover/btn:border-[#38bdf8]'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Magnifier Lens / Watchmaker's Loupe */}
            {(isHovered || isLocked) && (
              <div
                className="pointer-events-none absolute z-40 rounded-full border-2 border-[#d4af37]/80 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(212,175,55,0.3)] overflow-hidden"
                style={{
                  width: `${loupeSize}px`,
                  height: `${loupeSize}px`,
                  left: `${pos.x - loupeSize / 2}px`,
                  top: `${pos.y - loupeSize / 2}px`,
                }}
              >
                {/* Brass Bezel Outer Ring */}
                <div className="absolute inset-0 rounded-full ring-2 ring-black/80 pointer-events-none" />

                {/* Reticle Crosshair & Calipers */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                  <div className="w-full h-px bg-[#38bdf8]" />
                  <div className="h-full w-px bg-[#38bdf8] absolute" />
                  <div className="w-20 h-20 rounded-full border border-[#38bdf8]/40 absolute" />
                </div>

                {/* Loupe Readout badge */}
                <div className="absolute top-2 inset-x-0 flex justify-center pointer-events-none">
                  <span className="bg-black/90 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30">
                    20x LOUPE • L'ATELIER
                  </span>
                </div>

                {/* Magnified Image content */}
                {containerRef.current && (
                  <div
                    className="absolute"
                    style={{
                      width: `${containerRef.current.clientWidth}px`,
                      height: `${containerRef.current.clientHeight}px`,
                      transform: `translate(${-pos.x * zoomFactor + loupeSize / 2}px, ${
                        -pos.y * zoomFactor + loupeSize / 2
                      }px) scale(${zoomFactor})`,
                      transformOrigin: '0 0',
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt="Zoomed Escapement"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hotspot Technical Dossier Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0b0f15] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Selected Calibre Node
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                {activeHotspot.magnification}
              </span>
            </div>

            <h4 className="font-serif text-2xl text-white font-normal mb-1">
              {activeHotspot.title}
            </h4>
            <p className="text-xs font-mono text-[#d4af37] mb-4">
              {activeHotspot.subtitle}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
              {activeHotspot.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Finishing Method
                  </span>
                  <span className="text-xs text-slate-200">
                    {activeHotspot.artisanTechnique}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Horological Tolerance
                  </span>
                  <span className="text-xs text-slate-200">
                    ± 0.001 mm (1 Micron) Geometric Variance
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Quick Select Grid for all 4 Nodes */}
          <div className="grid grid-cols-2 gap-2">
            {HOTSPOTS.map((hs) => {
              const active = activeHotspot.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => selectHotspot(hs)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-[#38bdf8]/10 border-[#38bdf8]/40 shadow-lg'
                      : 'bg-[#0b0f15] border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-400">
                    Node
                  </span>
                  <span className={`text-xs font-serif font-medium line-clamp-1 ${active ? 'text-[#38bdf8]' : 'text-white'}`}>
                    {hs.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
