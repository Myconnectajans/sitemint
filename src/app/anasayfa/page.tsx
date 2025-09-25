import Link from "next/link";

export default function Anasayfa() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Hoş geldiniz</h1>
      <p className="text-gray-700 mb-6">Burası giriş yaptıktan sonra görünen tanıtım/anasayfa alanı. Burayı dilediğiniz gibi düzenleyebiliriz.</p>
      <div className="flex flex-wrap gap-3">
        <Link className="px-4 py-2 rounded-lg border" href="/websites">Web siteleri</Link>
        <Link className="px-4 py-2 rounded-lg border" href="/business-cards">Kartvizitler</Link>
        <Link className="px-4 py-2 rounded-lg border" href="/packages">Paketler</Link>
        <Link className="px-4 py-2 rounded-lg border" href="/support">Destek</Link>
        <Link className="px-4 py-2 rounded-lg border" href="/about">Hakkımızda</Link>
      </div>
    </main>
  );
}