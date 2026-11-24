import { Link } from "react-router";
import { ArrowRight, Store } from "lucide-react";

function AdminSectionLayout({ title, description, children }) {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F3EE] px-4 py-6 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-[#F5F3EE] p-3 text-[#173D35]"><Store size={22} /></span>
            <div>
              <Link to="/admin" className="text-sm font-semibold text-gray-500 hover:text-[#173D35]">پنل مدیریت</Link>
              <h1 className="mt-1 text-2xl font-black text-[#173D35]">{title}</h1>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <Link to="/admin" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 transition hover:border-[#173D35] hover:text-[#173D35]">
            <ArrowRight size={17} /> بازگشت به داشبورد
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}

export default AdminSectionLayout;
