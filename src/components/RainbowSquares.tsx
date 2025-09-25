"use client";
import { useEffect, useRef } from "react";
export default function RainbowSquares() {
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(()=>{
    const canvas = ref.current!; const ctx = canvas.getContext('2d')!;
    let raf = 0; const DPR = Math.min(window.devicePixelRatio||1,2);
    function resize(){ canvas.width = Math.floor(window.innerWidth*DPR); canvas.height = Math.floor(window.innerHeight*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); }
    resize(); window.addEventListener('resize', resize);
    const N=140; const a = Array.from({length:N},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,s:Math.random()*12+6,v:Math.random()*0.7+0.3,r:Math.random()*Math.PI,vr:(Math.random()-0.5)*0.02,h:Math.floor(Math.random()*360),al:Math.random()*0.6+0.4}));
    function frame(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of a){ ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.fillStyle=`hsla(${p.h},80%,60%,${p.al})`.replace('h', 'h').replace('p', 'p'); ctx.fillStyle=`hsla(${p.h},80%,60%,${p.al})`; ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s); ctx.restore(); p.y+=p.v; p.r+=p.vr; if(p.y>window.innerHeight+20){ p.y=-20; p.x=Math.random()*window.innerWidth; p.h=Math.floor(Math.random()*360); } }
      raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    return ()=>{ window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  },[]);
  return <canvas ref={ref} className="fixed inset-0 -z-10" aria-hidden />;
}
