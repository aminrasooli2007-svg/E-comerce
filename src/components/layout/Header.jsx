
import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
  Languages,
} from "lucide-react";
import useShopStore from "../../store/useShopStore";

function Header({ search = "", setSearch = () => {} }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const { t, i18n } = useTranslation();

  const cart = useShopStore((state) => state.cart);
  const favorites = useShopStore((state) => state.favorites);

  const isEnglish = i18n.language === "en";

  const cartCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const changeLanguage = () => {
    const newLanguage = isEnglish ? "fa" : "en";
    i18n.changeLanguage(newLanguage);
    setMobileMenu(false);
  };

  return (
    <>
      <div className="bg-[#173D35] px-4 py-2 text-center text-xs text-white sm:text-sm">
        {t("shipping")}
      </div>

      <header className="sticky top-0 z-50 border-b border-[#EAE8E1] bg-[#FAF9F6]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-8">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl p-2 hover:bg-[#EFEEE8] md:hidden"
            aria-label={t("menu")}
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173D35] text-white">
              <ShoppingBag size={22} />
            </div>

            <span className="text-xl font-black tracking-tight">
              {isEnglish ? (
                <>
                  Nik<span className="text-[#B89563]">Market</span>
                </>
              ) : (
                <>
                  نیک<span className="text-[#B89563]">مارکت</span>
                </>
              )}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium xl:flex">
            <Link to="/" className="transition hover:text-[#B89563]">
              {t("home")}
            </Link>

            <Link to="/products" className="transition hover:text-[#B89563]">
              {t("products")}
            </Link>

            <Link to="/#categories" className="transition hover:text-[#B89563]">
              {t("categories")}
            </Link>

            <Link to="/#about" className="transition hover:text-[#B89563]">
              {t("about")}
            </Link>
          </nav>

          <div className="hidden max-w-md flex-1 items-center rounded-xl border border-[#E8E5DC] bg-white px-3 py-2.5 lg:flex">
            <Search size={19} className="text-[#92958F]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("search")}
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              onClick={changeLanguage}
              className="flex items-center gap-1.5 rounded-xl border border-[#E8E5DC] px-2.5 py-2.5 text-sm font-semibold transition hover:bg-[#EFEEE8] sm:px-3"
              aria-label={t("language")}
              title={t("language")}
            >
              <Languages size={18} />
              <span>{isEnglish ? "FA" : "EN"}</span>
            </button>

            <Link
              to="/wishlist"
              className="relative rounded-xl p-2.5 transition hover:bg-[#EFEEE8]"
              aria-label={t("wishlist")}
            >
              <Heart size={21} />

              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89563] px-1 text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative rounded-xl p-2.5 transition hover:bg-[#EFEEE8]"
              aria-label={t("cart")}
            >
              <ShoppingBag size={21} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#173D35] px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl border border-[#173D35] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#173D35] hover:text-white sm:flex"
            >
              <UserRound size={18} />
              {t("login")}
            </Link>
          </div>
        </div>

        <div className="px-4 pb-3 lg:hidden">
          <div className="flex items-center rounded-xl border border-[#E8E5DC] bg-white px-3 py-2.5">
            <Search size={19} className="text-[#92958F]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("search")}
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>
        </div>

        {mobileMenu && (
          <nav className="border-t border-[#EAE8E1] bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <Link to="/" onClick={() => setMobileMenu(false)}>
                {t("home")}
              </Link>

              <Link to="/products" onClick={() => setMobileMenu(false)}>
                {t("products")}
              </Link>

              <Link to="/#categories" onClick={() => setMobileMenu(false)}>
                {t("categories")}
              </Link>

              <Link to="/#about" onClick={() => setMobileMenu(false)}>
                {t("about")}
              </Link>

              <Link to="/cart" onClick={() => setMobileMenu(false)}>
                {t("cart")}
              </Link>

              <Link to="/wishlist" onClick={() => setMobileMenu(false)}>
                {t("wishlist")}
              </Link>

              <Link to="/login" onClick={() => setMobileMenu(false)}>
                {t("login")}
              </Link>

              <button
                onClick={changeLanguage}
                className="flex items-center gap-2 text-start font-semibold text-[#173D35]"
              >
                <Languages size={18} />
                {t("language")}
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
