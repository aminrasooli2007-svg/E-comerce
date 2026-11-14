
import { useState } from "react";
import { Link } from "react-router";
import {
  Settings as SettingsIcon,
  User,
  Globe,
  Bell,
  ShieldCheck,
  ShoppingBag,
  Palette,
  Eye,
  Save,
  ArrowRight,
  RotateCcw,
  Mail,
  Smartphone,
  MapPin,
  CreditCard,
  Lock,
  Monitor,
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const defaultSettings = {
  name: "",
  email: "",
  phone: "",
  language: "fa",
  country: "iran",
  currency: "toman",
  theme: "light",
  fontSize: "normal",
  orderNotifications: true,
  discountNotifications: false,
  emailNotifications: true,
  smsNotifications: false,
  newsletter: false,
  showProfile: false,
  saveSearchHistory: true,
  personalizedProducts: true,
  defaultAddress: "",
  preferredPayment: "online",
  saveCart: true,
  compactMode: false,
  reduceAnimations: false,
};

function getSavedSettings() {
  try {
    const savedSettings = localStorage.getItem("nik-market-settings");

    if (savedSettings) {
      return {
        ...defaultSettings,
        ...JSON.parse(savedSettings),
      };
    }
  } catch {
    return defaultSettings;
  }

  return defaultSettings;
}

function Settings() {
  const [settings, setSettings] = useState(getSavedSettings);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "nik-market-settings",
      JSON.stringify(settings)
    );

    setMessage("تنظیمات با موفقیت ذخیره شدند.");
  }

  function handleReset() {
    setSettings(defaultSettings);
    localStorage.setItem(
      "nik-market-settings",
      JSON.stringify(defaultSettings)
    );
    setMessage("تنظیمات به حالت اولیه بازگشتند.");
  }

  function SettingSwitch({ name, title, description }) {
    return (
      <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
        <div>
          <p className="font-semibold text-gray-700">{title}</p>
          <p className="mt-1 text-xs text-gray-400">{description}</p>
        </div>

        <input
          type="checkbox"
          name={name}
          checked={settings[name]}
          onChange={handleChange}
          className="h-5 w-5 shrink-0 accent-[#173D35]"
        />
      </label>
    );
  }

  function SettingSelect({ name, label, children }) {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {label}
        </label>

        <select
          name={name}
          value={settings[name]}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#173D35]"
        >
          {children}
        </select>
      </div>
    );
  }

  function SettingInput({ name, label, placeholder, type = "text" }) {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {label}
        </label>

        <input
          type={type}
          name={name}
          value={settings[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#173D35]"
        />
      </div>
    );
  }

  function Section({ icon: Icon, title, description, children }) {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F3EE] text-[#173D35]">
            <Icon size={21} />
          </div>

          <div>
            <h2 className="font-bold text-[#173D35]">{title}</h2>
            <p className="mt-1 text-xs text-gray-400">{description}</p>
          </div>
        </div>

        {children}
      </section>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <Header search="" setSearch={() => {}} />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#173D35]"
          >
            <ArrowRight size={17} />
            بازگشت به صفحه اصلی
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173D35] text-white">
              <SettingsIcon size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-[#173D35]">
                تنظیمات نیک‌مارکت
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                مدیریت حساب، ظاهر سایت و ترجیحات شخصی
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section
            icon={User}
            title="اطلاعات حساب کاربری"
            description="اطلاعات شخصی خود را مدیریت کنید"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingInput
                name="name"
                label="نام و نام خانوادگی"
                placeholder="نام خود را وارد کنید"
              />

              <SettingInput
                name="email"
                label="آدرس ایمیل"
                placeholder="example@gmail.com"
                type="email"
              />

              <SettingInput
                name="phone"
                label="شماره موبایل"
                placeholder="09123456789"
                type="tel"
              />
            </div>

            <div className="mt-5 rounded-xl bg-[#F5F3EE] p-4 text-sm text-gray-600">
              برای تغییر رمز عبور و مدیریت ورودها، بعداً بخش امنیت حساب به بک‌اند متصل خواهد شد.
            </div>
          </Section>

          <Section
            icon={Globe}
            title="زبان و منطقه"
            description="تنظیم زبان و اطلاعات منطقه‌ای فروشگاه"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingSelect name="language" label="زبان سایت">
                <option value="fa">فارسی</option>
                <option value="en">English</option>
              </SettingSelect>

              <SettingSelect name="country" label="کشور">
                <option value="iran">ایران</option>
                <option value="germany">آلمان</option>
                <option value="turkey">ترکیه</option>
                <option value="other">سایر کشورها</option>
              </SettingSelect>

              <SettingSelect name="currency" label="واحد پول">
                <option value="toman">تومان</option>
                <option value="rial">ریال</option>
                <option value="usd">دلار آمریکا</option>
                <option value="eur">یورو</option>
              </SettingSelect>

              <SettingSelect name="theme" label="حالت نمایش">
                <option value="light">روشن</option>
                <option value="dark">تاریک</option>
                <option value="system">مطابق تنظیمات دستگاه</option>
              </SettingSelect>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              انتخاب زبان، کشور، واحد پول و حالت نمایش فعلاً ذخیره می‌شود؛ اعمال آن‌ها روی کل سایت در مرحله بعد انجام می‌شود.
            </p>
          </Section>

          <Section
            icon={Palette}
            title="ظاهر و شخصی‌سازی"
            description="تجربه بصری فروشگاه را مطابق سلیقه خود تنظیم کنید"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingSelect name="fontSize" label="اندازه نوشته‌ها">
                <option value="small">کوچک</option>
                <option value="normal">معمولی</option>
                <option value="large">بزرگ</option>
              </SettingSelect>

              <SettingSelect name="theme" label="تم سایت">
                <option value="light">روشن</option>
                <option value="dark">تاریک</option>
                <option value="system">خودکار</option>
              </SettingSelect>
            </div>

            <div className="mt-4 border-t border-gray-100">
              <SettingSwitch
                name="compactMode"
                title="نمایش فشرده"
                description="فاصله کمتر بین بخش‌های صفحه"
              />

              <div className="border-t border-gray-100" />

              <SettingSwitch
                name="reduceAnimations"
                title="کاهش انیمیشن‌ها"
                description="کاهش حرکت‌ها و جلوه‌های متحرک رابط کاربری"
              />
            </div>
          </Section>

          <Section
            icon={Bell}
            title="اعلان‌ها و اطلاع‌رسانی"
            description="مشخص کنید چه پیام‌هایی دریافت کنید"
          >
            <SettingSwitch
              name="orderNotifications"
              title="اعلان وضعیت سفارش"
              description="اطلاع از ثبت، ارسال و تحویل سفارش"
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="discountNotifications"
              title="اعلان تخفیف‌ها"
              description="اطلاع از پیشنهادها و محصولات تخفیف‌دار"
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="emailNotifications"
              title="اطلاع‌رسانی ایمیلی"
              description="دریافت پیام‌های فروشگاه از طریق ایمیل"
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="smsNotifications"
              title="اطلاع‌رسانی پیامکی"
              description="دریافت پیام‌های فروشگاه از طریق پیامک"
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="newsletter"
              title="خبرنامه نیک‌مارکت"
              description="دریافت اخبار و محصولات جدید فروشگاه"
            />
          </Section>

          <Section
            icon={ShieldCheck}
            title="حریم خصوصی و امنیت"
            description="مدیریت اطلاعات و حریم خصوصی"
          >
            <SettingSwitch
              name="showProfile"
              title="نمایش عمومی پروفایل"
              description="اجازه نمایش اطلاعات عمومی پروفایل"
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="saveSearchHistory"
              title="ذخیره تاریخچه جستجو"
              description="ذخیره عبارت‌های جستجو برای استفاده‌های بعدی"
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="personalizedProducts"
              title="پیشنهاد محصولات شخصی‌سازی‌شده"
              description="نمایش محصولات پیشنهادی بر اساس علایق شما"
            />

            <div className="mt-5 rounded-xl bg-[#F5F3EE] p-4 text-sm text-gray-600">
              این گزینه‌ها فعلاً فقط ترجیحات شما را ذخیره می‌کنند و سیستم امنیت حساب هنوز به سرور متصل نشده است.
            </div>
          </Section>

          <Section
            icon={ShoppingBag}
            title="تنظیمات خرید و ارسال"
            description="مدیریت ترجیحات خرید"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingInput
                name="defaultAddress"
                label="آدرس پیش‌فرض"
                placeholder="آدرس محل دریافت سفارش"
              />

              <SettingSelect
                name="preferredPayment"
                label="روش پرداخت ترجیحی"
              >
                <option value="online">پرداخت آنلاین</option>
                <option value="cash">پرداخت هنگام تحویل</option>
              </SettingSelect>
            </div>

            <div className="mt-4 border-t border-gray-100">
              <SettingSwitch
                name="saveCart"
                title="نگهداری سبد خرید"
                description="حفظ محصولات سبد خرید برای مراجعات بعدی"
              />
            </div>
          </Section>

          <Section
            icon={Eye}
            title="دسترس‌پذیری"
            description="تنظیمات برای استفاده راحت‌تر از سایت"
          >
            <SettingSelect name="fontSize" label="اندازه متن">
              <option value="small">کوچک</option>
              <option value="normal">معمولی</option>
              <option value="large">بزرگ</option>
            </SettingSelect>

            <div className="mt-4 border-t border-gray-100">
              <SettingSwitch
                name="reduceAnimations"
                title="کاهش حرکت رابط کاربری"
                description="کاهش جلوه‌های حرکتی و انیمیشن‌ها"
              />
            </div>
          </Section>

          <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-[#173D35]">
                مدیریت تنظیمات
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                تغییرات خود را ذخیره کنید یا تنظیمات را به حالت اولیه برگردانید.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                <RotateCcw size={17} />
                بازنشانی
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#245448]"
              >
                <Save size={18} />
                ذخیره تنظیمات
              </button>
            </div>
          </div>

          {message && (
            <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-center text-sm font-semibold text-green-800">
              {message}
            </div>
          )}
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Settings;
