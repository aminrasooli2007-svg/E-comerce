import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route
          path="*"
          element={
            <div
              dir="rtl"
              className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F6]"
            >
              <h1 className="text-3xl font-black">
                صفحه پیدا نشد!
              </h1>

              <a
                href="/"
                className="mt-5 text-[#173D35] underline"
              >
                بازگشت به صفحه اصلی
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;