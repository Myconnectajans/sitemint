"use client";
import { useState } from "react";
import Link from "next/link";
import VideoBackground from "@/components/VideoBackground";
import { getBrowserClient } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [password2, setPassword2] = useState(""); const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string|null>(null); const [info, setInfo] = useState<string|null>(null);

  async function handleSignup(){
    setError(null); setInfo(null);
    if(!email || !password || !password2 || !username) return setError("Lütfen tüm alanları doldurun.");
    if(password!==password2) return setError("Şifreler eşleşmiyor.");
    setLoading(true);
    try{
      const sb = getBrowserClient();
      const { error } = await sb.auth.signUp({ email, password, options: { data: { username }, emailRedirectTo: typeof window!=='undefined'?`${window.location.origin}/login`:undefined } });
      if(error) throw error;
      setInfo("Kayıt başarılı! E-posta doğrulaması gerekebilir. Ardından giriş yapın.");
    }catch(e:any){ setError(e.message||"Beklenmeyen hata."); } finally{ setLoading(false); }
  }

  return (
    <main className="relative min-h-dvh grid place-items-center p-6 text-white z-10">\n      <VideoBackground />
      <VideoBackground />
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 backdrop-blur p-6 shadow text-neutral-900 -mt-[6vh] md:-mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-black text-white">Kaydol</h1>
        <div className="grid gap-3 mt-4">
          <label className="text-sm font-medium">Kullanıcı Adı</label>
          <input className="border rounded-lg px-3 py-2 placeholder-gray-500 outline-none" value={username} onChange={e=>setUsername(e.target.value)} placeholder="kullanici_adi" />
          <label className="text-sm font-medium">E-posta</label>
          <input className="border rounded-lg px-3 py-2 placeholder-gray-500 outline-none" value={email} onChange={e=>setEmail(e.target.value)} placeholder="mail@ornek.com" />
          <label className="text-sm font-medium">Şifre</label>
          <input type="password" className="border rounded-lg px-3 py-2 placeholder-gray-500 outline-none" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <label className="text-sm font-medium">Şifrenizi tekrar yazın</label>
          <input type="password" className="border rounded-lg px-3 py-2 placeholder-gray-500 outline-none" value={password2} onChange={e=>setPassword2(e.target.value)} placeholder="••••••••" />
          <button onClick={handleSignup} disabled={loading} className="mt-2 rounded-lg bg-black text-white px-4 py-2">{loading?"Kaydediliyor...":"E-posta ile Kaydol →"}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-emerald-600">{info}</p>}
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">Zaten hesabınız var mı? <Link href="/login" className="underline">Giriş yap</Link></p>
      </div>
    </main>
  );
}
