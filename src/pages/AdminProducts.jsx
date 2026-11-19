
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
} from "lucide-react";
import useShopStore from "../store/useShopStore";

const emptyProduct = {
  title: "",
  category: "دیجیتال",
  price: "",
  oldPrice: "",
  discount: "",
  rating: "5",
  image: "",
};

function AdminProducts() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isEnglish = i18n.language === "en";
  const dir = isEnglish ? "ltr" : "rtl";

  const products = useShopStore((state) => state.products);
  const addProduct = useShopStore((state) => state.addProduct);
  const updateProduct = useShopStore((state) => state.updateProduct);
  const deleteProduct = useShopStore((state) => state.deleteProduct);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const categories = [
    { value: "دیجیتال", label: t("adminCategoryDigital") },
    { value: "پوشاک", label: t("adminCategoryClothing") },
    { value: "اکسسوری", label: t("adminCategoryAccessories") },
    { value: "خانه", label: t("adminCategoryHome") },
    { value: "زیبایی", label: t("adminCategoryBeauty") },
  ];

  function isActive(path) {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname === path;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function openAddForm() {
    setForm(emptyProduct);
    setEditingId(null);
    setShowForm(true);
    setMessage("");
  }

  function openEditForm(product) {
    setForm({
      title: product.name ?? product.title ?? "",
      category: product.category ?? "دیجیتال",
      price: String(product.price ?? ""),
      oldPrice: String(product.oldPrice ?? ""),
      discount: String(product.discount ?? ""),
      rating: String(product.rating ?? "5"),
      image: product.image ?? "",
    });

    setEditingId(product.id);
    setShowForm(true);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const productData = {
      name: form.title.trim(),
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice) || 0,
      discount: Number(form.discount) || 0,
      rating: Number(form.rating) || 5,
      image: form.image.trim(),
    };

    if (
      !productData.name ||
      !productData.image ||
      !Number.isFinite(productData.price) ||
      productData.price <= 0
    ) {
      setMessage(t("adminInvalidProduct"));
      return;
    }

    if (editingId !== null) {
      updateProduct(editingId, productData);
      setMessage(t("adminProductUpdated"));
    } else {
      addProduct(productData);
      setMessage(t("adminProductAdded"));
    }

    setShowForm(false);
    setForm(emptyProduct);
    setEditingId(null);
  }

  function handleDelete(productId) {
    deleteProduct(productId);
    setDeleteId(null);
    setMessage(t("adminProductDeleted"));
  }

  const filteredProducts = products.filter((product) =>
    String(product.name ?? product.title ?? "")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  function getCategoryLabel(category) {
    return categories.find((item) => item.value === category)?.label ?? category;
  }

  function formatPrice(price) {
    return `${Number(price).toLocaleString(isEnglish ? "en-US" : "fa-IR")} ${t("adminToman")}`;
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#173D35]";

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
                    style={active ? { color: "#FFFFFF" } : undefined}
                    className={
                      active
                        ? "!text-white"
                        : "text-gray-600 group-hover:!text-white"
                    }
                  />

                  <span
                    style={active ? { color: "#FFFFFF" } : undefined}
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
                <Package size={27} className="text-[#173D35]" />
                <h1 className="text-2xl font-black text-[#173D35]">
                  {t("adminTitle")}
                </h1>
              </div>

              <p className="text-sm text-gray-500">
                {t("adminDescription")}
              </p>
            </div>

            <button
              onClick={openAddForm}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#173D35] px-5 py-3 font-bold !text-white transition hover:bg-[#245448]"
            >
              <Plus size={19} className="!text-white" />
              <span className="!text-white">{t("adminAddProduct")}</span>
            </button>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-sm text-gray-500">{t("adminTotalProducts")}</p>
              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {products.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-sm text-gray-500">{t("adminDisplayedProducts")}</p>
              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {filteredProducts.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-sm text-gray-500">{t("adminCategories")}</p>
              <p className="mt-2 text-2xl font-black text-[#173D35]">
                {new Set(products.map((product) => product.category)).size}
              </p>
            </div>
          </div>

          {message && (
            <div className="mb-5 flex items-center justify-between rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
              {message}
              <button
                onClick={() => setMessage("")}
                aria-label={t("adminCloseMessage")}
              >
                <X size={18} />
              </button>
            </div>
          )}

          {showForm && (
            <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-black text-[#173D35]">
                  {editingId !== null ? t("adminEditProduct") : t("adminNewProduct")}
                </h2>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  aria-label={t("adminCloseForm")}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminProductName")}
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder={t("adminEnterProductName")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminCategory")}
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminPrice")} ({t("adminToman")})
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="1"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminOldPrice")} ({t("adminToman")})
                  </label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={form.oldPrice}
                    onChange={handleChange}
                    min="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminDiscount")}
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={form.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminRating")}
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t("adminImageUrl")}
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/image.jpg"
                    className={inputClass}
                  />
                </div>

                {form.image && (
                  <div className="sm:col-span-2">
                    <p className="mb-2 text-sm font-semibold text-gray-700">
                      {t("adminImagePreview")}
                    </p>
                    <img
                      src={form.image}
                      alt={t("adminProductPreview")}
                      className="h-40 w-40 rounded-xl border border-gray-100 object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 font-bold !text-white transition hover:bg-[#245448]"
                  >
                    <Save size={18} className="!text-white" />
                    <span className="!text-white">{t("adminSaveProduct")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    {t("adminCancel")}
                  </button>
                </div>
              </form>
            </section>
          )}

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
                  placeholder={t("adminSearchPlaceholder")}
                  className={`w-full rounded-xl border border-gray-200 py-3 text-sm outline-none focus:border-[#173D35] ${
                    isEnglish ? "pl-11 pr-4" : "pr-11 pl-4"
                  }`}
                />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                {t("adminNoProducts")}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className={`w-full min-w-[700px] ${isEnglish ? "text-left" : "text-right"}`}>
                  <thead className="bg-[#F5F3EE] text-sm text-gray-600">
                    <tr>
                      <th className="px-5 py-4">{t("adminProduct")}</th>
                      <th className="px-5 py-4">{t("adminCategory")}</th>
                      <th className="px-5 py-4">{t("adminPriceColumn")}</th>
                      <th className="px-5 py-4">{t("adminRating")}</th>
                      <th className="px-5 py-4">{t("adminActions")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-t border-gray-100">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name || product.title || ""}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            )}
                            <span className="font-semibold text-gray-700">
                              {product.name || product.title || t("adminUnnamed")}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500">
                          {getCategoryLabel(product.category)}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-[#173D35]">
                          {formatPrice(product.price)}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500">
                          {product.rating}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditForm(product)}
                              aria-label={t("adminEditProduct")}
                              className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              onClick={() => setDeleteId(product.id)}
                              aria-label={t("adminDeleteProduct")}
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
                {t("adminDeleteTitle")}
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {t("adminDeleteConfirmation")}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
                >
                  {t("adminConfirmDelete")}
                </button>

                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {t("adminCancel")}
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

export default AdminProducts;
