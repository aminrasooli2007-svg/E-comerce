import { create } from "zustand";

const useShopStore = create((set) => ({
  cart: [],
  favorites: [],

  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((item) => item !== id)
        : [...state.favorites, id],
    })),
}));

export default useShopStore;