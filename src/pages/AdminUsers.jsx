
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
  ShieldCheck,
  UserRound,
  Ban,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import useShopStore from "../store/useShopStore";

function AdminUsers() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isEnglish = i18n.language === "en";
  const dir = isEnglish ? "ltr" : "rtl";

  const users = useShopStore((state) => state.users);
  const currentUser = useShopStore((state) => state.user);
  const updateUserRole = useShopStore((state) => state.updateUserRole);
  const deleteUser = useShopStore((state) => state.deleteUser);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const ArrowIcon = isEnglish ? ArrowUpRight : ArrowUpLeft;

  const menuItems = [
    {
      title: t("dashboardOverview"),
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: t("dashboardProducts"),
      path: "/admin/products",
      icon: Package,
    },
    {
      title: t("dashboardOrders"),
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: t("dashboardUsers"),
      path: "/admin/users",
      icon: Users,
    },
    {
      title: t("dashboardCategories"),
      path: "/admin/categories",
      icon: Tags,
    },
    {
      title: t("dashboardCoupons"),
      path: "/admin/coupons",
      icon: TicketPercent,
    },
    {
      title: t("dashboardReviews"),
      path: "/admin/reviews",
      icon: Star,
    },
    {
      title: t("dashboardSettings"),
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  function isActive(path) {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname === path;
  }

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        String(user.name || "").toLowerCase().includes(searchValue) ||
        String(user.email || "").toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "all" || user.role === filter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  const adminCount = users.filter(
    (user) => user.role === "admin"
  ).length;

  const customerCount = users.filter(
    (user) => user.role !== "admin"
  ).length;

  function formatDate(date) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      isEnglish ? "en-US" : "fa-IR",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  }

  function getRoleLabel(role) {
    if (role === "admin") {
      return isEnglish ? "Admin" : "مدیر";
    }

    return isEnglish ? "Customer" : "کاربر";
  }

  function getRoleClass(role) {
    if (role === "admin") {
      return "bg-purple-50 text-purple-700";
    }

    return "bg-blue-50 text-blue-700";
  }

  function handleRoleChange(user, role) {
    if (user.id === currentUser?.id && role !== "admin") {
      return;
    }

    updateUserRole(user.id, role);

    setSelectedUser((current) =>
      current?.id === user.id
        ? { ...current, role }
        : current
    );
  }

  function handleDelete() {
    if (!showDeleteModal) {
      return;
    }

    if (showDeleteModal === currentUser?.id) {
      setShowDeleteModal(null);
      return;
    }

    deleteUser(showDeleteModal);

    if (selectedUser?.id === showDeleteModal) {
      setSelectedUser(null);
    }

    setShowDeleteModal(null);
  }

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
                      ? {
                          backgroundColor: "#173D35",
                          color: "#FFFFFF",
                        }
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
            {isEnglish ? "User Management" : "مدیریت کاربران"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEnglish
              ? "View and manage registered users and their roles."
              : "کاربران ثبت‌نام‌شده و نقش‌های آن‌ها را مشاهده و مدیریت کن."}
          </p>
        </header>

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: isEnglish ? "Total Users" : "کل کاربران",
              value: users.length,
              icon: Users,
            },
            {
              title: isEnglish ? "Customers" : "کاربران عادی",
              value: customerCount,
              icon: UserRound,
            },
            {
              title: isEnglish ? "Administrators" : "مدیران",
              value: adminCount,
              icon: ShieldCheck,
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

                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-xl font-black text-[#173D35]">
                  {stat.value.toLocaleString(
                    isEnglish ? "en-US" : "fa-IR"
                  )}
                </p>
              </div>
            );
          })}
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#173D35]">
                {isEnglish ? "Users List" : "لیست کاربران"}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {isEnglish
                  ? `${filteredUsers.length} users found`
                  : `${filteredUsers.length.toLocaleString("fa-IR")} کاربر پیدا شد`}
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
                      ? "Search name or email..."
                      : "جستجوی نام یا ایمیل..."
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
                  {isEnglish ? "All Users" : "تمام کاربران"}
                </option>

                <option value="user">
                  {isEnglish ? "Customers" : "کاربران عادی"}
                </option>

                <option value="admin">
                  {isEnglish ? "Administrators" : "مدیران"}
                </option>
              </select>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <Users size={42} className="mb-4 text-gray-300" />

              <p className="font-bold text-gray-500">
                {isEnglish ? "No users found" : "هیچ کاربری پیدا نشد"}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                {isEnglish
                  ? "Registered users will appear here."
                  : "کاربران ثبت‌نام‌شده در این بخش نمایش داده می‌شوند."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400">
                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "User" : "کاربر"}
                    </th>

                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Email" : "ایمیل"}
                    </th>

                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Role" : "نقش"}
                    </th>

                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Registration Date" : "تاریخ ثبت‌نام"}
                    </th>

                    <th className="px-4 py-4 text-start font-semibold">
                      {isEnglish ? "Actions" : "عملیات"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#FAF9F6]"
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F3EE] text-[#173D35]">
                            <UserRound size={19} />
                          </span>

                          <span className="font-bold text-gray-700">
                            {user.name || "-"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-5 text-gray-600">
                        {user.email || "-"}
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`inline-flex rounded-lg px-3 py-2 text-xs font-bold ${getRoleClass(user.role)}`}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </td>

                      <td className="px-4 py-5 text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="rounded-lg bg-[#F5F3EE] p-2 text-[#173D35] transition hover:bg-[#EAE6DC]"
                            aria-label={
                              isEnglish
                                ? "View user"
                                : "مشاهده کاربر"
                            }
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => setShowDeleteModal(user.id)}
                            disabled={user.id === currentUser?.id}
                            className="rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={
                              isEnglish
                                ? "Delete user"
                                : "حذف کاربر"
                            }
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

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#173D35]">
                  {isEnglish ? "User Details" : "جزئیات کاربر"}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {selectedUser.email}
                </p>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
                aria-label={isEnglish ? "Close" : "بستن"}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 space-y-4 rounded-xl bg-[#FAF9F6] p-4">
              <div>
                <p className="text-xs text-gray-400">
                  {isEnglish ? "Full Name" : "نام کامل"}
                </p>

                <p className="mt-2 text-sm font-bold text-gray-700">
                  {selectedUser.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  {isEnglish ? "Email Address" : "آدرس ایمیل"}
                </p>

                <p className="mt-2 break-all text-sm font-bold text-gray-700">
                  {selectedUser.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  {isEnglish ? "Registration Date" : "تاریخ ثبت‌نام"}
                </p>

                <p className="mt-2 text-sm font-bold text-gray-700">
                  {formatDate(selectedUser.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-gray-700">
                {isEnglish ? "Change User Role" : "تغییر نقش کاربر"}
              </label>

              <select
                value={selectedUser.role || "user"}
                onChange={(event) =>
                  handleRoleChange(selectedUser, event.target.value)
                }
                disabled={selectedUser.id === currentUser?.id}
                className={`${selectClassName} w-full disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <option value="user">
                  {isEnglish ? "Customer" : "کاربر عادی"}
                </option>

                <option value="admin">
                  {isEnglish ? "Administrator" : "مدیر"}
                </option>
              </select>

              {selectedUser.id === currentUser?.id && (
                <p className="mt-2 text-xs text-gray-400">
                  {isEnglish
                    ? "You cannot change your own role here."
                    : "نمی‌توانی نقش حساب فعلی خودت را از این بخش تغییر دهی."}
                </p>
              )}
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
                {isEnglish ? "Delete User" : "حذف کاربر"}
              </h2>
            </div>

            <p className="text-sm leading-7 text-gray-500">
              {isEnglish
                ? "Are you sure you want to delete this user? This action cannot be undone."
                : "آیا مطمئنی که می‌خواهی این کاربر را حذف کنی؟ این عملیات قابل بازگشت نیست."}
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
                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold !text-white hover:bg-red-600"
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

export default AdminUsers;
