import { ShoppingBag, Globe, Headset } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer id="about" className="mt-10 bg-[#173D35] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <ShoppingBag size={21} />
            </div>

            <span className="text-xl font-black">
              نیک<span className="text-[#D8B98C]">مارکت</span>
            </span>
          </Link>

          <p className="mt-5 text-sm leading-8 text-white/60">
            تجربه‌ای متفاوت از خرید آنلاین؛ انتخابی هوشمندانه برای زندگی بهتر.
          </p>

          <a
            href="#"
            className="mt-5 inline-flex rounded-xl bg-white/10 p-2.5 transition hover:bg-white/20"
            aria-label="وب‌سایت"
          >
            <Globe size={19} />
          </a>
        </div>

        <div>
          <h3 className="mb-5 font-bold">دسترسی سریع</h3>

          <ul className="space-y-4 text-sm text-white/60">
            <li>
              <Link to="/" className="hover:text-white">
                صفحه اصلی
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-white">
                محصولات
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                سبد خرید
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-white">
                علاقه‌مندی‌ها
              </Link>
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
            برای دریافت راهنمایی و پاسخ به سوالات خود می‌توانید با تیم پشتیبانی ما در ارتباط باشید.
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
  );
}

export default Footer;