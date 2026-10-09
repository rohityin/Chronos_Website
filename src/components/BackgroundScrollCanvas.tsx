import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 331;
const START_FRAME = 1; // Frame 1 displays the iconic Chronos title and pristine hand-assembled watch

export const BackgroundScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedFramesRef = useRef<Set<number>>(new Set());
  
  const currentFrameRef = useRef(START_FRAME);
  const targetFrameRef = useRef(START_FRAME);
  const isRenderingRef = useRef(false);

  const getFrameUrl = (frameNumber: number) => {
    const padded = String(frameNumber).padStart(3, '0');
    return `/video-frames-4k/frame-${padded}.jpg`;
  };

  // Draw frame with object-fit: cover
  const drawFrame = (frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Nearest loaded frame fallback
    let frameToDraw = frameNum;
    if (!loadedFramesRef.current.has(frameToDraw)) {
      let minDiff = Infinity;
      let closest = START_FRAME;
      for (const loaded of loadedFramesRef.current) {
        const diff = Math.abs(loaded - frameNum);
        if (diff < minDiff) {
          minDiff = diff;
          closest = loaded;
        }
      }
      frameToDraw = closest;
    }

    const img = imagesRef.current[frameToDraw];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, sx, sy, sw, sh);
  };

  // Resize canvas to window dimensions
  const updateCanvasDimensions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    drawFrame(Math.round(currentFrameRef.current));
  };

  // Handle Resize
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions, { passive: true });
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, []);

  // Preloading
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    const loadImg = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[i]) return resolve();
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return resolve();
          imagesRef.current[i] = img;
          loadedFramesRef.current.add(i);
          count++;

          // If this is the start frame, draw immediately!
          if (i === START_FRAME || count === 1) {
            updateCanvasDimensions();
            drawFrame(START_FRAME);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const loadAll = async () => {
      // 1. Immediately load frame 1 first!
      await loadImg(START_FRAME);
      
      // 2. Immediately load early frames (1 to 30) so initial scroll and fade are instantaneous
      const immediateFrames = Array.from({ length: 30 }, (_, idx) => 1 + idx);
      await Promise.all(immediateFrames.map(loadImg));

      // 3. Load key milestones across the entire scrub track
      const milestones = [45, 75, 105, 135, 165, 195, 225, 255, 285, 310, 331];
      await Promise.all(milestones.map(loadImg));

      // 4. Stream all remaining frames in rapid batches
      const allIndices = Array.from({ length: TOTAL_FRAMES }, (_, idx) => idx + 1);
      const batchSize = 25;
      for (let i = 0; i < allIndices.length; i += batchSize) {
        if (isCancelled) break;
        const batch = allIndices.slice(i, i + batchSize);
        await Promise.all(batch.map(loadImg));
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Scroll listener mapped to frames
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      // Map scroll progress (0..1) to frames (START_FRAME..TOTAL_FRAMES)
      targetFrameRef.current = START_FRAME + progress * (TOTAL_FRAMES - START_FRAME);

      if (!isRenderingRef.current) {
        isRenderingRef.current = true;
        requestAnimationFrame(renderLoop);
      }
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.15;
        drawFrame(Math.round(currentFrameRef.current));
        requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(Math.round(currentFrameRef.current));
        isRenderingRef.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      {/* Instant fallback poster image rendered directly by browser before canvas paints */}
      <img
        src="/video-frames-4k/frame-001.jpg"
        alt="Chronos Atelier No 01 Mechanical Watch"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-1"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};
