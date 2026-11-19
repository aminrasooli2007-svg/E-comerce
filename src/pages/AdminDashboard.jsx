
import { Link } from "react-router";
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
  ArrowUpLeft,
  ArrowUpRight,
  Store,
  TrendingUp,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useShopStore from "../store/useShopStore";

function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  const dir = isEnglish ? "ltr" : "rtl";

  const products = useShopStore((state) => state.products);
  const cart = useShopStore((state) => state.cart);

  const menuItems = [
    {
      title: t("dashboardOverview"),
      path: "/admin",
      icon: LayoutDashboard,
      active: true,
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

  const stats = [
    {
      title: t("dashboardTotalProducts"),
      value: products.length,
      icon: Package,
      description: t("dashboardRegisteredProducts"),
    },
    {
      title: t("dashboardCartItems"),
      value: cart.reduce((total, item) => total + Number(item.quantity || 1), 0),
      icon: ShoppingCart,
      description: t("dashboardCartDescription"),
    },
    {
      title: t("dashboardCategoriesCount"),
      value: new Set(products.map((product) => product.category)).size,
      icon: Tags,
      description: t("dashboardActiveCategories"),
    },
    {
      title: t("dashboardDiscountedProducts"),
      value: products.filter((product) => Number(product.discount) > 0).length,
      icon: TrendingUp,
      description: t("dashboardDiscountDescription"),
    },
  ];

  const formatNumber = (number) =>
    Number(number).toLocaleString(isEnglish ? "en-US" : "fa-IR");

  const ArrowIcon = isEnglish ? ArrowUpRight : ArrowUpLeft;
  const DirectionIcon = isEnglish ? ChevronRight : ChevronLeft;

  return (
    <div dir={dir} className="min-h-screen bg-[#F5F3EE] lg:flex">
      <aside className="w-full border-b border-gray-100 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-e lg:border-gray-100">
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

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    item.active
                      ? "bg-[#173D35] text-white"
                      : "text-gray-600 hover:bg-[#F5F3EE] hover:text-[#173D35]"
                  }`}
                >
                  <Icon size={19} />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden px-5 lg:absolute lg:bottom-6 lg:block lg:w-full">
          <Link
            to="/"
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 text-sm font-semibold text-gray-600 transition hover:border-[#173D35] hover:text-[#173D35]"
          >
            {t("dashboardBackToStore")}
            <ArrowIcon size={18} />
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-7 sm:px-7 lg:px-10">
        <header className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-400">
              {t("dashboardWelcome")}
            </p>
            <h1 className="text-2xl font-black text-[#173D35] sm:text-3xl">
              {t("dashboardTitle")}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {t("dashboardDescription")}
            </p>
          </div>

          <Link
            to="/admin/products"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#173D35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#245448]"
          >
            <Package size={18} />
            {t("dashboardManageProducts")}
          </Link>
        </header>

        <section className="mb-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-xl bg-[#F5F3EE] p-3 text-[#173D35]">
                    <Icon size={22} />
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {t("dashboardStatistics")}
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-black text-[#173D35]">
                  {formatNumber(stat.value)}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-[#173D35]">
                  {t("dashboardSalesOverview")}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  {t("dashboardSalesComingSoon")}
                </p>
              </div>
              <span className="rounded-xl bg-[#F5F3EE] p-3 text-[#173D35]">
                <TrendingUp size={21} />
              </span>
            </div>

            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#FAF9F6] px-5 text-center">
              <TrendingUp size={35} className="mb-4 text-[#D8B98C]" />
              <p className="font-bold text-gray-600">
                {t("dashboardChartPlaceholder")}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-gray-400">
                {t("dashboardChartDescription")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-xl bg-[#F5F3EE] p-3 text-[#173D35]">
                <Clock3 size={21} />
              </span>
              <div>
                <h2 className="font-black text-[#173D35]">
                  {t("dashboardRecentOrders")}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  {t("dashboardOrderStatus")}
                </p>
              </div>
            </div>

            <div className="flex min-h-48 flex-col items-center justify-center text-center">
              <ShoppingCart size={34} className="mb-4 text-gray-300" />
              <p className="font-semibold text-gray-500">
                {t("dashboardNoOrders")}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {t("dashboardOrdersComingSoon")}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#173D35]">
                {t("dashboardQuickAccess")}
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                {t("dashboardQuickAccessDescription")}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {menuItems.slice(1).map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-[#D8B98C] hover:bg-[#FAF9F6]"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#F5F3EE] p-2 text-[#173D35]">
                      <Icon size={19} />
                    </span>
                    <span className="text-sm font-bold text-gray-600">
                      {item.title}
                    </span>
                  </div>
                  <DirectionIcon
                    size={17}
                    className="text-gray-400 transition group-hover:text-[#173D35]"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mt-8 text-center text-xs text-gray-400">
          {t("adminFooter")}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
