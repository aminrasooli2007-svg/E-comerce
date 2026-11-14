import { create } from "zustand";

const useShopStore = create((set) => ({
  cart: [],
  favorites: [],

  addToCart: (product) => {
    set((state) => {
      const productInCart = state.cart.find(
        (item) => item.id === product.id
      );

      if (productInCart) {
        return {
          cart: state.cart.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }

            return item;
          }),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }

        return item;
      }),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  toggleFavorite: (productId) => {
    set((state) => {
      const isFavorite = state.favorites.includes(productId);

      if (isFavorite) {
        return {
          favorites: state.favorites.filter(
            (id) => id !== productId
          ),
        };
      }

      return {
        favorites: [...state.favorites, productId],
      };
    });
  },
}));

export default useShopStore;