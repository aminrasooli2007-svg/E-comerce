import { Link, useParams } from "react-router";

import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { products, formatPrice } from "../data/products";
import useShopStore from "../store/useShopStore";

function ProductDetail() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const addToCart = useShopStore((state) => state.addToCart);
  const favorites = useShopStore((state) => state.favorites);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  if (!product) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#FAF9F6] p-10 text-center"
      >
        <h1 className="text-2xl font-bold">
          محصول پیدا نشد!
        </h1>

        <Link
          to="/products"
          className="mt-5 inline-block text-[#173D35] underline"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowRight size={18} />
          بازگشت به محصولات
        </Link>

        <div className="grid gap-10 rounded-3xl border border-[#EAE8E1] bg-white p-5 md:grid-cols-2 md:p-8">
          <div className="overflow-hidden rounded-2xl bg-[#F4F3EF]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm text-[#B89563]">
              {product.category}
            </span>

            <h1 className="mt-3 text-2xl font-black leading-relaxed">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-2">
              <Star
                size={18}
                className="fill-[#D8B98C] text-[#D8B98C]"
              />

              <span className="font-bold">{product.rating}</span>

              <span className="text-sm text-gray-400">
                امتیاز محصول
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>

              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="mt-6 text-sm leading-8 text-gray-500">
              این محصول یکی از محصولات منتخب نیک‌مارکت است.
              برای اضافه‌کردن آن به سبد خرید از دکمه زیر استفاده کن.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#173D35] px-5 py-4 text-sm font-bold text-white hover:bg-[#245A4E]"
              >
                <ShoppingBag size={18} />
                افزودن به سبد خرید
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className="rounded-xl border border-[#EAE8E1] p-4"
                aria-label="افزودن به علاقه‌مندی‌ها"
              >
                <Heart
                  size={20}
                  fill={isFavorite ? "currentColor" : "none"}
                  className={isFavorite ? "text-red-500" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;