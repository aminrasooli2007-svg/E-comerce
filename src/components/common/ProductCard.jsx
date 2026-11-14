import { Link } from "react-router";
import { Heart, Star, Plus } from "lucide-react";

import useShopStore from "../../store/useShopStore";
import { formatPrice } from "../../data/products";

function ProductCard({ product }) {
  const favorites = useShopStore((state) => state.favorites);
  const addToCart = useShopStore((state) => state.addToCart);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  const isFavorite = favorites.includes(product.id);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#EAE8E1] bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-[#F4F3EF]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="absolute right-3 top-3 rounded-lg bg-[#173D35] px-2.5 py-1.5 text-xs font-bold text-white">
          {product.discount}٪ تخفیف
        </span>

        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition hover:text-red-500"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
            className={isFavorite ? "text-red-500" : ""}
          />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <span className="text-[10px] text-[#B89563]">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 min-h-10 text-xs font-bold leading-6 hover:text-[#B89563] sm:text-sm">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star
              size={13}
              className="fill-[#D8B98C] text-[#D8B98C]"
            />
            <span className="text-xs font-semibold">
              {product.rating}
            </span>
          </div>

          <span className="text-[10px] text-[#92958F]">
            موجود در انبار
          </span>
        </div>

        <div className="mt-4 border-t border-[#F0EFEA] pt-3">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-sm font-black">
              {formatPrice(product.price)}
            </span>

            <span className="text-[10px] text-[#A5A59E] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#173D35] py-3 text-xs font-bold text-white transition hover:bg-[#245A4E]"
          >
            <Plus size={16} />
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;