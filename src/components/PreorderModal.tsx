import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Award, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WatchEdition } from '../types/horology';
import { escapementAudio } from '../utils/escapementAudio';

interface PreorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  edition: WatchEdition;
  initialStrap?: string;
  initialMonogram?: string;
  onAllocationConfirmed: (serialNumber: string) => void;
}

export const AVAILABLE_SERIALS = ['04/25', '07/25', '10/25', '13/25', '18/25', '25/25'] as const;
export type AvailableSerial = (typeof AVAILABLE_SERIALS)[number];

export const PreorderModal: React.FC<PreorderModalProps> = ({
  isOpen,
  onClose,
  edition,
  initialStrap,
  initialMonogram,
  onAllocationConfirmed,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Switzerland');
  const [selectedSerial, setSelectedSerial] = useState<AvailableSerial>('07/25');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [allocationHash, setAllocationHash] = useState('');

  if (!isOpen) return null;

  const availableSerials = AVAILABLE_SERIALS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    escapementAudio.playSingleTick();

    setTimeout(() => {
      const generatedHash = `CH-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
      setAllocationHash(generatedHash);
      setIsSubmitting(false);
      setIsConfirmed(true);
      onAllocationConfirmed(selectedSerial);

      // Trigger golden celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f1f5f9', '#38bdf8', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090d13] border border-white/20 rounded-3xl shadow-[0_20px_90px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-[#06080b]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#38bdf8] block mb-1">
              Collector Allocation Concierge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Reserve {edition.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!isConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Reference Summary Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e131b] border border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={edition.image}
                    alt={edition.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <span className="font-serif text-base text-white block">
                      {edition.name}
                    </span>
                    <span className="text-xs font-mono text-[#d4af37] block">
                      {edition.price}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Strap: {initialStrap || edition.strap}
                    </span>
                  </div>
                </div>
                <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Securing Deposit
                  </span>
                  <span className="text-sm font-mono font-bold text-white block">
                    {edition.deposit}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 block">
                    Refundable Escrow
                  </span>
                </div>
              </div>

              {/* Serial Allocation Picker */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
                  Requested Numbered Serial (Series of 25)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableSerials.map((serial) => {
                    const isSelected = selectedSerial === serial;
                    return (
                      <button
                        type="button"
                        key={serial}
                        onClick={() => setSelectedSerial(serial)}
                        className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-[#38bdf8]/15 border-[#38bdf8] text-white shadow-md'
                            : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {serial}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collector Details Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Collector Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Direct Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@horology.ch"
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Residence / Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Switzerland, Monaco, United Kingdom"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              {/* Security & Escrow Guarantee */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <div className="text-[11px] font-mono text-slate-400 leading-relaxed">
                  Allocations are held in regulated Swiss fiduciary escrow. Your allocation code will be delivered within 2 hours alongside a personal call from our Head Horologist to finalize delivery arrangements and private fitting in Geneva.
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Serial {selectedSerial}...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Confirm Allocation Request ({edition.deposit})</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Allocation Confirmation View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-1">
                  Allocation Secured • Fiduciary Registration
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  Piece {selectedSerial} Reserved
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-2">
                  Certificate Ref: <span className="text-white font-semibold">{allocationHash}</span>
                </p>
              </div>

              {/* Certificate Preview Card */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#0e131b] border border-[#d4af37]/30 text-left font-mono relative shadow-2xl">
                <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
                  <div>
                    <span className="font-serif text-lg text-white font-normal block">
                      Chronos Atelier
                    </span>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      Certificate of Horological Provenance
                    </span>
                  </div>
                  <Award className="w-6 h-6 text-[#d4af37]" />
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patron</span>
                    <span className="text-white font-semibold">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Execution</span>
                    <span className="text-white">{edition.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unique Number</span>
                    <span className="text-[#38bdf8] font-bold">{selectedSerial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bespoke Monogram</span>
                    <span className="text-slate-300">{initialMonogram || 'CHRONOS NO. 01'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Signé: Laurent M., Maître</span>
                  <span className="text-emerald-400 font-bold">STATUS: ALLOCATED</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-light max-w-sm mx-auto">
                An invitation for your private atelier viewing and fitting at the Vallée de Joux studio has been dispatched to <span className="text-white">{email}</span>.
              </p>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Return to Atelier
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
