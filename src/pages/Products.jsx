
import { useState } from "react";
import { Search } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/common/ProductCard";
import useShopStore from "../store/useShopStore";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");
  const products = useShopStore((state) => state.products);

  const filteredProducts = products.filter((product) => {
    const productName = String(product.name ?? product.title ?? "");
    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "همه" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <Header search={search} setSearch={setSearch} />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h1 className="text-2xl font-black">فروشگاه محصولات</h1>

        <p className="mt-2 text-sm text-gray-500">
          محصولات مورد نظرت را پیدا کن.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {["همه", "دیجیتال", "اکسسوری", "پوشاک"].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm ${
                category === item
                  ? "bg-[#173D35] text-white"
                  : "border border-[#EAE8E1] bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-3 text-gray-400" size={32} />
            <p className="font-bold">محصولی پیدا نشد.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Products;
