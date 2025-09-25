"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";
import { useEffect, useRef, useState } from "react";
import { getBrowserClient } from "@/lib/supabase";

type SessionState = { ready: boolean; loggedIn: boolean; email?: string; username?: string };

export default function Navbar() {
  const pathname = usePathname();
  const isVideoBg = pathname === '/' || pathname === '/login' || pathname === '/signup';
  const [s, setS] = useState<SessionState>({ ready: false, loggedIn: false });
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    const supabase = getBrowserClient();
    supabase.auth.getSession().then(({data})=>{
      const u=data.session?.user;
      setS({ ready:true, loggedIn:!!u, email:u?.email??undefined, username:(u?.user_metadata as any)?.username });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session)=>{
      const u=session?.user;
      setS({ ready:true, loggedIn:!!u, email:u?.email??undefined, username:(u?.user_metadata as any)?.username });
    });
    return ()=>{ sub.subscription.unsubscribe(); };
  },[]);

  useEffect(()=>{
    function click(e:MouseEvent){ if(profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false); }
    document.addEventListener('click', click); return ()=>document.removeEventListener('click', click);
  },[]);

  const linkClass = (href: string) => `px-3 py-2 rounded-lg transition ${isVideoBg ? (pathname===href ? "text-white font-semibold" : "text-white/85 hover:text-white") : (pathname===href ? "text-black font-semibold" : "text-gray-700 hover:bg-black/5")}`;

  // Full menu only for logged-in users
  const authedItems = [
    { href: "/websites", label: "Web siteleri" },
    { href: "/business-cards", label: "Kartvizitler" },
    { href: "/logos", label: "Logo Tasarımı" },
    { href: "/packages", label: "Paketler" },
    { href: "/for-agencies", label: "Ajanslar İçin" },
    { href: "/support", label: "Destek" },
    { href: "/about", label: "Hakkımızda" },
  ];

  const guestItems = [
    { href: "/support", label: "Destek" },
    { href: "/about", label: "Hakkımızda" },
  ];

  async function signOut(){
    await getBrowserClient().auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className={`${pathname === "/" ? "sticky top-0 z-40 border-b-0 bg-transparent" : "sticky top-0 z-40 border-b bg-white/90 backdrop-blur"}`}>
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href={s.loggedIn ? "/dashboard" : "/"} className="text-xl font-bold tracking-tight">SiteMint</Link>

        <button className="md:hidden p-2 border rounded-lg" onClick={()=>setOpen(o=>!o)} aria-label="Menüyü aç/kapat">☰</button>

        <div className="hidden md:flex items-center gap-1">
          {(s.loggedIn ? authedItems : guestItems).map(it=> (
            <Link key={it.href} href={it.href} className={linkClass(it.href)}>{it.label}</Link>
          ))}

          {!s.loggedIn ? (
            <div className="ml-2 flex items-center gap-2">
              <Link href="/signup" className={`${pathname === "/" ? "bg-white text-black" : "bg-black text-white"} px-3 py-2 rounded-lg`}>Kayıt ol</Link>
              <Link href="/login" className={`${pathname === "/" ? "border border-white/40 text-white" : "border"} px-3 py-2 rounded-lg`}>Giriş</Link>
            </div>
          ) : (
            <div className="relative ml-2" ref={profileRef}>
              <button onClick={()=>setProfileOpen(v=>!v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-xs">
                  {(s.username?.[0] || s.email?.[0] || "U").toUpperCase()}
                </span>
                <span className="hidden sm:block text-sm">{s.username || s.email}</span>
                <span>▾</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-lg overflow-hidden">
                  <Link href="/profile" className="block px-3 py-2 hover:bg-gray-50">Profil</Link>
                  <Link href="/my-products" className="block px-3 py-2 hover:bg-gray-50">Ürünlerim</Link>
                  <Link href="/settings" className="block px-3 py-2 hover:bg-gray-50">Ayarlar</Link>
                  <button onClick={signOut} className="w-full text-left px-3 py-2 hover:bg-gray-50">Çıkış</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {open && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          {(s.loggedIn ? authedItems : guestItems).map(it=> (
            <Link key={it.href} href={it.href} className="block px-3 py-2 rounded-lg bg-gray-50">{it.label}</Link>
          ))}
          {!s.loggedIn ? (
            <div className="flex gap-2 pt-2">
              <Link href="/signup" className="flex-1 px-3 py-2 rounded-lg bg-black text-white text-center">Kayıt ol</Link>
              <Link href="/login" className="flex-1 px-3 py-2 rounded-lg border text-center">Giriş</Link>
            </div>
          ) : (
            <div className="pt-2">
              <Link href="/profile" className="block px-3 py-2 rounded-lg bg-gray-50">Profil</Link>
              <Link href="/my-products" className="block px-3 py-2 rounded-lg bg-gray-50">Ürünlerim</Link>
              <Link href="/settings" className="block px-3 py-2 rounded-lg bg-gray-50">Ayarlar</Link>
              <button onClick={signOut} className="w-full text-left px-3 py-2 rounded-lg bg-gray-50">Çıkış</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
