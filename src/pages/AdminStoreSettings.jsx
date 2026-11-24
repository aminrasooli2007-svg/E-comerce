import { useEffect, useState } from "react";
import { Save, Settings2 } from "lucide-react";
import AdminSectionLayout from "./AdminSectionLayout";

const STORAGE_KEY = "nik-market-admin-store-settings";
const defaults = { storeName: "نیک‌مارکت", supportEmail: "", supportPhone: "", currency: "AFN", shippingFee: "0", freeShippingThreshold: "0", announcement: "" };
const readSettings = () => {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return defaults; }
};

function AdminStoreSettings() {
  const [settings, setSettings] = useState(readSettings);
  const [saved, setSaved] = useState(false);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }, [settings]);
  const update = (key, value) => { setSettings((current) => ({ ...current, [key]: value })); setSaved(false); };
  const save = (event) => { event.preventDefault(); localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); setSaved(true); };
  const inputClass = "mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-[#173D35]";

  return (
    <AdminSectionLayout title="تنظیمات فروشگاه" description="اطلاعات عمومی و تنظیمات پایه فروشگاه را تغییر دهید.">
      <form onSubmit={save} className="max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
        <h2 className="mb-6 flex items-center gap-2 text-lg font-black text-[#173D35]"><Settings2 size={21} /> اطلاعات فروشگاه</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold text-gray-600">نام فروشگاه<input value={settings.storeName} onChange={(e) => update("storeName", e.target.value)} className={inputClass} required /></label>
          <label className="text-sm font-bold text-gray-600">ایمیل پشتیبانی<input type="email" value={settings.supportEmail} onChange={(e) => update("supportEmail", e.target.value)} placeholder="support@example.com" className={inputClass} /></label>
          <label className="text-sm font-bold text-gray-600">شماره تماس پشتیبانی<input value={settings.supportPhone} onChange={(e) => update("supportPhone", e.target.value)} className={inputClass} /></label>
          <label className="text-sm font-bold text-gray-600">واحد پول<select value={settings.currency} onChange={(e) => update("currency", e.target.value)} className={inputClass}><option value="AFN">افغانی (AFN)</option><option value="USD">دالر (USD)</option></select></label>
          <label className="text-sm font-bold text-gray-600">هزینه ارسال (افغانی)<input type="number" min="0" value={settings.shippingFee} onChange={(e) => update("shippingFee", e.target.value)} className={inputClass} /></label>
          <label className="text-sm font-bold text-gray-600">ارسال رایگان از مبلغ (افغانی)<input type="number" min="0" value={settings.freeShippingThreshold} onChange={(e) => update("freeShippingThreshold", e.target.value)} className={inputClass} /></label>
        </div>
        <label className="mt-5 block text-sm font-bold text-gray-600">پیام اطلاع‌رسانی فروشگاه<textarea rows="3" value={settings.announcement} onChange={(e) => update("announcement", e.target.value)} placeholder="پیام اختیاری برای مشتریان" className={inputClass} /></label>
        <div className="mt-6 flex flex-wrap items-center gap-4"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#173D35] px-5 py-3 font-bold text-white transition hover:bg-[#245448]"><Save size={18} /> ذخیره تنظیمات</button>{saved && <span className="text-sm font-bold text-green-700">تنظیمات ذخیره شد.</span>}</div>
      </form>
    </AdminSectionLayout>
  );
}

export default AdminStoreSettings;
