import { Link } from "react-router";

import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import useShopStore from "../store/useShopStore";
import { formatPrice } from "../data/products";

function Cart() {
  const cart = useShopStore((state) => state.cart);
  const removeFromCart = useShopStore(
    (state) => state.removeFromCart
  );
  const updateQuantity = useShopStore(
    (state) => state.updateQuantity
  );
  const clearCart = useShopStore((state) => state.clearCart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h1 className="text-2xl font-black">سبد خرید من</h1>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#EAE8E1] bg-white py-20 text-center">
            <ShoppingBag
              size={45}
              className="mx-auto mb-5 text-gray-400"
            />

            <h2 className="text-lg font-bold">
              سبد خرید شما خالی است.
            </h2>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-[#173D35] px-6 py-3 text-sm font-bold text-white"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#EAE8E1] bg-white p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{item.name}</h3>

                    <p className="mt-2 text-sm text-[#173D35]">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded-lg border p-1"
                        aria-label="کم کردن تعداد"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded-lg border p-1"
                        aria-label="زیاد کردن تعداد"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-xl p-3 text-red-500 hover:bg-red-50"
                    aria-label="حذف محصول"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-red-500"
              >
                خالی کردن سبد خرید
              </button>
            </div>

            <div className="h-fit rounded-2xl border border-[#EAE8E1] bg-white p-5">
              <h2 className="text-lg font-bold">
                خلاصه سفارش
              </h2>

              <div className="mt-6 flex justify-between text-sm">
                <span className="text-gray-500">
                  تعداد محصولات
                </span>

                <span>{totalItems}</span>
              </div>

              <div className="mt-5 flex justify-between border-t pt-5">
                <span className="font-bold">مبلغ کل</span>

                <span className="font-black text-[#173D35]">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                disabled
                className="mt-7 w-full cursor-not-allowed rounded-xl bg-gray-300 py-3 font-bold text-gray-600"
              >
                ادامه فرایند خرید (به‌زودی)
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;