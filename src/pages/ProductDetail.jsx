
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import {
  ArrowRight,
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useShopStore from "../store/useShopStore";
import { formatPrice } from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === "en";

  const products = useShopStore((state) => state.products);
  const addToCart = useShopStore((state) => state.addToCart);
  const favorites = useShopStore((state) => state.favorites);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div
        dir={isEnglish ? "ltr" : "rtl"}
        className="min-h-screen bg-[#FAF9F6] p-10 text-center"
      >
        <h1 className="text-2xl font-bold">
          {t("productNotFound")}
        </h1>

        <Link
          to="/products"
          className="mt-5 inline-block text-[#173D35] underline"
        >
          {t("backToShop")}
        </Link>
      </div>
    );
  }

  const productName = product.name ?? product.title ?? "";
  const isFavorite = favorites.includes(product.id);

  return (
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="min-h-screen bg-[#FAF9F6]"
    >
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500"
        >
          {isEnglish ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          {t("backToProducts")}
        </Link>

        <div className="grid gap-10 rounded-3xl border border-[#EAE8E1] bg-white p-5 md:grid-cols-2 md:p-8">
          <div className="overflow-hidden rounded-2xl bg-[#F4F3EF]">
            <img
              src={product.image}
              alt={productName}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm text-[#B89563]">
              {product.category}
            </span>

            <h1 className="mt-3 text-2xl font-black leading-relaxed">
              {productName}
            </h1>

            <div className="mt-5 flex items-center gap-2">
              <Star
                size={18}
                className="fill-[#D8B98C] text-[#D8B98C]"
              />

              <span className="font-bold">{product.rating}</span>

              <span className="text-sm text-gray-400">
                {t("productRating")}
              </span>
            </div>

            <div className="mt-8">
              {product.oldPrice > 0 && (
                <p className="text-sm text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}

              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="mt-6 text-sm leading-8 text-gray-500">
              {t("productDescription")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#173D35] px-5 py-4 text-sm font-bold text-white hover:bg-[#245A4E]"
              >
                <ShoppingBag size={18} />
                {t("addToCart")}
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className="rounded-xl border border-[#EAE8E1] p-4"
                aria-label={t("addToWishlist")}
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
