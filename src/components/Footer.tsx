import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer
      className="relative z-20 text-slate-300 pt-16 sm:pt-20 pb-10 sm:pb-12 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-gradient-to-b from-transparent via-neutral-950/70 to-neutral-950/98 backdrop-blur-2xl"
      style={{
        WebkitBackdropFilter: 'blur(30px) saturate(180%) contrast(105%)',
        backdropFilter: 'blur(30px) saturate(180%) contrast(105%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 30px, black 85px)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 30px, black 85px)',
      }}
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full relative z-10">
        
        {/* Main Balanced Grid: Newsletter on Left, Atelier Monogram & Statement in Center, Concierge & Links on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 pb-8 border-b border-white/10 items-center">
          
          {/* Left Column (4 cols): Newsletter Module */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
              Private Dispatches
            </span>
            <h4 className="font-serif text-lg sm:text-xl font-normal text-white tracking-tight">
              Join our newsletter to stay connected.
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Direct confidential dispatches on rare calibre allocations & private salon viewings.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-sm pt-0.5">
              {subscribed ? (
                <div className="py-2 px-4 rounded-full bg-white/10 border border-emerald-400/40 text-emerald-300 font-mono text-xs flex items-center gap-2 backdrop-blur-md">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inscribed to the Private Atelier Register.</span>
                </div>
              ) : (
                <div className="relative flex items-center rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md p-1 shadow-[0_2px_16px_rgba(0,0,0,0.3)] focus-within:border-white/50 transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    required
                    className="w-full bg-transparent px-4 py-1.5 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95"
                  >
                    Get Notified
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Center Column (4 cols): Atelier Monogram, Brand Seal & Heritage Statement */}
          <div className="lg:col-span-4 flex flex-col items-center text-center justify-center space-y-2.5 px-2 py-3 lg:py-0 border-y lg:border-y-0 border-white/5">
            {/* Brand seal */}
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <span className="font-serif text-xs font-semibold text-white tracking-wider">C</span>
            </div>

            <div className="space-y-0.5">
              <span className="font-serif text-sm sm:text-base tracking-[0.24em] font-medium text-white uppercase block">
                Chronos Atelier
              </span>
              <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block">
                Vallée de Joux, Switzerland
              </span>
            </div>

            <p className="font-serif italic text-xs sm:text-[13px] text-slate-300/90 font-light max-w-xs leading-relaxed pt-0.5">
              "Precision is not merely measured—it is sculpted into eternity with ancestral Swiss mastery."
            </p>

            <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              <span>Manufacture Calibre CH-01</span>
              <span>•</span>
              <span>Geneva Seal Standard</span>
            </div>
          </div>

          {/* Right Column (4 cols): Direct Concierge Contact, Essential Links & Socials */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-between space-y-4 text-left lg:text-right pt-2 lg:pt-0">
            {/* Direct Concierge Contact */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block">
                Atelier Concierge Desk
              </span>
              <div className="font-mono text-xs text-slate-300 flex flex-wrap lg:justify-end items-center gap-3">
                <a href="mailto:concierge@chronos-atelier.ch" className="hover:text-white transition-colors">
                  concierge@chronos-atelier.ch
                </a>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-400">+41 (0)21 845 00 00</span>
              </div>
            </div>

            {/* Essential non-redundant links */}
            <div className="flex flex-wrap lg:justify-end items-center gap-x-4 gap-y-1.5 text-xs font-light text-slate-400">
              <a href="#artisan" className="hover:text-white transition-colors">Atelier Archives</a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="hover:text-white transition-colors cursor-pointer">COSC Timing Dossier</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <a href="#configurator" className="hover:text-white transition-colors">Private Allocation</a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Press Inquiries</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center lg:justify-end gap-3.5 text-slate-400 pt-1">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" aria-label="X" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Registry Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <span>© 2026 Chronos Atelier d'Haute Horlogerie S.A. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <span className="hover:text-slate-300 cursor-pointer">Swiss Escrow Protocol</span>
            <span className="hover:text-slate-300 cursor-pointer">Cantonal Registry CHE-482.910.124</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
