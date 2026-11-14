
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useShopStore = create(
  persist(
    (set) => ({
      cart: [],
      favorites: [],

      // افزودن محصول به سبد خرید
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
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

      // حذف محصول از سبد خرید
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      // تغییر تعداد محصول
      updateQuantity: (productId, newQuantity) =>
        set((state) => {
          if (newQuantity < 1) {
            return {};
          }

          return {
            cart: state.cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        }),

      // خالی کردن سبد خرید
      clearCart: () => set({ cart: [] }),

      // افزودن یا حذف از علاقه‌مندی‌ها
      toggleFavorite: (productId) =>
        set((state) => {
          const isFavorite = state.favorites.includes(productId);

          return {
            favorites: isFavorite
              ? state.favorites.filter((id) => id !== productId)
              : [...state.favorites, productId],
          };
        }),
    }),
    {
      name: "nik-market-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useShopStore;
