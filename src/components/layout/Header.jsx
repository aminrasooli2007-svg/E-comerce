
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
  Languages,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import useShopStore from "../../store/useShopStore";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const cart = useShopStore((state) => state.cart);
  const favorites = useShopStore((state) => state.favorites);
  const user = useShopStore((state) => state.user);
  const logout = useShopStore((state) => state.logout);

  const isEnglish = i18n.language === "en";
  const isAdmin = user?.role === "admin";

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const changeLanguage = () => {
    i18n.changeLanguage(isEnglish ? "fa" : "en");
    setMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenu(false);
    navigate("/");
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

            {isAdmin && (
              <Link
                to="/admin/products"
                className="flex items-center gap-1.5 font-bold text-[#173D35] transition hover:text-[#B89563]"
              >
                <LayoutDashboard size={17} />
                {t("adminPanel")}
              </Link>
            )}
          </nav>

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
              to="/settings"
              className="rounded-xl p-2.5 transition hover:bg-[#EFEEE8]"
              aria-label={t("settings")}
              title={t("settings")}
            >
              <Settings size={21} />
            </Link>

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

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="max-w-28 truncate text-sm font-semibold text-[#173D35]">
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-xl border border-[#173D35] px-3 py-2.5 text-sm font-semibold transition hover:bg-[#173D35] hover:text-white"
                >
                  <LogOut size={17} />
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-xl border border-[#173D35] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#173D35] hover:text-white sm:flex"
              >
                <UserRound size={18} />
                {t("login")}
              </Link>
            )}
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

              <Link to="/settings" onClick={() => setMobileMenu(false)}>
                {t("settings")}
              </Link>

              {isAdmin && (
                <Link
                  to="/admin/products"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-2 font-bold text-[#173D35]"
                >
                  <LayoutDashboard size={18} />
                  {t("adminPanel")}
                </Link>
              )}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-start font-semibold text-red-600"
                >
                  <LogOut size={18} />
                  {t("logout")}
                </button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenu(false)}>
                  {t("login")}
                </Link>
              )}

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
