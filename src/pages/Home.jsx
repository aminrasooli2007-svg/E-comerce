import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  Truck,
  ShieldCheck,
  Headset,
  Clock,
  Sparkles,
  Star,
  Search,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/common/ProductCard";
import { categories } from "../data/products";
import useShopStore from "../store/useShopStore";

function Home() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("همه");
  const products = useShopStore((state) => state.products);

  const filteredProducts = products.filter((product) => {
    const productName = String(product.name ?? product.title ?? "");
    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "همه" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const features = [
    {
      icon: Truck,
      title: t("fastShipping"),
      desc: t("fastShippingDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("authenticity"),
      desc: t("authenticityDesc"),
    },
    {
      icon: Headset,
      title: t("support"),
      desc: t("supportDesc"),
    },
    {
      icon: Clock,
      title: t("easyShopping"),
      desc: t("easyShoppingDesc"),
    },
  ];

  const productFilters = ["همه", "دیجیتال", "اکسسوری", "پوشاک"];

  return (
    <div
      dir={i18n.dir()}
      className="min-h-screen bg-[#FAF9F6] text-[#303A33]"
    >
      <Header search={search} setSearch={setSearch} />

      <main className="mx-auto max-w-7xl px-4 lg:px-8">
        <section className="py-6 sm:py-10">
          <div className="relative flex min-h-[420px] overflow-hidden rounded-[28px] bg-[#173D35] sm:min-h-[490px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                alt={t("storeImageAlt")}
                className="h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#173D35] via-[#173D35]/90 to-transparent" />
            </div>

            <div className="relative z-10 flex w-full items-center px-7 py-12 sm:px-14 lg:px-20">
              <div className="max-w-xl text-white">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm">
                  <Sparkles size={15} className="text-[#D8B98C]" />
                  {t("heroBadge")}
                </span>

                <h1 className="mb-6 text-4xl font-black leading-[1.5] sm:text-5xl lg:text-6xl">
                  {t("heroTitle")}
                  <br />
                  <span className="text-[#D8B98C]">
                    {t("heroTitleHighlight")}
                  </span>
                </h1>

                <p className="mb-8 max-w-md text-sm leading-8 text-white/75 sm:text-base">
                  {t("heroDescription")}
                </p>

                <a
                  href="#products"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#D8B98C] px-6 py-3.5 text-sm font-bold text-[#173D35] transition hover:bg-white"
                >
                  {t("viewProducts")}
                  <ArrowLeft size={18} />
                </a>
              </div>
            </div>

            <div className="absolute bottom-7 left-7 hidden rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md sm:block">
              <div className="flex items-center gap-2">
                <Star
                  className="fill-[#D8B98C] text-[#D8B98C]"
                  size={17}
                />
                <span className="text-sm font-bold">
                  {t("qualityFirst")}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/70">
                {t("easyAndSecureShopping")}
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 py-5 md:grid-cols-4 md:gap-5">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-[#EAE8E1] bg-white p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F0E9] text-[#173D35]">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="mt-1 text-[10px] text-[#92958F] sm:text-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        <section id="categories" className="py-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-[#B89563]">
                {t("exploreCategories")}
              </span>
              <h2 className="mt-2 text-2xl font-black">
                {t("productCategories")}
              </h2>
            </div>

            <a
              href="#products"
              className="flex items-center gap-2 text-xs font-bold text-[#173D35]"
            >
              {t("allProducts")}
              <ChevronLeft size={17} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  onClick={() => {
                    setActiveCategory(category.filter);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-[#EAE8E1] bg-white p-5 transition hover:-translate-y-1 hover:border-[#B89563] hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F1EB] text-[#173D35] transition group-hover:bg-[#173D35] group-hover:text-white">
                    <Icon size={28} strokeWidth={1.7} />
                  </div>
                  <span className="text-center text-xs font-bold">
                    {t(category.filter, {
                      defaultValue: category.title,
                    })}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section id="products" className="py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#B89563]">
                {t("handpickedForYou")}
              </span>
              <h2 className="mt-2 text-2xl font-black">
                {t("selectedProducts")}
              </h2>
              <p className="mt-2 text-sm text-[#92958F]">
                {t("selectedProductsDescription")}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#EAE8E1] bg-white px-3 py-2 text-xs">
              <span>{t("sortBy")}</span>
              <span className="font-bold">{t("bestSelling")}</span>
              <ChevronDown size={15} />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {productFilters.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#173D35] text-white"
                    : "border border-[#EAE8E1] bg-white hover:border-[#173D35]"
                }`}
              >
                {t(category)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8D5CC] py-16 text-center">
              <Search size={32} className="mx-auto mb-4 text-[#92958F]" />
              <p className="font-bold">{t("noProductsFound")}</p>
              <p className="mt-2 text-sm text-[#92958F]">
                {t("changeSearchOrCategory")}
              </p>
            </div>
          )}
        </section>

        <section className="py-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#E9E5D9] px-7 py-12 sm:px-14">
            <div className="relative z-10 max-w-lg">
              <span className="text-xs font-bold text-[#A17D4C]">
                {t("specialCollection")}
              </span>
              <h2 className="mt-4 text-3xl font-black leading-relaxed sm:text-4xl">
                {t("beautyInSimplicity")}
              </h2>
              <p className="mt-3 text-sm leading-8 text-[#666C64]">
                {t("specialCollectionDescription")}
              </p>
              <a
                href="#products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#245A4E]"
              >
                {t("seeProducts")}
                <ArrowLeft size={17} />
              </a>
            </div>

            <div className="absolute -left-10 -top-20 h-72 w-72 rounded-full border-[45px] border-white/30" />
            <div className="absolute -bottom-32 left-40 h-72 w-72 rounded-full border-[45px] border-white/30" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
