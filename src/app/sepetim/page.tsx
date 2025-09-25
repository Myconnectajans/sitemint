"use client";
import { useCart } from "@/context/CartContext";

export default function SepetimPage() {
  const { count, increment, decrement, reset, setCount } = useCart();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Sepetim</h1>
      <p className="text-gray-600">Sepetinizde <strong>{count}</strong> ürün var.</p>

      <div className="flex items-center gap-2">
        <button onClick={decrement} className="px-3 py-2 rounded-lg border">-1</button>
        <button onClick={increment} className="px-3 py-2 rounded-lg border">+1</button>
        <button onClick={reset} className="px-3 py-2 rounded-lg border">Sıfırla</button>
      </div>

      <div className="text-sm text-gray-500">
        <p>Not: Bu sayı demo amaçlıdır ve tarayıcınızın localStorage'ında saklanır.</p>
      </div>
    </main>
  );
}