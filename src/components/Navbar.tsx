"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";
import { useEffect, useRef, useState } from "react";
import { getBrowserClient } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { useCart } from "@/context/CartContext";

type SessionState = { ready: boolean; loggedIn: boolean; email?: string; username?: string };

export default function Navbar() {
  const pathname = usePathname();
  const isVideoBg = pathname === '/' || pathname === '/login' || pathname === '/signup';
  const [s, setS] = useState<SessionState>({ ready: false, loggedIn: false });
  const { t, lang, toggle: toggleLang } = useI18n();
  const { count } = useCart();
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
  { href: "/websites", label: t("websites") },
  { href: "/business-cards", label: t("businessCards") },
  { href: "/logo-design", label: t("logoDesign") },
  { href: "/solutions", label: t("solutionPartner") },
  { href: "/about", label: t("about") },
  { href: "/support", label: t("support") },
];

  const guestItems = [
  { href: "/websites", label: t("websites") },
  { href: "/business-cards", label: t("businessCards") },
  { href: "/logo-design", label: t("logoDesign") },
  { href: "/solutions", label: t("solutionPartner") },
  { href: "/about", label: t("about") },
  { href: "/support", label: t("support") },
];

  async function signOut(){
    try { localStorage.setItem("skip_intro_once","1"); } catch {}
    await getBrowserClient().auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className={`${isVideoBg ? "sticky top-0 z-40 border-b-0 bg-transparent" : (theme==="dark" ? "sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur text-white" : "sticky top-0 z-40 border-b bg-white/90 backdrop-blur text-black")}`}>
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href={s.loggedIn ? "/anasayfa" : "/"} className={`text-xl font-bold tracking-tight ${isVideoBg ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" : "text-black"}`}>SiteMint</Link>

        <button className="md:hidden p-2 border rounded-lg" onClick={()=>setOpen(o=>!o)} aria-label="Menüyü aç/kapat">☰</button>

        <div className="hidden md:flex items-center gap-1 w-full">
  <div className="flex-1 flex justify-center">
    {(s.loggedIn ? authedItems : guestItems).map(it=> (
      <Link key={it.href} href={it.href} className={`${linkClass(it.href)} ${isVideoBg ? "text-white/80 hover:bg-white/10 hover:text-white" : ""}` }>{it.label}</Link>
    ))}
  </div>
  {!s.loggedIn ? (
    <div className="ml-2 flex items-center gap-2">
      <Link href="/signup" className={`${pathname === "/signup" ? "bg-white text-black" : (isVideoBg ? "border border-white text-white" : "border text-black")} px-3 py-2 rounded-lg`}>{t("signupFree")}</Link>
      <Link href="/login" className={`${pathname === "/login" ? "bg-white text-black" : (isVideoBg ? "border border-white text-white" : "border text-black")} px-3 py-2 rounded-lg`}>{t("login")}</Link>
    </div>
  ) : (
    <div className="ml-2 flex items-center">
      <div className="ml-2 relative" ref={langRef}>
  <button onClick={()=>setLangOpen(v=>!v)} className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 inline-flex items-center gap-1">
    <span>{t("lang_" + lang)}</span>
    <span>▾</span>
  </button>
  {langOpen && (
    <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-lg overflow-hidden z-50">
      <button onClick={()=>{setLang("ar"); setLangOpen(false);}} className="w-full text-left px-3 py-2 hover:bg-gray-50">العربية</button>
      <button onClick={()=>{setLang("en"); setLangOpen(false);}} className="w-full text-left px-3 py-2 hover:bg-gray-50">English</button>
      <button onClick={()=>{setLang("de"); setLangOpen(false);}} className="w-full text-left px-3 py-2 hover:bg-gray-50">Deutsch</button>
      <button onClick={()=>{setLang("ru"); setLangOpen(false);}} className="w-full text-left px-3 py-2 hover:bg-gray-50">Русский</button>
      <button onClick={()=>{setLang("tr"); setLangOpen(false);}} className="w-full text-left px-3 py-2 hover:bg-gray-50">Türkçe</button>
    </div>
  )}
</div>
      <Link href="/sepetim" className="ml-2 relative inline-flex items-center justify-center rounded-lg border bg-white hover:bg-gray-50 px-3 py-2" aria-label="Sepetim">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6h15l-1.5 9h-12z" />
          <path d="M6 6L5 3H3" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] leading-[18px] text-white bg-black text-center select-none">{count}</span>
      </Link>
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
            <Link href="/profile" className="block px-3 py-2 hover:bg-gray-50">{t("profile")}</Link>
            <Link href="/my-products" className="block px-3 py-2 hover:bg-gray-50">{t("myProducts")}</Link>
            <button onClick={signOut} className="w-full text-left px-3 py-2 hover:bg-gray-50">{t("logout")}</button>
          </div>
        )}
      </div>
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
              <Link href="/signup" className="flex-1 px-3 py-2 rounded-lg bg-black text-white text-center">{t("signupFree")}</Link>
              <Link href="/login" className="flex-1 px-3 py-2 rounded-lg border text-center">{t("login")}</Link>
            </div>
          ) : (
            <div className="pt-2">
              <Link href="/profile" className="block px-3 py-2 rounded-lg bg-gray-50">{t("profile")}</Link>
              <Link href="/my-products" className="block px-3 py-2 rounded-lg bg-gray-50">{t("myProducts")}</Link>
              <Link href="/settings" className="block px-3 py-2 rounded-lg bg-gray-50">Ayarlar</Link>
              <button onClick={signOut} className="w-full text-left px-3 py-2 rounded-lg bg-gray-50">{t("logout")}</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
