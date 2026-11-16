import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export type CartItem = { id: string; size: string; qty: number };
export type Order = {
  id: string; date: string; items: (CartItem & { title: string; price: number })[];
  subtotal: number; shipping: number; total: number;
  customer: { name: string; phone: string; email: string; city: string; district: string; street: string; notes: string };
  payment: string; status: string;
};

type Ctx = {
  items: CartItem[]; add: (i: CartItem) => void; setQty: (id: string, size: string, qty: number) => void;
  clear: () => void; count: number; subtotal: number;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "am_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
  }, []);
  const save = (next: CartItem[]) => { setItems(next); localStorage.setItem(KEY, JSON.stringify(next)); };
  const add = (i: CartItem) => {
    const ex = items.find((x) => x.id === i.id && x.size === i.size);
    save(ex ? items.map((x) => (x === ex ? { ...x, qty: x.qty + i.qty } : x)) : [...items, i]);
  };
  const setQty = (id: string, size: string, qty: number) =>
    save(qty <= 0 ? items.filter((x) => !(x.id === id && x.size === size)) : items.map((x) => (x.id === id && x.size === size ? { ...x, qty } : x)));
  const subtotal = items.reduce((s, i) => s + (getProduct(i.id)?.price ?? 0) * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <CartContext.Provider value={{ items, add, setQty, clear: () => save([]), count, subtotal }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
};

export const saveOrder = (o: Order) => localStorage.setItem(`am_order_${o.id}`, JSON.stringify(o));
export const loadOrder = (id: string): Order | null => {
  try { return JSON.parse(localStorage.getItem(`am_order_${id}`) || "null"); } catch { return null; }
};
