import { useEffect, useState } from "react";
import { Plus, TicketPercent, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import AdminSectionLayout from "./AdminSectionLayout";

const STORAGE_KEY = "nik-market-admin-coupons";
const readCoupons = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};

function AdminCoupons() {
  const [coupons, setCoupons] = useState(readCoupons);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("10");
  const [kind, setKind] = useState("percent");
  const [expires, setExpires] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons)); }, [coupons]);

  const addCoupon = (event) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    const amount = Number(discount);
    if (!normalized) return setError("کد تخفیف را وارد کنید.");
    if (coupons.some((item) => item.code === normalized)) return setError("این کد قبلاً ثبت شده است.");
    if (!Number.isFinite(amount) || amount <= 0 || (kind === "percent" && amount > 100)) return setError("مقدار تخفیف معتبر نیست.");
    setCoupons((current) => [...current, { id: `${Date.now()}`, code: normalized, discount: amount, kind, expires, active: true }]);
    setCode(""); setDiscount("10"); setExpires(""); setError("");
  };

  return (
    <AdminSectionLayout title="کدهای تخفیف" description="کدهای تخفیف فروشگاه را ایجاد و مدیریت کنید.">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <form onSubmit={addCoupon} className="h-fit rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-black text-[#173D35]"><Plus size={20} /> افزودن کد تخفیف</h2>
          <label className="mb-2 block text-sm font-bold text-gray-600">کد تخفیف</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="مثلاً WELCOME10" className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#173D35]" />
          <label className="mb-2 block text-sm font-bold text-gray-600">نوع تخفیف</label>
          <select value={kind} onChange={(e) => setKind(e.target.value)} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#173D35]"><option value="percent">درصدی</option><option value="fixed">مبلغ ثابت (افغانی)</option></select>
          <label className="mb-2 block text-sm font-bold text-gray-600">مقدار تخفیف</label>
          <input type="number" min="1" max={kind === "percent" ? "100" : undefined} value={discount} onChange={(e) => setDiscount(e.target.value)} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#173D35]" />
          <label className="mb-2 block text-sm font-bold text-gray-600">تاریخ انقضا (اختیاری)</label>
          <input type="date" value={expires} onChange={(e) => setExpires(e.target.value)} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#173D35]" />
          {error && <p className="mb-3 text-sm font-semibold text-red-600">{error}</p>}
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173D35] px-4 py-3 font-bold text-white transition hover:bg-[#245448]"><Plus size={18} /> ثبت کد تخفیف</button>
        </form>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-black text-[#173D35]">کدهای ثبت‌شده</h2><span className="rounded-lg bg-[#F5F3EE] px-3 py-1 text-sm font-bold text-[#173D35]">{coupons.length} کد</span></div>
          {coupons.length === 0 ? <div className="flex min-h-52 flex-col items-center justify-center text-center text-gray-400"><TicketPercent size={36} className="mb-3" /><p className="font-semibold">هنوز کد تخفیفی ثبت نشده است.</p></div> :
            <div className="space-y-3">{coupons.map((coupon) => <div key={coupon.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 p-4">
              <div><p className="font-black tracking-wide text-[#173D35]">{coupon.code}</p><p className="mt-1 text-sm text-gray-500">{coupon.kind === "percent" ? `${coupon.discount}٪ تخفیف` : `${coupon.discount.toLocaleString("fa-IR")} افغانی تخفیف`}{coupon.expires ? ` · انقضا: ${coupon.expires}` : " · بدون تاریخ انقضا"}</p></div>
              <div className="flex items-center gap-2"><button onClick={() => setCoupons((list) => list.map((item) => item.id === coupon.id ? { ...item, active: !item.active } : item))} className={`rounded-lg px-3 py-2 text-sm font-bold ${coupon.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`} aria-label="تغییر وضعیت">{coupon.active ? <span className="inline-flex items-center gap-1"><ToggleRight size={18} /> فعال</span> : <span className="inline-flex items-center gap-1"><ToggleLeft size={18} /> غیرفعال</span>}</button><button onClick={() => setCoupons((list) => list.filter((item) => item.id !== coupon.id))} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100" aria-label="حذف کد"><Trash2 size={18} /></button></div>
            </div>)}</div>}
        </section>
      </div>
    </AdminSectionLayout>
  );
}

export default AdminCoupons;
