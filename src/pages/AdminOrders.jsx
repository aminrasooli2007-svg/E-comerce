
import { useMemo, useState } from "react";
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
  Search,
  Eye,
  Trash2,
  X,
  Clock3,
  CheckCircle2,
  Truck,
  Ban,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import useShopStore from "../store/useShopStore";
import { formatPrice } from "../data/products";

function AdminOrders() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isEnglish = i18n.language === "en";
  const dir = isEnglish ? "ltr" : "rtl";

  const orders = useShopStore((state) => state.orders);
  const updateOrderStatus = useShopStore((state) => state.updateOrderStatus);
  const deleteOrder = useShopStore((state) => state.deleteOrder);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const ArrowIcon = isEnglish ? ArrowUpRight : ArrowUpLeft;

  const statusOptions = [
    {
      value: "pending",
      label: isEnglish ? "Pending" : "در انتظار تأیید",
      color: "bg-amber-50 text-amber-700",
    },
    {
      value: "processing",
      label: isEnglish ? "Processing" : "در حال پردازش",
      color: "bg-blue-50 text-blue-700",
    },
    {
      value: "shipped",
      label: isEnglish ? "Shipped" : "ارسال‌شده",
      color: "bg-purple-50 text-purple-700",
    },
    {
      value: "delivered",
      label: isEnglish ? "Delivered" : "تحویل‌شده",
      color: "bg-green-50 text-green-700",
    },
    {
      value: "cancelled",
      label: isEnglish ? "Cancelled" : "لغوشده",
      color: "bg-red-50 text-red-700",
    },
  ];

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

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        String(order.id).toLowerCase().includes(searchValue) ||
        String(order.user?.email || "").toLowerCase().includes(searchValue);

      const matchesFilter = filter === "all" || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const getStatus = (status) =>
    statusOptions.find((item) => item.value === status) || statusOptions[0];

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      isEnglish ? "en-US" : "fa-IR",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((total, order) => total + Number(order.totalPrice || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const handleDelete = () => {
    if (!showDeleteModal) return;

    deleteOrder(showDeleteModal);

    if (selectedOrder?.id === showDeleteModal) {
      setSelectedOrder(null);
    }

    setShowDeleteModal(null);
  };

  const selectClassName =
    "rounded-xl border border-gray-200 bg-[#FAF9F6] px-4 py-3 text-sm text-[#292D2A] outline-none transition focus:border-[#173D35] focus:ring-2 focus:ring-[#173D35]/10";

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
            <ArrowIcon size={18} />
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-7 sm:px-7 lg:px-10">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-400">
            {t("dashboardManagement")}
          </p>

          <h1 className="text-2xl font-black text-[#173D35] sm:text-3xl">
            {isEnglish ? "Order Management" : "مدیریت سفارش‌ها"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEnglish
              ? "View and manage all registered customer orders."
              : "تمام سفارش‌های ثبت‌شده مشتریان را مشاهده و مدیریت کن."}
          </p>
        </header>

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: isEnglish ? "Total Orders" : "کل سفارش‌ها",
              value: orders.length,
              icon: ShoppingCart,
            },
            {
              title: isEnglish ? "Pending Orders" : "در انتظار تأیید",
              value: pendingOrders,
              icon: Clock3,
            },
            {
              title: isEnglish ? "Delivered Orders" : "سفارش‌های تحویل‌شده",
              value: deliveredOrders,
              icon: CheckCircle2,
            },
            {
              title: isEnglish ? "Total Revenue" : "مجموع فروش",
              value: formatPrice(totalRevenue),
              icon: Truck,
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <span className="mb-4 inline-flex rounded-xl bg-[#F5F3EE] p-3 text-[#173D35]">
                  <Icon size={22} />
                </span>

                <p className="text-sm text-gray-500">{stat.title}</p>

                <p className="mt-2 text-xl font-black text-[#173D35]">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString(isEnglish ? "en-US" : "fa-IR")
                    : stat.value}
                </p>
              </div>
            );
          })}
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#173D35]">
                {isEnglish ? "Orders List" : "لیست سفارش‌ها"}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {isEnglish
                  ? `${filteredOrders.length} orders found`
                  : `${filteredOrders.length.toLocaleString("fa-IR")} سفارش پیدا شد`}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isEnglish ? "left-3" : "right-3"
                  }`}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={
                    isEnglish
                      ? "Search order or email..."
                      : "جستجوی شماره سفارش یا ایمیل..."
                  }
                  className={`w-full rounded-xl border border-gray-200 bg-[#FAF9F6] py-3 text-sm outline-none transition focus:border-[#173D35] sm:w-72 ${
                    isEnglish ? "pl-10 pr-4" : "pr-10 pl-4"
                  }`}
                />
              </div>

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className={selectClassName}
              >
                <option value="all">
                  {isEnglish ? "All Orders" : "تمام سفارش‌ها"}
                </option>

                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <ShoppingCart size={42} className="mb-4 text-gray-300" />

              <p className="font-bold text-gray-500">
                {isEnglish ? "No orders found" : "هیچ سفارشی پیدا نشد"}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                {isEnglish
                  ? "Orders will appear here after customers complete checkout."
                  : "بعد از ثبت سفارش توسط مشتری، اطلاعات آن در این بخش نمایش داده می‌شود."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400">
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Order ID" : "شماره سفارش"}
                    </th>
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Customer" : "مشتری"}
                    </th>
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Date" : "تاریخ"}
                    </th>
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Total" : "مبلغ کل"}
                    </th>
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Status" : "وضعیت"}
                    </th>
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Actions" : "عملیات"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => {
                    const status = getStatus(order.status);

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-gray-50 last:border-0 hover:bg-[#FAF9F6]"
                      >
                        <td className="px-4 py-5 font-bold text-[#173D35]">
                          {order.id}
                        </td>
                        <td className="px-4 py-5 text-gray-600">
                          {order.user?.email || "-"}
                        </td>
                        <td className="px-4 py-5 text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-4 py-5 font-bold text-[#173D35]">
                          {formatPrice(order.totalPrice)}
                        </td>
                        <td className="px-4 py-5">
                          <span className={`inline-flex rounded-lg px-3 py-2 text-xs font-bold ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="rounded-lg bg-[#F5F3EE] p-2 text-[#173D35] transition hover:bg-[#EAE6DC]"
                              aria-label={isEnglish ? "View order" : "مشاهده سفارش"}
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              onClick={() => setShowDeleteModal(order.id)}
                              className="rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                              aria-label={isEnglish ? "Delete order" : "حذف سفارش"}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#173D35]">
                  {isEnglish ? "Order Details" : "جزئیات سفارش"}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
                aria-label={isEnglish ? "Close" : "بستن"}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 grid gap-4 rounded-xl bg-[#FAF9F6] p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-400">
                  {isEnglish ? "Customer" : "مشتری"}
                </p>
                <p className="mt-2 break-all text-sm font-bold text-gray-700">
                  {selectedOrder.user?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  {isEnglish ? "Order Date" : "تاریخ سفارش"}
                </p>
                <p className="mt-2 text-sm font-bold text-gray-700">
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
            </div>

            <h3 className="mb-4 font-bold text-[#173D35]">
              {isEnglish ? "Products" : "محصولات سفارش"}
            </h3>

            <div className="space-y-3">
              {(selectedOrder.items || []).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-gray-700">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {isEnglish
                        ? `Quantity: ${item.quantity}`
                        : `تعداد: ${item.quantity}`}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-[#173D35]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
              <span className="font-bold">
                {isEnglish ? "Total Amount" : "مبلغ کل"}
              </span>
              <span className="text-lg font-black text-[#173D35]">
                {formatPrice(selectedOrder.totalPrice)}
              </span>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-sm font-bold text-gray-700">
                {isEnglish ? "Update Order Status" : "تغییر وضعیت سفارش"}
              </label>

              <select
                value={selectedOrder.status}
                onChange={(event) => {
                  const newStatus = event.target.value;

                  updateOrderStatus(selectedOrder.id, newStatus);

                  setSelectedOrder((current) => ({
                    ...current,
                    status: newStatus,
                  }));
                }}
                className={`${selectClassName} w-full`}
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-xl bg-red-50 p-3 text-red-500">
                <Ban size={22} />
              </span>
              <h2 className="font-black text-gray-800">
                {isEnglish ? "Delete Order" : "حذف سفارش"}
              </h2>
            </div>

            <p className="text-sm leading-7 text-gray-500">
              {isEnglish
                ? "Are you sure you want to delete this order?"
                : "آیا مطمئنی که می‌خواهی این سفارش را حذف کنی؟"}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-600"
              >
                {isEnglish ? "Cancel" : "انصراف"}
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600"
              >
                {isEnglish ? "Delete" : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
