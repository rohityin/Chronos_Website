/**
 * Horological Escapement Sound Engine
 * Synthesizes 4 Hz (28,800 vph) mechanical clicks via Web Audio API.
 * Cleans up AudioContext and audio nodes to minimize CPU and battery consumption.
 */

let audioCtx: AudioContext | null = null;
let timerId: number | null = null;
let isTicking = false;
let beatCount = 0;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx?.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playEscapementTick(isTock = false) {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = isTock ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isTock ? 3200 : 3800, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);

    // Explicit node cleanup after play
    setTimeout(() => {
      try {
        osc.disconnect();
        filter.disconnect();
        gain.disconnect();
      } catch {
        // Ignored
      }
    }, 40);
  } catch {
    // Graceful fallback if autoplay policy blocks audio
  }
}

export const escapementAudio = {
  playSingleTick: () => playEscapementTick(false),
  startTicking: () => {
    if (isTicking) return;
    const ctx = getContext();
    if (!ctx) return;
    isTicking = true;
    timerId = window.setInterval(() => {
      beatCount++;
      playEscapementTick(beatCount % 2 === 0);
    }, 125); // 8 beats/sec = 28,800 vph
  },
  stopTicking: () => {
    isTicking = false;
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
    // Suspend audio context to avoid background audio clock drain
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  },
  getIsTicking: () => isTicking,
};
