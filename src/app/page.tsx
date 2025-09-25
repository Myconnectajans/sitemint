import Link from "next/link";
import IntroOverlay from "@/components/IntroOverlay";
import VideoBackground from "@/components/VideoBackground";

export default function PublicHome() {
  return (
    <>
      <IntroOverlay />
      <main className="relative min-h-dvh text-white">
        <VideoBackground />

        <section className="mx-auto max-w-7xl px-6 py-20 min-h-[78vh] grid place-content-center relative z-10 relative z-10">
          <h1 className="text-[12vw] leading-[1.04] md:text-[7rem] md:leading-[1.04] font-extrabold tracking-tight">
            Hayalinizdeki <span className="font-light">Kurumsal</span><br className="hidden md:block" />
            <span className="font-light">Kimliği</span> <span className="font-light">Bugün</span> Oluşturun
          </h1>

          <p className="mt-8 max-w-3xl text-lg md:text-xl text-white/90">
            Hayalinizdeki kurumsal kimliği <b>uygun fiyata</b> oluşturun. Yüzlerce tema arasından seçin, metin–renk–logo gibi detayları
            dilediğiniz gibi özelleştirin, <b>sipariş edin</b>; yayını <b>biz</b> sizin için gerçekleştirelim.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-amber-500 text-black px-6 py-3 font-semibold shadow hover:brightness-95 transition">
              Kayıt ol <span aria-hidden>→</span>
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition">
              Giriş yap <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
