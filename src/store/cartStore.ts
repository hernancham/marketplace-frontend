import { create } from "zustand";
import { CartItem } from "../types/cart";

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
          ),
          total: state.total + item.precio,
        };
      }
      return {
        items: [...state.items, item],
        total: state.total + item.precio,
      };
    });
  },

  clearCart: () => {
    set(() => ({
      items: [],
      total: 0,
    }));
  },
}));
