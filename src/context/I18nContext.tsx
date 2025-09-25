"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "tr" | "en" | "de" | "ru" | "ar";
type Dict = Record<string, string>;
type I18nCtx = { lang: Lang; setLang: (l: Lang)=>void; toggle: ()=>void; t: (k: string)=>string };

const DICTS: Record<Lang, Dict> = {
  tr: {
    websites: "Web Siteleri",
    businessCards: "Kartvizitler",
    logoDesign: "Logo Tasarımı",
    solutionPartner: "Çözüm Ortağınız",
    support: "Destek",
    about: "Hakkımızda",
    signupFree: "Ücretsiz Kayıt ol",
    login: "Giriş",
    cart: "Sepetim",
    profile: "Profil",
    myProducts: "Ürünlerim",
    logout: "Çıkış",
    language: "Dil",
    lang_tr: "Türkçe",
    lang_en: "English",
    lang_de: "Deutsch",
    lang_ru: "Русский",
    lang_ar: "العربية"
  },
  en: {
    websites: "Websites",
    businessCards: "Business Cards",
    logoDesign: "Logo Design",
    solutionPartner: "Your Solution Partner",
    support: "Support",
    about: "About",
    signupFree: "Sign up for Free",
    login: "Log in",
    cart: "Cart",
    profile: "Profile",
    myProducts: "My Products",
    logout: "Sign out",
    language: "Language",
    lang_tr: "Türkçe",
    lang_en: "English",
    lang_de: "Deutsch",
    lang_ru: "Русский",
    lang_ar: "العربية"
  },
  de: {
    websites: "Webseiten",
    businessCards: "Visitenkarten",
    logoDesign: "Logo-Design",
    solutionPartner: "Ihr Lösungspartner",
    support: "Support",
    about: "Über uns",
    signupFree: "Kostenlos registrieren",
    login: "Anmelden",
    cart: "Warenkorb",
    profile: "Profil",
    myProducts: "Meine Produkte",
    logout: "Abmelden",
    language: "Sprache",
    lang_tr: "Türkçe",
    lang_en: "English",
    lang_de: "Deutsch",
    lang_ru: "Русский",
    lang_ar: "العربية"
  },
  ru: {
    websites: "Сайты",
    businessCards: "Визитки",
    logoDesign: "Дизайн логотипа",
    solutionPartner: "Ваш партнёр по решениям",
    support: "Поддержка",
    about: "О нас",
    signupFree: "Бесплатная регистрация",
    login: "Войти",
    cart: "Корзина",
    profile: "Профиль",
    myProducts: "Мои продукты",
    logout: "Выйти",
    language: "Язык",
    lang_tr: "Türkçe",
    lang_en: "English",
    lang_de: "Deutsch",
    lang_ru: "Русский",
    lang_ar: "العربية"
  },
  ar: {
    websites: "المواقع",
    businessCards: "بطاقات العمل",
    logoDesign: "تصميم الشعار",
    solutionPartner: "شريك الحلول",
    support: "الدعم",
    about: "من نحن",
    signupFree: "سجّل مجانًا",
    login: "تسجيل الدخول",
    cart: "السلة",
    profile: "الملف الشخصي",
    myProducts: "منتجاتي",
    logout: "تسجيل الخروج",
    language: "اللغة",
    lang_tr: "Türkçe",
    lang_en: "English",
    lang_de: "Deutsch",
    lang_ru: "Русский",
    lang_ar: "العربية"
  },
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");
  useEffect(()=>{
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved) setLang(saved);
    } catch {}
  }, []);
  useEffect(()=>{
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  const value = useMemo<I18nCtx>(() => ({
    lang, setLang, toggle: ()=> setLang(lang==="tr" ? "en" : "tr"),
    t: (k: string) => (DICTS[lang][k] ?? k),
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(){
  const ctx = useContext(I18nContext);
  if(!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}