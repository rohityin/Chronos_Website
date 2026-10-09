import React, { useState } from 'react';
import {
  Navbar as ResizableNavbarContainer,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';

interface NavbarProps {
  onOpenPreorder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPreorder }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Micro-Craft', link: '#movement' },
    { name: 'Raw Metallurgy', link: '#metallurgy' },
    { name: 'Calibre CH-01', link: '#calibre' },
    { name: 'Atelier Origin', link: '#artisan' },
    { name: 'Bespoke Editions', link: '#configurator' },
  ];

  return (
    <ResizableNavbarContainer className="pt-4">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="relative z-20 flex items-center gap-3">
          <NavbarButton
            as="button"
            variant="primary"
            onClick={onOpenPreorder}
          >
            Acquire
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="w-full pt-4 border-t border-white/10">
            <NavbarButton
              as="button"
              variant="primary"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPreorder();
              }}
              className="w-full"
            >
              Acquire
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbarContainer>
  );
};
