"use client";
import { useEffect, useRef } from "react";

/**
 * Robust full-bleed diagonal streaks (no gutters, DPR-safe).
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement|null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    function resize() {
      // CSS size
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      // Pixel buffer size
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * DPR);
      const h = Math.floor(window.innerHeight * DPR);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        ctx.fillStyle = "#0b0b0b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", resize);

    type Streak = { x:number; y:number; len:number; w:number; v:number; hue:number; alpha:number; wob:number; };
    const A = -Math.PI/9; // ~ -20deg
    const cosA = Math.cos(A), sinA = Math.sin(A);
    const streaks: Streak[] = [];

    function targetCount() {
      // density by area (so big screens get more)
      return Math.round(Math.min(260, Math.max(140, (window.innerWidth*window.innerHeight)/9000)));
    }

    function spawn(): Streak {
      const len = 60 + Math.random()*120;
      const speed = 0.9 + Math.random()*1.0;
      const w = 1 + Math.random()*1.8;
      const alpha = 0.35 + Math.random()*0.35;
      return {
        x: Math.random()*(window.innerWidth+240) - 120,
        y: Math.random()*(window.innerHeight+240) - 120,
        len, w, v: speed, hue: 210 + Math.random()*30, alpha,
        wob: Math.random()*Math.PI*2,
      };
    }

    function ensureCount() {
      const t = targetCount();
      while (streaks.length < t) streaks.push(spawn());
      while (streaks.length > t) streaks.pop();
    }
    ensureCount();

    function step() {
      ensureCount();
      // Motion trail (slightly darker to avoid grey wash)
      ctx.fillStyle = "rgba(11,11,11,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const s of streaks) {
        const vx = cosA * s.v * 1.25;
        const vy = sinA * s.v * 1.25;
        s.x += vx; s.y += vy; s.wob += 0.06;
        const wobble = Math.sin(s.wob) * 0.6;

        // wrap without expanding layout
        const off = 150;
        if (s.x > window.innerWidth + off || s.y > window.innerHeight + off) {
          s.x = -off + Math.random()*40;
          s.y = Math.random()*window.innerHeight;
        }

        const x2 = s.x - cosA*(s.len + wobble);
        const y2 = s.y - sinA*(s.len + wobble);

        const grad = ctx.createLinearGradient(s.x, s.y, x2, y2);
        grad.addColorStop(0, `hsla(${s.hue}, 80%, 96%, ${Math.min(1, s.alpha+0.25)})`);
        grad.addColorStop(1, `hsla(${s.hue}, 80%, 55%, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.w;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(x2, y2); ctx.stroke();
      }

      // Soft vignette
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      const g = ctx.createRadialGradient(W/2, H*0.45, Math.min(W,H)*0.2, W/2, H*0.5, Math.max(W,H)*0.9);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.28)");
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 w-screen h-screen" />;
}
