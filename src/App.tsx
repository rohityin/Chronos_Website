import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MicroCraftsmanship } from './components/MicroCraftsmanship';
import { MetallurgyShowcase } from './components/MetallurgyShowcase';
import { CalibreShowcase } from './components/CalibreShowcase';
import { ArtisanAssembly } from './components/ArtisanAssembly';
import { BespokeConfigurator, EDITIONS } from './components/BespokeConfigurator';
import { PreorderModal } from './components/PreorderModal';
import { Footer } from './components/Footer';
import { BackgroundScrollCanvas } from './components/BackgroundScrollCanvas';
import type { WatchEdition } from './types/horology';

export function App() {
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<WatchEdition>(EDITIONS[0]);
  const [configuredStrap, setConfiguredStrap] = useState<string>('');
  const [configuredMonogram, setConfiguredMonogram] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scrollTo');
    if (scrollTarget) {
      const y = parseInt(scrollTarget, 10);
      if (!isNaN(y)) {
        setTimeout(() => {
          window.scrollTo(0, y);
        }, 100);
      }
    }
  }, []);

  const handleOpenPreorderDefault = () => {
    setSelectedEdition(EDITIONS[0]);
    setIsPreorderOpen(true);
  };

  const handleSelectEditionForPreorder = (
    edition: WatchEdition,
    customNotes: { strap: string; monogram: string }
  ) => {
    setSelectedEdition(edition);
    setConfiguredStrap(customNotes.strap);
    setConfiguredMonogram(customNotes.monogram);
    setIsPreorderOpen(true);
  };

  const handleAllocationConfirmed = (_serial: string) => {};

  return (
    <div className="min-h-screen text-[#e2e8f0] selection:bg-[#38bdf8]/20 selection:text-[#38bdf8] relative">
      {/* Scroll-Scrubbed Background Video Canvas */}
      <BackgroundScrollCanvas />

      {/* Sticky Haute Horlogerie Navbar */}
      <Navbar
        onOpenPreorder={handleOpenPreorderDefault}
      />

      {/* Main Storytelling Experience */}
      <main className="relative z-10">
        {/* Section 1: Parallax Hero */}
        <Hero
          onOpenPreorder={handleOpenPreorderDefault}
        />

        {/* Section 2: Microscopic Craftsmanship & Interactive Loupe */}
        <MicroCraftsmanship />

        {/* Section 3: Raw Metallurgy & Crystal */}
        <MetallurgyShowcase />

        {/* Section 4: Calibre CH-01 Exhibition Caseback */}
        <CalibreShowcase />

        {/* Section 5: Master Artisan Assembly in Vallée de Joux */}
        <ArtisanAssembly />

        {/* Section 6: Bespoke Atelier Configurator */}
        <BespokeConfigurator
          onSelectEditionForPreorder={handleSelectEditionForPreorder}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pre-order Collector Concierge Drawer */}
      <PreorderModal
        isOpen={isPreorderOpen}
        onClose={() => setIsPreorderOpen(false)}
        edition={selectedEdition}
        initialStrap={configuredStrap}
        initialMonogram={configuredMonogram}
        onAllocationConfirmed={handleAllocationConfirmed}
      />
    </div>
  );
}

export default App;
