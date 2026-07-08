// (Zustand)
// store/useCartStore.js
import { create } from "zustand";

const useCartStore = create((set) => ({
    items: [],

    addToCart: (product, quantity = 1) => set((state) => {
        const existing = state.items.find(item => item.id === product.id);

        if (existing) {
            // already in cart — increase quantity
            return {
                items: state.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            };
        }

        // new item — add to cart
        return {
            items: [...state.items, { ...product, quantity }]
        };
    }),

    removeFromCart: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),

    updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
    })),

    clearCart: () => set({ items: [] })
}));

export default useCartStore;