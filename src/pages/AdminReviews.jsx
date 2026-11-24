import { useEffect, useState } from "react";
import { MessageSquareText, Star, Trash2, CheckCircle2 } from "lucide-react";
import AdminSectionLayout from "./AdminSectionLayout";

const STORAGE_KEY = "nik-market-admin-reviews";
const readReviews = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};

function AdminReviews() {
  const [reviews, setReviews] = useState(readReviews);
  const [filter, setFilter] = useState("all");
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews)); }, [reviews]);
  const visibleReviews = reviews.filter((review) => filter === "all" || (filter === "approved" ? review.approved : !review.approved));

  return (
    <AdminSectionLayout title="مدیریت نظرات" description="نظرات ثبت‌شده درباره محصولات را بررسی و مدیریت کنید.">
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-lg font-black text-[#173D35]">نظرات کاربران</h2><p className="mt-1 text-sm text-gray-500">تأیید نظرات پیش از نمایش در فروشگاه</p></div><select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 outline-none focus:border-[#173D35]"><option value="all">همه نظرات</option><option value="pending">در انتظار تأیید</option><option value="approved">تأییدشده</option></select></div>
        {visibleReviews.length === 0 ? <div className="flex min-h-60 flex-col items-center justify-center text-center text-gray-400"><MessageSquareText size={38} className="mb-3" /><p className="font-semibold">نظری برای نمایش وجود ندارد.</p><p className="mt-2 text-sm">پس از اتصال سیستم نظرات، نظرهای کاربران در این بخش نمایش داده می‌شوند.</p></div> :
          <div className="space-y-4">{visibleReviews.map((review) => <article key={review.id} className="rounded-xl border border-gray-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold text-[#173D35]">{review.productName || "محصول"}</h3><p className="mt-1 text-sm text-gray-500">{review.userName || "کاربر"} {review.date ? `· ${review.date}` : ""}</p><div className="mt-2 flex gap-1 text-amber-500">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < Number(review.rating || 0) ? "currentColor" : "none"} />)}</div></div><div className="flex gap-2"><button onClick={() => setReviews((list) => list.map((item) => item.id === review.id ? { ...item, approved: !item.approved } : item))} className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700"><CheckCircle2 size={16} /> {review.approved ? "لغو تأیید" : "تأیید"}</button><button onClick={() => setReviews((list) => list.filter((item) => item.id !== review.id))} className="rounded-lg bg-red-50 p-2 text-red-600" aria-label="حذف نظر"><Trash2 size={17} /></button></div></div><p className="mt-4 leading-7 text-gray-600">{review.comment}</p></article>)}</div>}
      </section>
    </AdminSectionLayout>
  );
}

export default AdminReviews;
