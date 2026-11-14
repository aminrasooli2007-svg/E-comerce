import { useState } from "react";
import { Link } from "react-router";

import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
} from "lucide-react";

import useShopStore from "../../store/useShopStore";

function Header({ search = "", setSearch = () => {} }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const cart = useShopStore((state) => state.cart);
  const favorites = useShopStore((state) => state.favorites);

  const cartCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <>
      <div className="bg-[#173D35] px-4 py-2 text-center text-xs text-white sm:text-sm">
        ارسال رایگان برای خریدهای بالای ۳ میلیون تومان
      </div>

      <header className="sticky top-0 z-50 border-b border-[#EAE8E1] bg-[#FAF9F6]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl p-2 hover:bg-[#EFEEE8] md:hidden"
            aria-label="باز کردن منو"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173D35] text-white">
              <ShoppingBag size={22} />
            </div>

            <span className="text-xl font-black tracking-tight">
              نیک<span className="text-[#B89563]">مارکت</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link to="/" className="transition hover:text-[#B89563]">
              صفحه اصلی
            </Link>

            <Link
              to="/products"
              className="transition hover:text-[#B89563]"
            >
              فروشگاه
            </Link>

            <Link
              to="/#categories"
              className="transition hover:text-[#B89563]"
            >
              دسته‌بندی‌ها
            </Link>

            <Link
              to="/#about"
              className="transition hover:text-[#B89563]"
            >
              درباره ما
            </Link>
          </nav>

          <div className="hidden max-w-md flex-1 items-center rounded-xl border border-[#E8E5DC] bg-white px-3 py-2.5 lg:flex">
            <Search size={19} className="text-[#92958F]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی محصولات..."
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/wishlist"
              className="relative rounded-xl p-2.5 transition hover:bg-[#EFEEE8]"
              aria-label="علاقه‌مندی‌ها"
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
              aria-label="سبد خرید"
            >
              <ShoppingBag size={21} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#173D35] px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="hidden items-center gap-2 rounded-xl border border-[#173D35] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#173D35] hover:text-white sm:flex">
              <UserRound size={18} />
              ورود
            </button>
          </div>
        </div>

        <div className="px-4 pb-3 lg:hidden">
          <div className="flex items-center rounded-xl border border-[#E8E5DC] bg-white px-3 py-2.5">
            <Search size={19} className="text-[#92958F]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی محصولات..."
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>
        </div>

        {mobileMenu && (
          <nav className="border-t border-[#EAE8E1] bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <Link to="/" onClick={() => setMobileMenu(false)}>
                صفحه اصلی
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenu(false)}
              >
                فروشگاه
              </Link>

              <Link
                to="/#categories"
                onClick={() => setMobileMenu(false)}
              >
                دسته‌بندی‌ها
              </Link>

              <Link
                to="/#about"
                onClick={() => setMobileMenu(false)}
              >
                درباره ما
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileMenu(false)}
              >
                سبد خرید
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMobileMenu(false)}
              >
                علاقه‌مندی‌ها
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;