import { useState } from "react";
import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  Truck,
  ShieldCheck,
  Headset,
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Home,
  Sparkles,
  Star,
  Globe,
  Clock,
  Plus,
  X,
} from "lucide-react";

const categories = [
  { title: "موبایل و دیجیتال", icon: Smartphone },
  { title: "لپ‌تاپ و کامپیوتر", icon: Laptop },
  { title: "مد و پوشاک", icon: Shirt },
  { title: "ساعت و اکسسوری", icon: Watch },
  { title: "خانه و آشپزخانه", icon: Home },
  { title: "زیبایی و سلامت", icon: Sparkles },
];

const products = [
  {
    id: 1,
    name: "هدفون بی‌سیم مدل Premium Pro",
    category: "دیجیتال",
    price: 2450000,
    oldPrice: 2990000,
    discount: 18,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
  },
  {
    id: 2,
    name: "ساعت هوشمند سری جدید",
    category: "اکسسوری",
    price: 3890000,
    oldPrice: 4500000,
    discount: 14,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    id: 3,
    name: "کفش اسپرت روزمره",
    category: "پوشاک",
    price: 1850000,
    oldPrice: 2200000,
    discount: 16,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
  {
    id: 4,
    name: "عینک آفتابی کلاسیک",
    category: "اکسسوری",
    price: 1250000,
    oldPrice: 1500000,
    discount: 17,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("fa-IR").format(price) + " تومان";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("همه");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "همه" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);

      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6] text-[#303A33]">
      {/* Announcement */}
      <div className="bg-[#173D35] px-4 py-2 text-center text-xs text-white sm:text-sm">
        ارسال رایگان برای خریدهای بالای ۳ میلیون تومان
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#EAE8E1] bg-[#FAF9F6]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl p-2 hover:bg-[#EFEEE8] md:hidden"
            aria-label="باز کردن منو"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>

          <a href="#" className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173D35] text-white">
              <ShoppingBag size={22} />
            </div>
            <span className="text-xl font-black tracking-tight">
              نیک<span className="text-[#B89563]">مارکت</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#" className="transition hover:text-[#B89563]">
              صفحه اصلی
            </a>
            <a href="#categories" className="transition hover:text-[#B89563]">
              دسته‌بندی‌ها
            </a>
            <a href="#products" className="transition hover:text-[#B89563]">
              فروشگاه
            </a>
            <a href="#about" className="transition hover:text-[#B89563]">
              درباره ما
            </a>
          </nav>

          <div className="hidden max-w-md flex-1 items-center rounded-xl border border-[#E8E5DC] bg-white px-3 py-2.5 lg:flex">
            <Search size={19} className="text-[#92958F]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصولات..."
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              className="relative rounded-xl p-2.5 transition hover:bg-[#EFEEE8]"
              aria-label="علاقه‌مندی‌ها"
            >
              <Heart size={21} />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89563] px-1 text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              className="relative rounded-xl p-2.5 transition hover:bg-[#EFEEE8]"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={21} />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#173D35] px-1 text-xs text-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            <button className="hidden items-center gap-2 rounded-xl border border-[#173D35] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#173D35] hover:text-white sm:flex">
              <UserRound size={18} />
              ورود
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 lg:hidden">
          <div className="flex items-center rounded-xl border border-[#E8E5DC] bg-white px-3 py-2.5">
            <Search size={19} className="text-[#92958F]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصولات..."
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>
        </div>

        {mobileMenu && (
          <nav className="border-t border-[#EAE8E1] bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a href="#">صفحه اصلی</a>
              <a href="#categories">دسته‌بندی‌ها</a>
              <a href="#products">فروشگاه</a>
              <a href="#about">درباره ما</a>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Hero */}
        <section className="py-6 sm:py-10">
          <div className="relative flex min-h-[420px] overflow-hidden rounded-[28px] bg-[#173D35] sm:min-h-[490px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                alt="فروشگاه مدرن"
                className="h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#173D35] via-[#173D35]/90 to-transparent" />
            </div>

            <div className="relative z-10 flex w-full items-center px-7 py-12 sm:px-14 lg:px-20">
              <div className="max-w-xl text-white">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm">
                  <Sparkles size={15} className="text-[#D8B98C]" />
                  تجربه‌ای متفاوت از خرید آنلاین
                </span>

                <h1 className="mb-6 text-4xl font-black leading-[1.5] sm:text-5xl lg:text-6xl">
                  انتخابی هوشمندانه،
                  <br />
                  <span className="text-[#D8B98C]">زندگی زیباتر</span>
                </h1>

                <p className="mb-8 max-w-md text-sm leading-8 text-white/75 sm:text-base">
                  مجموعه‌ای از محصولات باکیفیت و کاربردی، برای کسانی که به
                  کیفیت و زیبایی اهمیت می‌دهند.
                </p>

                <a
                  href="#products"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#D8B98C] px-6 py-3.5 text-sm font-bold text-[#173D35] transition hover:bg-white"
                >
                  مشاهده محصولات
                  <ArrowLeft size={18} />
                </a>
              </div>
            </div>

            <div className="absolute bottom-7 left-7 hidden rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md sm:block">
              <div className="flex items-center gap-2">
                <Star size={17} className="fill-[#D8B98C] text-[#D8B98C]" />
                <span className="text-sm font-bold">کیفیت در اولویت ماست</span>
              </div>
              <p className="mt-1 text-xs text-white/70">
                تجربه خریدی مطمئن و آسان
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-2 gap-3 py-5 md:grid-cols-4 md:gap-5">
          {[
            {
              icon: Truck,
              title: "ارسال سریع",
              desc: "تحویل در کوتاه‌ترین زمان",
            },
            {
              icon: ShieldCheck,
              title: "ضمانت اصالت",
              desc: "تضمین کیفیت محصولات",
            },
            {
              icon: Headset,
              title: "پشتیبانی",
              desc: "همراه شما در تمام مراحل",
            },
            {
              icon: Clock,
              title: "خرید آسان",
              desc: "تجربه خرید بدون دردسر",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
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

        {/* Categories */}
        <section id="categories" className="py-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-[#B89563]">
                EXPLORE CATEGORIES
              </span>
              <h2 className="mt-2 text-2xl font-black">دسته‌بندی محصولات</h2>
            </div>
            <a
              href="#products"
              className="flex items-center gap-2 text-xs font-bold text-[#173D35]"
            >
              همه محصولات
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
                    setActiveCategory(category.title);
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
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#B89563]">
                HANDPICKED FOR YOU
              </span>
              <h2 className="mt-2 text-2xl font-black">محصولات منتخب</h2>
              <p className="mt-2 text-sm text-[#92958F]">
                انتخاب‌هایی خاص برای سلیقه‌های خاص
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#EAE8E1] bg-white px-3 py-2 text-xs">
              <span>مرتب‌سازی:</span>
              <span className="font-bold">پرفروش‌ترین</span>
              <ChevronDown size={15} />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {["همه", "دیجیتال", "اکسسوری", "پوشاک"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#173D35] text-white"
                    : "border border-[#EAE8E1] bg-white hover:border-[#173D35]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#EAE8E1] bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-[#F4F3EF]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-3 top-3 rounded-lg bg-[#173D35] px-2.5 py-1.5 text-xs font-bold text-white">
                    {product.discount}٪ تخفیف
                  </span>

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#303A33] transition hover:text-red-500"
                    aria-label="افزودن به علاقه‌مندی‌ها"
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        favorites.includes(product.id) ? "text-red-500" : ""
                      }
                    />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <span className="text-[10px] text-[#B89563]">
                    {product.category}
                  </span>

                  <h3 className="mt-2 min-h-10 text-xs font-bold leading-6 sm:text-sm">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star
                        size={13}
                        className="fill-[#D8B98C] text-[#D8B98C]"
                      />
                      <span className="text-xs font-semibold">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#92958F]">
                      موجود در انبار
                    </span>
                  </div>

                  <div className="mt-4 border-t border-[#F0EFEA] pt-3">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-sm font-black">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-[#A5A59E] line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#173D35] py-3 text-xs font-bold text-white transition hover:bg-[#245A4E]"
                    >
                      <Plus size={16} />
                      افزودن به سبد خرید
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8D5CC] py-16 text-center">
              <Search
                size={32}
                className="mx-auto mb-4 text-[#92958F]"
              />
              <p className="font-bold">محصولی پیدا نشد</p>
              <p className="mt-2 text-sm text-[#92958F]">
                عبارت جستجو یا دسته‌بندی را تغییر بده.
              </p>
            </div>
          )}
        </section>

        {/* Banner */}
        <section className="py-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#E9E5D9] px-7 py-12 sm:px-14">
            <div className="relative z-10 max-w-lg">
              <span className="text-xs font-bold text-[#A17D4C]">
                SPECIAL COLLECTION
              </span>
              <h2 className="mt-4 text-3xl font-black leading-relaxed sm:text-4xl">
                زیبایی در سادگی است
              </h2>
              <p className="mt-3 text-sm leading-8 text-[#666C64]">
                مجموعه‌ای از انتخاب‌های خاص که سبک زندگی شما را زیباتر
                می‌کنند.
              </p>
              <a
                href="#products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#245A4E]"
              >
                دیدن محصولات
                <ArrowLeft size={17} />
              </a>
            </div>

            <div className="absolute -left-10 -top-20 h-72 w-72 rounded-full border-[45px] border-white/30" />
            <div className="absolute -bottom-32 left-40 h-72 w-72 rounded-full border-[45px] border-white/30" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className="mt-10 bg-[#173D35] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <ShoppingBag size={21} />
              </div>
              <span className="text-xl font-black">
                نیک<span className="text-[#D8B98C]">مارکت</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-8 text-white/60">
              تجربه‌ای متفاوت از خرید آنلاین؛ انتخابی هوشمندانه برای زندگی
              بهتر.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                className="rounded-xl bg-white/10 p-2.5 transition hover:bg-white/20"
                aria-label="وب‌سایت"
              >
                <Globe size={19} />
              </button>
              <button
                className="rounded-xl bg-white/10 p-2.5 transition hover:bg-white/20"
                aria-label="اینستاگرام"
              >
                <Globe size={19} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">دسترسی سریع</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white">
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white">
                  دسته‌بندی‌ها
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white">
                  محصولات
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white">
                  درباره ما
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-bold">خدمات مشتریان</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>پرسش‌های متداول</li>
              <li>شرایط ارسال</li>
              <li>قوانین و مقررات</li>
              <li>پیگیری سفارش</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-bold">ارتباط با ما</h3>
            <p className="text-sm leading-8 text-white/60">
              برای دریافت راهنمایی و پاسخ به سوالات خود می‌توانید با تیم
              پشتیبانی ما در ارتباط باشید.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#D8B98C]">
              <Headset size={18} />
              پشتیبانی مشتریان
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50">
          © تمامی حقوق برای نیک‌مارکت محفوظ است.
        </div>
      </footer>
    </div>
  );
}

export default App;