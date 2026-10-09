import { useEffect, useState, useRef } from 'react';

export function useParallax(): { smoothScrollY: number } {
  const [smoothScrollY, setSmoothScrollY] = useState(0);

  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth lerp animation loop with idle threshold gating to prevent idle re-renders
    const loop = () => {
      const scrollDiff = targetScrollY.current - currentScrollY.current;

      if (Math.abs(scrollDiff) > 0.05) {
        currentScrollY.current += scrollDiff * 0.12;
        setSmoothScrollY(currentScrollY.current);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { smoothScrollY };
}
