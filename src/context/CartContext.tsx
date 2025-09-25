"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  count: number;
  setCount: (n: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart_count");
      if (saved !== null) setCount(parseInt(saved, 10) || 0);
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem("cart_count", String(count));
    } catch {}
  }, [count]);

  const value: CartContextType = {
    count,
    setCount,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => Math.max(0, c - 1)),
    reset: () => setCount(0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}