
import {
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Home,
  Sparkles,
} from "lucide-react";

export const categories = [
  { title: "موبایل و دیجیتال", filter: "دیجیتال", icon: Smartphone },
  { title: "لپ‌تاپ و کامپیوتر", filter: "دیجیتال", icon: Laptop },
  { title: "مد و پوشاک", filter: "پوشاک", icon: Shirt },
  { title: "ساعت و اکسسوری", filter: "اکسسوری", icon: Watch },
  { title: "خانه و آشپزخانه", filter: "همه", icon: Home },
  { title: "زیبایی و سلامت", filter: "همه", icon: Sparkles },
];

export const products = [
  {
    id: 1,
    name: "هدفون بی‌سیم مدل Premium Pro",
    category: "دیجیتال",
    price: 2450000,
    oldPrice: 2990000,
    discount: 18,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
  },
  {
    id: 2,
    name: "ساعت هوشمند سری جدید",
    category: "اکسسوری",
    price: 3890000,
    oldPrice: 4500000,
    discount: 14,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    id: 3,
    name: "کفش اسپرت روزمره",
    category: "پوشاک",
    price: 1850000,
    oldPrice: 2200000,
    discount: 16,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
  {
    id: 4,
    name: "عینک آفتابی کلاسیک",
    category: "اکسسوری",
    price: 1250000,
    oldPrice: 1500000,
    discount: 17,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
  },
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " افغانی";
};
