export default function WebsitesPage() {
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Demo Şablon ${i + 1}`,
    desc: "Özelleştirilebilir kurumsal web sitesi şablonu.",
  }));
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Web Siteleri</h1>
      <p className="text-gray-600 mb-8">Aşağıdaki hazır şablonlardan birini seçip renk, yazı ve görselleri size göre düzenleyebiliriz.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
            <div className="aspect-video rounded-xl bg-gray-100 mb-3 grid place-items-center text-gray-500">Önizleme</div>
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm text-gray-600">{it.desc}</p>
            <div className="mt-3 flex gap-2">
              <a href="#" className="px-3 py-2 rounded-lg border">Detay</a>
              <a href="#" className="px-3 py-2 rounded-lg border bg-black text-white">Özelleştir</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}