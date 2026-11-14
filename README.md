# 🛍️ Nik Market

### A Modern E-Commerce Experience Built with React

Nik Market is a modern and responsive e-commerce web application designed to provide users with a simple, smooth, and enjoyable online shopping experience.

The project is currently focused on building a complete frontend experience, with plans to integrate a powerful backend using Django REST Framework and PostgreSQL.

## ✨ Features

- 🏠 Modern homepage with a clean user interface
- 🛒 Shopping cart with quantity management
- ❤️ Wishlist functionality
- 🔍 Product listing and search
- 📦 Product detail pages
- 👤 Login and registration pages
- ⚙️ User settings page
- 🛠️ Admin dashboard for product management
- ➕ Add, edit, and delete products
- 💾 Persistent state management using Zustand
- 📱 Fully responsive design
- 🌐 Persian language and RTL layout support

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Development |
| Vite 7 | Development Environment |
| JavaScript | Application Logic |
| Tailwind CSS 4 | Styling |
| React Router 7 | Routing |
| Zustand 5 | State Management |
| Axios | HTTP Requests |
| Lucide React | Icons |
| Vazirmatn | Persian Typography |

## 🎨 Design System

Nik Market uses a minimal and elegant visual identity based on natural colors.

| Color | Hex |
|---|---|
| Dark Green | `#173D35` |
| Cream | `#F5F3EE` |
| Matte Gold | `#D8B98C` |
| Dark Gray | `#292D2A` |

## 📁 Project Structure

```text
src/
├── components/
│   ├── common/
│   │   └── ProductCard.jsx
│   └── layout/
│       ├── Header.jsx
│       └── Footer.jsx
├── data/
│   └── products.js
├── store/
│   └── useShopStore.js
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Wishlist.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Settings.jsx
│   └── AdminProducts.jsx
├── App.jsx
├── main.jsx
└── global.css
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd E-Commers
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🗺️ Roadmap

- [x] Initialize React and Vite project
- [x] Build the main storefront UI
- [x] Implement shopping cart
- [x] Implement wishlist
- [x] Create product detail pages
- [x] Build admin product management
- [x] Connect admin products to the storefront
- [ ] Implement real user authentication
- [ ] Build backend with Django REST Framework
- [ ] Integrate PostgreSQL database
- [ ] Develop RESTful APIs
- [ ] Implement order management
- [ ] Integrate payment functionality
- [ ] Improve admin dashboard

## 🔮 Future Plans

The next development phase will focus on backend integration, secure authentication, database management, and a complete order processing system.

## 👨‍💻 Developer

**Nik Market** is an ongoing personal project created to explore modern web development practices and build a full-stack e-commerce application.

---

<p align="center">
  <strong>Built with ❤️ using React</strong>
</p>

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>
