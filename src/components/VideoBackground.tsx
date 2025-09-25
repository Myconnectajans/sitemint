"use client";
import { useRef, useEffect } from "react";

export default function VideoBackground() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    (v as any).playsInline = true;
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else {
      v.addEventListener("loadedmetadata", play, { once: true });
      v.addEventListener("canplay", play, { once: true });
    }
    return () => {
      v.removeEventListener("loadedmetadata", play as any);
      v.removeEventListener("canplay", play as any);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/stars-poster.jpg"
        onError={(e) => {
          const el = e.currentTarget.parentElement as HTMLElement;
          if (el) {
            el.style.background =
              "radial-gradient(1200px 700px at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0.9))";
          }
          e.currentTarget.style.display = "none";
        }}
      >
        <source src="/GettyImages-1214124151.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}
