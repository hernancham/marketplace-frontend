import { create } from "zustand";

interface CartItem {
  id: string;
  titulo: string;
  precio: number;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (item: CartItem, cantidad?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, cantidad: number) => void;
  getOrderPayload: () => { items: { productId: string; quantity: number }[] };
  getWhatsAppMessage: () => string;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addToCart: (item, cantidad = 1) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, cantidad: i.cantidad + cantidad } : i
          ),
          total: state.total + item.precio * cantidad,
        };
      }
      return {
        items: [...state.items, { ...item, cantidad }],
        total: state.total + item.precio * cantidad,
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      return {
        items: state.items.filter((i) => i.id !== id),
        total: state.total - item.precio * item.cantidad,
      };
    }),

  clearCart: () => set({ items: [], total: 0 }),

  updateQuantity: (id, cantidad) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, cantidad } : i)),
      total: state.items.reduce(
        (acc, i) =>
          i.id === id ? acc + i.precio * cantidad : acc + i.precio * i.cantidad,
        0
      ),
    })),

  getOrderPayload: () => {
    const state = get();
    return {
      items: state.items.map((item) => ({
        productId: item.id,
        quantity: item.cantidad,
      })),
    };
  },

  getWhatsAppMessage: () => {
    const state = get();
    if (state.items.length === 0) return "";

    let message = `🛒 *Pedido de compra:*\n\n`;

    state.items.forEach((item, index) => {
      message += `${index + 1}. *${item.titulo}*\n`;
      message += `   🔢 Cantidad: ${item.cantidad}\n`;
      message += `   💵 Precio: $${item.precio.toFixed(2)} c/u\n\n`;
    });

    message += `🧾 *Total a pagar: $${state.total.toFixed(2)}*`;
    message += `\n\n🚀 *Envíame este mensaje para confirmar tu pedido!*`;

    return encodeURIComponent(message);
  },
}));
