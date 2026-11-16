
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products as initialProducts } from "../data/products";

function normalizeProduct(product, index) {
  const name = String(product.name ?? product.title ?? "");

  return {
    ...product,
    id: product.id ?? Date.now() + index,
    name,
    title: name,
    category: String(product.category ?? "دیجیتال"),
    price: Number(product.price) || 0,
    oldPrice: Number(product.oldPrice) || 0,
    discount: Number(product.discount) || 0,
    rating: Number(product.rating) || 5,
    image: String(product.image ?? ""),
  };
}

function getInitialProducts() {
  try {
    const savedProducts = localStorage.getItem("nik-market-admin-products");

    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);

      if (Array.isArray(parsedProducts)) {
        return parsedProducts.map(normalizeProduct);
      }
    }
  } catch {
    return initialProducts.map(normalizeProduct);
  }

  return initialProducts.map(normalizeProduct);
}

const useShopStore = create(
  persist(
    (set) => ({
      products: getInitialProducts(),
      cart: [],
      favorites: [],
      user: null,

      login: (user) => set({ user }),

      logout: () => set({ user: null }),

      addProduct: (product) =>
        set((state) => ({
          products: [
            normalizeProduct(
              {
                ...product,
                id: product.id ?? Date.now(),
              },
              state.products.length
            ),
            ...state.products,
          ],
        })),

      updateProduct: (productId, updatedData) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? normalizeProduct(
                  {
                    ...product,
                    ...updatedData,
                    name: updatedData.name ?? updatedData.title ?? product.name,
                    title: updatedData.title ?? updatedData.name ?? product.name,
                  },
                  0
                )
              : product
          ),
        })),

      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId
          ),
          cart: state.cart.filter((item) => item.id !== productId),
          favorites: state.favorites.filter((id) => id !== productId),
        })),

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

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

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

      clearCart: () => set({ cart: [] }),

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
      partialize: (state) => ({
        products: state.products,
        cart: state.cart,
        favorites: state.favorites,
        user: state.user,
      }),
    }
  )
);

export default useShopStore;
