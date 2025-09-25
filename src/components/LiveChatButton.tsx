"use client";
import { useEffect, useRef, useState } from "react";

// Placeholder API shape; swap with real provider later.
async function sendMessageToSupport(_message: string) {
  // TODO: replace with actual chat API call
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export default function LiveChatButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const rootRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    function onDoc(e:MouseEvent){
      if(!open) return;
      const el = rootRef.current; if(!el) return;
      if(!el.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return ()=>document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-4 right-4 z-50">
      {/* panel */}
      {open && (
        <div className="mb-3 w-[320px] rounded-2xl border border-white/20 bg-white/95 shadow-xl backdrop-blur text-black">
          <div className="flex items-center justify-between p-3">
            <div className="font-semibold">Canlı Destek</div>
            <button onClick={()=>setOpen(false)} className="rounded-md p-1 hover:bg-black/5">✕</button>
          </div>
          <div className="px-3 pb-3 text-sm text-gray-600">
            Merhaba! Mesaj bırakın, gerçek zamanlı sohbeti burada entegre edeceğiz.
          </div>
          <div className="px-3 pb-3">
            <textarea
              className="w-full rounded-lg border p-2 outline-none focus:ring"
              rows={3}
              placeholder="Sorunuzu yazın..."
              value={msg}
              onChange={(e)=>setMsg(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 px-3 pb-3">
            <button
              disabled={loading || !msg.trim()}
              onClick={async()=>{
                setLoading(true);
                await sendMessageToSupport(msg);
                setMsg("");
                setLoading(false);
                setOpen(false);
              }}
              className="rounded-md bg-black px-3 py-2 text-white disabled:opacity-50"
            >
              Gönder
            </button>
          </div>
        </div>
      )}

      {/* trigger */}
      <button
        onClick={()=>setOpen(v=>!v)}
        className="rounded-full bg-amber-500 px-4 py-3 font-semibold text-black shadow-lg hover:brightness-95"
        aria-label="Canlı destek"
      >
        Canlı Destek
      </button>
    </div>
  );
}
