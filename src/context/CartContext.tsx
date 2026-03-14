"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

/* ── Types ── */
export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  savings: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "aegle_cart";

/* ── Provider ── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const savings = items.reduce(
    (sum, i) => sum + ((i.comparePrice ?? i.price) - i.price) * i.qty,
    0
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback(
    (product: Omit<CartItem, "qty">, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { ...product, qty }];
      });
      setIsOpen(true); // open drawer on add
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        savings,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
