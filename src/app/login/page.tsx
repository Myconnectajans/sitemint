"use client";
import { useState } from "react";
import Link from "next/link";
import VideoBackground from "@/components/VideoBackground";
import { getBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState<string|null>(null);
  async function handleLogin(){
    setError(null); setLoading(true);
    try{ const sb = getBrowserClient(); const { error } = await sb.auth.signInWithPassword({ email, password }); if(error) throw error; window.location.href="/dashboard"; }
    catch(e:any){ setError(e.message||"Giriş başarısız."); } finally{ setLoading(false); }
  }
  return (
    <main className="relative min-h-dvh grid place-items-center p-6 text-white z-10">\n      <VideoBackground />
      <VideoBackground />
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 backdrop-blur p-6 shadow text-neutral-900 -mt-[6vh] md:-mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-black text-white">Hesabınıza giriş yapın</h1>
        <p className="text-center text-gray-600 mb-4">Tekrar hoş geldiniz! Lütfen bilgilerinizi girin</p>
        <div className="grid gap-3">
          <label className="text-sm font-medium">E-posta</label>
          <input className="border rounded-lg px-3 py-2 placeholder-gray-500 outline-none" value={email} onChange={e=>setEmail(e.target.value)} placeholder="mail@ornek.com" />
          <label className="text-sm font-medium">Şifre</label>
          <input type="password" className="border rounded-lg px-3 py-2 placeholder-gray-500 outline-none" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <div className="text-right text-sm"><button className="underline text-gray-600" onClick={()=>alert("Forgot password akışını Supabase'te etkinleştirin.")}>Şifrenizi mi unuttunuz?</button></div>
          <button onClick={handleLogin} disabled={loading} className="rounded-lg bg-black text-white px-4 py-2">{loading?"Giriş yapılıyor...":"E-posta ile Giriş Yap →"}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">Hesabınız yok mu? <Link href="/signup" className="underline">Kaydol</Link></p>
      </div>
    </main>
  );
}
