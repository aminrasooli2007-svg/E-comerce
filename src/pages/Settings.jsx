
import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
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
  ArrowLeft,
  RotateCcw,
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
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  const [settings, setSettings] = useState(() => ({
    ...getSavedSettings(),
    language: isEnglish ? "en" : "fa",
  }));

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "language") {
      i18n.changeLanguage(value);
    }

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "nik-market-settings",
      JSON.stringify(settings)
    );

    setMessage(t("settingsSaved"));
  }

  function handleReset() {
    const resetSettings = {
      ...defaultSettings,
      language: i18n.language === "en" ? "en" : "fa",
    };

    setSettings(resetSettings);

    localStorage.setItem(
      "nik-market-settings",
      JSON.stringify(resetSettings)
    );

    setMessage(t("settingsReset"));
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
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="min-h-screen bg-[#FAF9F6]"
    >
      <Header search="" setSearch={() => {}} />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#173D35]"
          >
            {isEnglish ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
            {t("settingsBackHome")}
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173D35] text-white">
              <SettingsIcon size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-[#173D35]">
                {t("settingsTitle")}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {t("settingsSubtitle")}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section
            icon={User}
            title={t("settingsAccount")}
            description={t("settingsAccountDescription")}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingInput
                name="name"
                label={t("settingsFullName")}
                placeholder={t("settingsEnterName")}
              />

              <SettingInput
                name="email"
                label={t("settingsEmail")}
                placeholder="example@gmail.com"
                type="email"
              />

              <SettingInput
                name="phone"
                label={t("settingsPhone")}
                placeholder="09123456789"
                type="tel"
              />
            </div>

            <div className="mt-5 rounded-xl bg-[#F5F3EE] p-4 text-sm text-gray-600">
              {t("settingsSecurityNotice")}
            </div>
          </Section>

          <Section
            icon={Globe}
            title={t("settingsLanguageRegion")}
            description={t("settingsLanguageRegionDescription")}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingSelect
                name="language"
                label={t("settingsSiteLanguage")}
              >
                <option value="fa">فارسی</option>
                <option value="en">English</option>
              </SettingSelect>

              <SettingSelect name="country" label={t("settingsCountry")}>
                <option value="iran">{t("settingsIran")}</option>
                <option value="germany">{t("settingsGermany")}</option>
                <option value="turkey">{t("settingsTurkey")}</option>
                <option value="other">{t("settingsOtherCountries")}</option>
              </SettingSelect>

              <SettingSelect name="currency" label={t("settingsCurrency")}>
                <option value="toman">{t("settingsToman")}</option>
                <option value="rial">{t("settingsRial")}</option>
                <option value="usd">{t("settingsUSD")}</option>
                <option value="eur">{t("settingsEUR")}</option>
              </SettingSelect>

              <SettingSelect name="theme" label={t("settingsDisplayMode")}>
                <option value="light">{t("settingsLight")}</option>
                <option value="dark">{t("settingsDark")}</option>
                <option value="system">{t("settingsSystem")}</option>
              </SettingSelect>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {t("settingsLanguageNotice")}
            </p>
          </Section>

          <Section
            icon={Palette}
            title={t("settingsAppearance")}
            description={t("settingsAppearanceDescription")}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingSelect
                name="fontSize"
                label={t("settingsFontSize")}
              >
                <option value="small">{t("settingsSmall")}</option>
                <option value="normal">{t("settingsNormal")}</option>
                <option value="large">{t("settingsLarge")}</option>
              </SettingSelect>

              <SettingSelect name="theme" label={t("settingsSiteTheme")}>
                <option value="light">{t("settingsLight")}</option>
                <option value="dark">{t("settingsDark")}</option>
                <option value="system">{t("settingsAutomatic")}</option>
              </SettingSelect>
            </div>

            <div className="mt-4 border-t border-gray-100">
              <SettingSwitch
                name="compactMode"
                title={t("settingsCompactMode")}
                description={t("settingsCompactModeDescription")}
              />

              <div className="border-t border-gray-100" />

              <SettingSwitch
                name="reduceAnimations"
                title={t("settingsReduceAnimations")}
                description={t("settingsReduceAnimationsDescription")}
              />
            </div>
          </Section>

          <Section
            icon={Bell}
            title={t("settingsNotifications")}
            description={t("settingsNotificationsDescription")}
          >
            <SettingSwitch
              name="orderNotifications"
              title={t("settingsOrderNotifications")}
              description={t("settingsOrderNotificationsDescription")}
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="discountNotifications"
              title={t("settingsDiscountNotifications")}
              description={t("settingsDiscountNotificationsDescription")}
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="emailNotifications"
              title={t("settingsEmailNotifications")}
              description={t("settingsEmailNotificationsDescription")}
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="smsNotifications"
              title={t("settingsSMSNotifications")}
              description={t("settingsSMSNotificationsDescription")}
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="newsletter"
              title={t("settingsNewsletter")}
              description={t("settingsNewsletterDescription")}
            />
          </Section>

          <Section
            icon={ShieldCheck}
            title={t("settingsPrivacy")}
            description={t("settingsPrivacyDescription")}
          >
            <SettingSwitch
              name="showProfile"
              title={t("settingsShowProfile")}
              description={t("settingsShowProfileDescription")}
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="saveSearchHistory"
              title={t("settingsSearchHistory")}
              description={t("settingsSearchHistoryDescription")}
            />

            <div className="border-t border-gray-100" />

            <SettingSwitch
              name="personalizedProducts"
              title={t("settingsPersonalizedProducts")}
              description={t("settingsPersonalizedProductsDescription")}
            />

            <div className="mt-5 rounded-xl bg-[#F5F3EE] p-4 text-sm text-gray-600">
              {t("settingsPrivacyNotice")}
            </div>
          </Section>

          <Section
            icon={ShoppingBag}
            title={t("settingsShopping")}
            description={t("settingsShoppingDescription")}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SettingInput
                name="defaultAddress"
                label={t("settingsDefaultAddress")}
                placeholder={t("settingsAddressPlaceholder")}
              />

              <SettingSelect
                name="preferredPayment"
                label={t("settingsPreferredPayment")}
              >
                <option value="online">{t("settingsOnlinePayment")}</option>
                <option value="cash">{t("settingsCashPayment")}</option>
              </SettingSelect>
            </div>

            <div className="mt-4 border-t border-gray-100">
              <SettingSwitch
                name="saveCart"
                title={t("settingsSaveCart")}
                description={t("settingsSaveCartDescription")}
              />
            </div>
          </Section>

          <Section
            icon={Eye}
            title={t("settingsAccessibility")}
            description={t("settingsAccessibilityDescription")}
          >
            <SettingSelect
              name="fontSize"
              label={t("settingsTextSize")}
            >
              <option value="small">{t("settingsSmall")}</option>
              <option value="normal">{t("settingsNormal")}</option>
              <option value="large">{t("settingsLarge")}</option>
            </SettingSelect>

            <div className="mt-4 border-t border-gray-100">
              <SettingSwitch
                name="reduceAnimations"
                title={t("settingsReduceMotion")}
                description={t("settingsReduceMotionDescription")}
              />
            </div>
          </Section>

          <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-[#173D35]">
                {t("settingsManage")}
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                {t("settingsManageDescription")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                <RotateCcw size={17} />
                {t("settingsResetButton")}
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#245448]"
              >
                <Save size={18} />
                {t("settingsSaveButton")}
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
