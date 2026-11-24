
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products as initialProducts } from "../data/products";

const initialCategories = [
  { id: "digital", name: "دیجیتال", value: "دیجیتال" },
  { id: "clothing", name: "پوشاک", value: "پوشاک" },
  { id: "accessories", name: "اکسسوری", value: "اکسسوری" },
  { id: "home", name: "خانه", value: "خانه" },
  { id: "beauty", name: "زیبایی", value: "زیبایی" },
];

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

function normalizeUser(user, index = 0) {
  const email = String(user.email ?? "").trim().toLowerCase();

  return {
    ...user,
    id: user.id ?? `user-${Date.now()}-${index}`,
    name: String(user.name ?? user.fullName ?? "کاربر"),
    email,
    role: user.role === "admin" ? "admin" : "user",
    createdAt: user.createdAt ?? new Date().toISOString(),
  };
}

function normalizeCategory(category, index = 0) {
  const name = String(category.name ?? category.value ?? "").trim();
  const value = String(category.value ?? name).trim();

  return {
    id: category.id ?? `category-${Date.now()}-${index}`,
    name,
    value,
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
      categories: initialCategories,
      cart: [],
      favorites: [],
      user: null,
      users: [],
      orders: [],

      addCategory: (categoryName) =>
        set((state) => {
          const name = String(categoryName ?? "").trim();

          if (
            !name ||
            state.categories.some(
              (category) =>
                category.name.toLowerCase() === name.toLowerCase()
            )
          ) {
            return {};
          }

          const category = normalizeCategory({
            id: `category-${Date.now()}`,
            name,
            value: name,
          });

          return {
            categories: [...state.categories, category],
          };
        }),

      updateCategory: (categoryId, newName) =>
        set((state) => {
          const name = String(newName ?? "").trim();

          if (
            !name ||
            state.categories.some(
              (category) =>
                category.id !== categoryId &&
                category.name.toLowerCase() === name.toLowerCase()
            )
          ) {
            return {};
          }

          const oldCategory = state.categories.find(
            (category) => category.id === categoryId
          );

          if (!oldCategory) {
            return {};
          }

          return {
            categories: state.categories.map((category) =>
              category.id === categoryId
                ? { ...category, name, value: name }
                : category
            ),
            products: state.products.map((product) =>
              product.category === oldCategory.value
                ? { ...product, category: name }
                : product
            ),
          };
        }),

      deleteCategory: (categoryId) =>
        set((state) => {
          const category = state.categories.find(
            (item) => item.id === categoryId
          );

          if (!category) {
            return {};
          }

          return {
            categories: state.categories.filter(
              (item) => item.id !== categoryId
            ),
            products: state.products.map((product) =>
              product.category === category.value
                ? { ...product, category: "بدون دسته‌بندی" }
                : product
            ),
          };
        }),

      login: (user) =>
        set((state) => {
          const normalizedUser = normalizeUser(user);
          const existingUser = state.users.find(
            (item) => item.email === normalizedUser.email
          );

          const users = existingUser
            ? state.users.map((item) =>
                item.email === normalizedUser.email
                  ? {
                      ...item,
                      ...normalizedUser,
                      id: item.id,
                      role: item.role,
                    }
                  : item
              )
            : [...state.users, normalizedUser];

          const savedUser = users.find(
            (item) => item.email === normalizedUser.email
          );

          return {
            user: savedUser,
            users,
          };
        }),

      registerUser: (user) => {
        const normalizedUser = normalizeUser(user);

        set((state) => {
          const alreadyExists = state.users.some(
            (item) => item.email === normalizedUser.email
          );

          if (alreadyExists) {
            return {};
          }

          return {
            users: [...state.users, normalizedUser],
            user: normalizedUser,
          };
        });

        return normalizedUser;
      },

      logout: () => set({ user: null }),

      updateUserRole: (userId, role) =>
        set((state) => {
          if (role !== "admin" && role !== "user") {
            return {};
          }

          const users = state.users.map((item) =>
            item.id === userId ? { ...item, role } : item
          );

          const updatedUser = users.find(
            (item) => item.id === userId
          );

          return {
            users,
            user:
              state.user?.id === userId && updatedUser
                ? updatedUser
                : state.user,
          };
        }),

      deleteUser: (userId) =>
        set((state) => {
          const userToDelete = state.users.find(
            (item) => item.id === userId
          );

          if (!userToDelete || state.user?.id === userId) {
            return {};
          }

          return {
            users: state.users.filter(
              (item) => item.id !== userId
            ),
          };
        }),

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
                    name:
                      updatedData.name ??
                      updatedData.title ??
                      product.name,
                    title:
                      updatedData.title ??
                      updatedData.name ??
                      product.name,
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
          cart: state.cart.filter(
            (item) => item.id !== productId
          ),
          favorites: state.favorites.filter(
            (id) => id !== productId
          ),
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
          cart: state.cart.filter(
            (item) => item.id !== productId
          ),
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

      createOrder: () => {
        let createdOrder = null;

        set((state) => {
          if (state.cart.length === 0) {
            return {};
          }

          const orderItems = state.cart.map((item) => ({
            ...item,
            quantity: Number(item.quantity) || 1,
          }));

          const totalPrice = orderItems.reduce(
            (total, item) =>
              total + item.price * item.quantity,
            0
          );

          createdOrder = {
            id: `NM-${Date.now()}`,
            user: state.user,
            items: orderItems,
            totalPrice,
            status: "pending",
            createdAt: new Date().toISOString(),
          };

          return {
            orders: [createdOrder, ...state.orders],
            cart: [],
          };
        });

        return createdOrder;
      },

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        })),

      deleteOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter(
            (order) => order.id !== orderId
          ),
        })),

      toggleFavorite: (productId) =>
        set((state) => {
          const isFavorite = state.favorites.includes(productId);

          return {
            favorites: isFavorite
              ? state.favorites.filter(
                  (id) => id !== productId
                )
              : [...state.favorites, productId],
          };
        }),
    }),
    {
      name: "nik-market-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        cart: state.cart,
        favorites: state.favorites,
        user: state.user,
        users: state.users,
        orders: state.orders,
      }),
    }
  )
);

export default useShopStore;
