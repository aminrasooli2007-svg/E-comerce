
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/common/ProductCard";

import useShopStore from "../store/useShopStore";
import { products } from "../data/products";

function Wishlist() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  const favorites = useShopStore((state) => state.favorites);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="min-h-screen bg-[#FAF9F6]"
    >
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h1 className="text-2xl font-black">
          {t("myWishlist")}
        </h1>

        {favoriteProducts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#EAE8E1] bg-white py-20 text-center">
            <Heart
              size={45}
              className="mx-auto mb-5 text-gray-400"
            />

            <h2 className="text-lg font-bold">
              {t("emptyWishlist")}
            </h2>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-[#173D35] px-6 py-3 text-sm font-bold text-white"
            >
              {t("viewProducts")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Wishlist;
