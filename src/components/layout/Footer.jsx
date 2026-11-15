
import { ShoppingBag, Globe, Headset } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <footer
      id="about"
      dir={isEnglish ? "ltr" : "rtl"}
      className="mt-10 bg-[#173D35] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <ShoppingBag size={21} />
            </div>

            <span className="text-xl font-black">
              {isEnglish ? (
                <>
                  Nik<span className="text-[#D8B98C]">Market</span>
                </>
              ) : (
                <>
                  نیک<span className="text-[#D8B98C]">مارکت</span>
                </>
              )}
            </span>
          </Link>

          <p className="mt-5 text-sm leading-8 text-white/60">
            {t("footerDescription")}
          </p>

          <a
            href="#"
            className="mt-5 inline-flex rounded-xl bg-white/10 p-2.5 transition hover:bg-white/20"
            aria-label={t("website")}
          >
            <Globe size={19} />
          </a>
        </div>

        <div>
          <h3 className="mb-5 font-bold">{t("quickAccess")}</h3>

          <ul className="space-y-4 text-sm text-white/60">
            <li>
              <Link to="/" className="hover:text-white">
                {t("home")}
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-white">
                {t("products")}
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                {t("cart")}
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-white">
                {t("wishlist")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-bold">{t("customerServices")}</h3>

          <ul className="space-y-4 text-sm text-white/60">
            <li>{t("faq")}</li>
            <li>{t("shippingInfo")}</li>
            <li>{t("terms")}</li>
            <li>{t("orderTracking")}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-bold">{t("contactUs")}</h3>

          <p className="text-sm leading-8 text-white/60">
            {t("contactDescription")}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-[#D8B98C]">
            <Headset size={18} />
            {t("customerSupport")}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50">
        {t("copyright")}
      </div>
    </footer>
  );
}

export default Footer;
