import { useEffect, useState, useRef } from 'react';

export function useParallax() {
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetTilt.current = { x: nx, y: ny };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth lerp animation loop with idle threshold gating to prevent idle re-renders
    const loop = () => {
      const scrollDiff = targetScrollY.current - currentScrollY.current;
      const tiltDiffX = targetTilt.current.x - currentTilt.current.x;
      const tiltDiffY = targetTilt.current.y - currentTilt.current.y;

      if (Math.abs(scrollDiff) > 0.05) {
        currentScrollY.current += scrollDiff * 0.12;
        setSmoothScrollY(currentScrollY.current);
      }

      if (Math.abs(tiltDiffX) > 0.005 || Math.abs(tiltDiffY) > 0.005) {
        currentTilt.current.x += tiltDiffX * 0.08;
        currentTilt.current.y += tiltDiffY * 0.08;
        setMouseTilt({ x: currentTilt.current.x, y: currentTilt.current.y });
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { smoothScrollY, mouseTilt };
}
