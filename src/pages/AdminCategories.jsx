
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  TicketPercent,
  Star,
  Settings,
  Store,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  ArrowRight,
  ArrowLeft,
  Folder,
} from "lucide-react";
import useShopStore from "../store/useShopStore";

function AdminCategories() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isEnglish = i18n.language === "en";
  const dir = isEnglish ? "ltr" : "rtl";

  const categories = useShopStore((state) => state.categories);
  const products = useShopStore((state) => state.products);
  const addCategory = useShopStore((state) => state.addCategory);
  const updateCategory = useShopStore((state) => state.updateCategory);
  const deleteCategory = useShopStore((state) => state.deleteCategory);

  const [search, setSearch] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState("");

  const menuItems = [
    { title: t("dashboardOverview"), path: "/admin", icon: LayoutDashboard },
    { title: t("dashboardProducts"), path: "/admin/products", icon: Package },
    { title: t("dashboardOrders"), path: "/admin/orders", icon: ShoppingCart },
    { title: t("dashboardUsers"), path: "/admin/users", icon: Users },
    { title: t("dashboardCategories"), path: "/admin/categories", icon: Tags },
    { title: t("dashboardCoupons"), path: "/admin/coupons", icon: TicketPercent },
    { title: t("dashboardReviews"), path: "/admin/reviews", icon: Star },
    { title: t("dashboardSettings"), path: "/admin/settings", icon: Settings },
  ];

  function isActive(path) {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname === path;
  }

  function resetForm() {
    setCategoryName("");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = categoryName.trim();

    if (!name) {
      setMessage(isEnglish ? "Please enter a category name." : "نام دسته‌بندی را وارد کنید.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.id !== editingId &&
        category.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setMessage(isEnglish ? "This category already exists." : "این دسته‌بندی از قبل وجود دارد.");
      return;
    }

    if (editingId !== null) {
      updateCategory(editingId, name);
      setMessage(isEnglish ? "Category updated successfully." : "دسته‌بندی با موفقیت ویرایش شد.");
    } else {
      addCategory(name);
      setMessage(isEnglish ? "Category added successfully." : "دسته‌بندی با موفقیت اضافه شد.");
    }

    resetForm();
  }

  function handleEdit(category) {
    setCategoryName(category.name);
    setEditingId(category.id);
    setMessage("");
  }

  function handleDelete() {
    if (deleteId === null) {
      return;
    }

    deleteCategory(deleteId);
    setDeleteId(null);
    setMessage(isEnglish ? "Category deleted." : "دسته‌بندی حذف شد.");
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function getProductCount(categoryValue) {
    return products.filter(
      (product) => product.category === categoryValue
    ).length;
  }

  return (
    <div dir={dir} className="min-h-screen bg-[#F5F3EE] lg:flex">
      <aside className="w-full border-b border-gray-100 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-e">
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link to="/" className="text-2xl font-black text-[#173D35]">
            {isEnglish ? "NikMarket" : "نیک‌مارکت"}
          </Link>

          <span className="rounded-lg bg-[#F5F3EE] p-2 text-[#173D35]">
            <Store size={21} />
          </span>
        </div>

        <div className="p-5">
          <p className="mb-4 px-3 text-xs font-bold text-gray-400">
            {t("dashboardManagement")}
          </p>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={
                    active
                      ? { backgroundColor: "#173D35", color: "#FFFFFF" }
                      : undefined
                  }
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "!bg-[#173D35] !text-white"
                      : "text-gray-600 hover:!bg-[#173D35] hover:!text-white"
                  }`}
                >
                  <Icon
                    size={19}
                    className={
                      active
                        ? "!text-white"
                        : "text-gray-600 group-hover:!text-white"
                    }
                  />
                  <span
                    className={
                      active
                        ? "!text-white"
                        : "text-gray-600 group-hover:!text-white"
                    }
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden px-5 lg:absolute lg:bottom-6 lg:block lg:w-full">
          <Link
            to="/"
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 text-sm font-semibold text-gray-600 transition hover:border-[#173D35] hover:bg-[#173D35] hover:!text-white"
          >
            {t("dashboardBackToStore")}
            {isEnglish ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="border-b border-gray-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
            <Link to="/" className="text-xl font-black text-[#173D35]">
              {isEnglish ? "NikMarket" : "نیک‌مارکت"}
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#173D35]"
            >
              {isEnglish ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
              {t("adminBackToShop")}
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <Tags size={27} className="text-[#173D35]" />
                <h1 className="text-2xl font-black text-[#173D35]">
                  {isEnglish ? "Categories" : "مدیریت دسته‌بندی‌ها"}
                </h1>
              </div>

              <p className="text-sm text-gray-500">
                {isEnglish
                  ? "Create, edit and organize your store categories."
                  : "دسته‌بندی‌های فروشگاه را ایجاد، ویرایش و مدیریت کنید."}
              </p>
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-sm text-gray-500">
                {isEnglish ? "Total categories" : "تعداد دسته‌بندی‌ها"}
              </p>
              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {categories.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-sm text-gray-500">
                {isEnglish ? "Products" : "تعداد محصولات"}
              </p>
              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {products.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-sm text-gray-500">
                {isEnglish ? "Uncategorized products" : "محصولات بدون دسته‌بندی"}
              </p>
              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {products.filter(
                  (product) => product.category === "بدون دسته‌بندی"
                ).length}
              </p>
            </div>
          </div>

          {message && (
            <div className="mb-5 flex items-center justify-between rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
              {message}
              <button
                onClick={() => setMessage("")}
                aria-label={isEnglish ? "Close message" : "بستن پیام"}
              >
                <X size={18} />
              </button>
            </div>
          )}

          <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-black text-[#173D35]">
              {editingId !== null
                ? isEnglish
                  ? "Edit category"
                  : "ویرایش دسته‌بندی"
                : isEnglish
                  ? "Add new category"
                  : "افزودن دسته‌بندی جدید"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder={isEnglish ? "Category name" : "نام دسته‌بندی"}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                required
              />

              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 font-bold !text-white transition hover:bg-[#245448]"
              >
                {editingId !== null ? <Save size={18} /> : <Plus size={18} />}
                <span>
                  {editingId !== null
                    ? isEnglish
                      ? "Save changes"
                      : "ذخیره تغییرات"
                    : isEnglish
                      ? "Add category"
                      : "افزودن دسته‌بندی"}
                </span>
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {isEnglish ? "Cancel" : "لغو"}
                </button>
              )}
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <div className="relative">
                <Search
                  size={19}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isEnglish ? "left-4" : "right-4"
                  }`}
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={isEnglish ? "Search categories..." : "جستجوی دسته‌بندی‌ها..."}
                  className={`w-full rounded-xl border border-gray-200 py-3 text-sm outline-none focus:border-[#173D35] ${
                    isEnglish ? "pl-11 pr-4" : "pr-11 pl-4"
                  }`}
                />
              </div>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                {isEnglish ? "No categories found." : "دسته‌بندی‌ای پیدا نشد."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className={`w-full min-w-[600px] ${isEnglish ? "text-left" : "text-right"}`}>
                  <thead className="bg-[#F5F3EE] text-sm text-gray-600">
                    <tr>
                      <th className="px-5 py-4">
                        {isEnglish ? "Category" : "دسته‌بندی"}
                      </th>
                      <th className="px-5 py-4">
                        {isEnglish ? "Products" : "محصولات"}
                      </th>
                      <th className="px-5 py-4">
                        {isEnglish ? "Actions" : "عملیات"}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="border-t border-gray-100">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="rounded-xl bg-[#F5F3EE] p-3 text-[#173D35]">
                              <Folder size={20} />
                            </span>
                            <span className="font-semibold text-gray-700">
                              {category.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500">
                          {getProductCount(category.value)}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              aria-label={isEnglish ? "Edit category" : "ویرایش دسته‌بندی"}
                              className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              onClick={() => setDeleteId(category.id)}
                              aria-label={isEnglish ? "Delete category" : "حذف دسته‌بندی"}
                              className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>

        {deleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-lg font-black text-[#173D35]">
                {isEnglish ? "Delete category?" : "حذف دسته‌بندی؟"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {isEnglish
                  ? "Products in this category will become uncategorized."
                  : "محصولات این دسته‌بندی به حالت بدون دسته‌بندی منتقل می‌شوند."}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
                >
                  {isEnglish ? "Delete" : "حذف"}
                </button>

                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {isEnglish ? "Cancel" : "لغو"}
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 border-t border-gray-100 bg-white py-5 text-center text-xs text-gray-400">
          {t("adminFooter")}
        </footer>
      </div>
    </div>
  );
}

export default AdminCategories;
