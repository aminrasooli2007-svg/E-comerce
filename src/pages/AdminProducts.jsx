
import { useState } from "react";
import { Link } from "react-router";
import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  ArrowRight,
} from "lucide-react";
import { products as initialProducts } from "../data/products";

const STORAGE_KEY = "nik-market-admin-products";

const emptyProduct = {
  title: "",
  category: "دیجیتال",
  price: "",
  oldPrice: "",
  discount: "",
  rating: "5",
  image: "",
};

function normalizeProducts(items) {
  if (!Array.isArray(items)) {
    return initialProducts;
  }

  return items
    .filter((product) => product && typeof product === "object")
    .map((product, index) => ({
      ...product,
      id: product.id ?? Date.now() + index,
      title: String(product.title ?? product.name ?? ""),
      category: String(product.category ?? "دیجیتال"),
      price: Number(product.price) || 0,
      oldPrice: Number(product.oldPrice) || 0,
      discount: Number(product.discount) || 0,
      rating: Number(product.rating) || 5,
      image: String(product.image ?? ""),
    }));
}

function getProducts() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if (savedProducts) {
      return normalizeProducts(JSON.parse(savedProducts));
    }
  } catch {
    return initialProducts;
  }

  return normalizeProducts(initialProducts);
}

function AdminProducts() {
  const [products, setProducts] = useState(getProducts);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  function saveProducts(updatedProducts) {
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
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
      title: product.title,
      category: product.category,
      price: String(product.price),
      oldPrice: String(product.oldPrice || ""),
      discount: String(product.discount || ""),
      rating: String(product.rating || "5"),
      image: product.image,
    });

    setEditingId(product.id);
    setShowForm(true);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const productData = {
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice) || 0,
      discount: Number(form.discount) || 0,
      rating: Number(form.rating) || 5,
      image: form.image.trim(),
    };

    if (
      !productData.title ||
      !productData.image ||
      !Number.isFinite(productData.price) ||
      productData.price <= 0
    ) {
      setMessage("لطفاً اطلاعات محصول را به‌درستی وارد کنید.");
      return;
    }

    let updatedProducts;

    if (editingId !== null) {
      updatedProducts = products.map((product) =>
        product.id === editingId
          ? { ...product, ...productData }
          : product
      );
    } else {
      updatedProducts = [
        {
          id: Date.now(),
          ...productData,
        },
        ...products,
      ];
    }

    saveProducts(updatedProducts);
    setShowForm(false);
    setForm(emptyProduct);
    setEditingId(null);
    setMessage(
      editingId !== null
        ? "محصول با موفقیت ویرایش شد."
        : "محصول جدید با موفقیت اضافه شد."
    );
  }

  function handleDelete(productId) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    saveProducts(updatedProducts);
    setDeleteId(null);
    setMessage("محصول با موفقیت حذف شد.");
  }

  const filteredProducts = products.filter((product) =>
    String(product.title ?? "")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <Link to="/" className="text-xl font-black text-[#173D35]">
            نیک‌مارکت
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#173D35]"
          >
            <ArrowRight size={17} />
            بازگشت به فروشگاه
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <Package size={27} className="text-[#173D35]" />
              <h1 className="text-2xl font-black text-[#173D35]">
                مدیریت محصولات
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              محصولات فروشگاه خود را مدیریت کنید.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#173D35] px-5 py-3 font-bold text-white transition hover:bg-[#245448]"
          >
            <Plus size={19} />
            افزودن محصول
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">کل محصولات</p>
            <p className="mt-2 text-2xl font-black text-[#173D35]">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">محصولات نمایش داده‌شده</p>
            <p className="mt-2 text-2xl font-black text-[#173D35]">
              {filteredProducts.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">دسته‌بندی‌ها</p>
            <p className="mt-2 text-2xl font-black text-[#173D35]">
              {new Set(products.map((product) => product.category)).size}
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-5 flex items-center justify-between rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
            {message}
            <button onClick={() => setMessage("")}>
              <X size={18} />
            </button>
          </div>
        )}

        {showForm && (
          <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-black text-[#173D35]">
                {editingId !== null ? "ویرایش محصول" : "افزودن محصول جدید"}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  نام محصول
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="نام محصول را وارد کنید"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  دسته‌بندی
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                >
                  <option value="دیجیتال">دیجیتال</option>
                  <option value="پوشاک">پوشاک</option>
                  <option value="اکسسوری">اکسسوری</option>
                  <option value="خانه">خانه و آشپزخانه</option>
                  <option value="زیبایی">زیبایی و سلامت</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  قیمت (تومان)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  قیمت قبلی (تومان)
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={form.oldPrice}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  درصد تخفیف
                </label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  امتیاز محصول
                </label>
                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  آدرس تصویر محصول
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#173D35]"
                />
              </div>

              {form.image && (
                <div className="sm:col-span-2">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    پیش‌نمایش تصویر
                  </p>
                  <img
                    src={form.image}
                    alt="پیش‌نمایش محصول"
                    className="h-40 w-40 rounded-xl border border-gray-100 object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#173D35] px-6 py-3 font-bold text-white transition hover:bg-[#245448]"
                >
                  <Save size={18} />
                  ذخیره محصول
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  انصراف
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جستجوی نام محصول..."
                className="w-full rounded-xl border border-gray-200 py-3 pr-11 pl-4 text-sm outline-none focus:border-[#173D35]"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              محصولی پیدا نشد.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-right">
                <thead className="bg-[#F5F3EE] text-sm text-gray-600">
                  <tr>
                    <th className="px-5 py-4">محصول</th>
                    <th className="px-5 py-4">دسته‌بندی</th>
                    <th className="px-5 py-4">قیمت</th>
                    <th className="px-5 py-4">امتیاز</th>
                    <th className="px-5 py-4">عملیات</th>
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
                              alt={product.title}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          )}
                          <span className="font-semibold text-gray-700">
                            {product.title || "بدون نام"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {product.category}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#173D35]">
                        {Number(product.price).toLocaleString("fa-IR")} تومان
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {product.rating}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditForm(product)}
                            aria-label="ویرایش محصول"
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() => setDeleteId(product.id)}
                            aria-label="حذف محصول"
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
              حذف محصول
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              آیا مطمئن هستی که می‌خواهی این محصول را حذف کنی؟
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
              >
                بله، حذف شود
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 border-t border-gray-100 bg-white py-5 text-center text-xs text-gray-400">
        پنل مدیریت نیک‌مارکت
      </footer>
    </div>
  );
}

export default AdminProducts;
