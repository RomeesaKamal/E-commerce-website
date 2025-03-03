import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HamburgerIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Categories list (formatted correctly for the API)
  const categories = [
    { name: "Smartphones", value: "smartphones" },
    { name: "Laptops", value: "laptops" },
    { name: "Fragrances", value: "fragrances" },
    { name: "Skincare", value: "skincare" },
    { name: "Groceries", value: "groceries" },
    { name: "Home Decoration", value: "home-decoration" },
    { name: "Furniture", value: "furniture" },
    { name: "Tops", value: "tops" },
    { name: "Women's Dresses", value: "womens-dresses" },
    { name: "Women's Shoes", value: "womens-shoes" },
    { name: "Men's Shirts", value: "mens-shirts" },
    { name: "Men's Shoes", value: "mens-shoes" },
    { name: "Men's Watches", value: "mens-watches" },
    { name: "Women's Watches", value: "womens-watches" },
    { name: "Women's Bags", value: "womens-bags" },
    { name: "Women's Jewellery", value: "womens-jewellery" },
    { name: "Sunglasses", value: "sunglasses" },
    { name: "Automotive", value: "automotive" },
    { name: "Motorcycle", value: "motorcycle" },
    { name: "Lighting", value: "lighting" },
  ];

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <nav className="dark:bg-gray-900 bg-slate-200 shadow-2xl text-white relative">
      <div className="flex justify-between md:p-0 p-4 items-center max-w-6xl mx-auto">
        {/* ✅ Logo (Always Visible) */}
        <h4 className="text-3xl font-mono dark:text-white text-slate-900 font-extrabold flex md:hidden">
          <ShoppingBasket
            size={32}
            className="mr-3 dark:text-[#FB9237] text-red-900"
          />
          Eazy<span className="dark:text-orange-400 text-red-900">Buy</span>
        </h4>

        {/* ✅ Hamburger Button (Changes to Close Icon) */}
        <button
          className="block md:hidden dark:text-white text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* ✅ Blur Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition-all"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ✅ Mobile Menu (80% Width) */}
      <div
        className={`fixed top-0 right-0 w-4/5 h-full bg-white dark:bg-slate-900 shadow-2xl p-6 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ✅ Close Button inside Menu */}
        <div className="flex justify-between items-center">
          {/* ✅ Logo inside Menu */}
          <h4 className="text-2xl font-mono font-extrabold flex text-slate-900 dark:text-white">
            <ShoppingBasket
              size={28}
              className="mr-2 dark:text-[#FB9237] text-red-900"
            />
            Eazy<span className="dark:text-orange-400 text-red-900">Buy</span>
          </h4>

          <button
            className="text-gray-700 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>
        </div>

        {/* ✅ Profile Picture */}
        <div className="flex justify-center my-6">
          <a
            href="https://romeesakamal.github.io/RK-professional-portfolio/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/Assets/girl.jpg"
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 dark:border-white border-slate-900 hover:border-red-900 dark:hover:border-[#00FF9C] transition-all shadow-lg"
            />
          </a>
        </div>

        {/* ✅ Category Heading */}
        <h3 className="text-center text-lg font-semibold text-gray-800 y-700 dark:text-gray-200 mb-4">
          ✨ Choose What Interests You ✨
        </h3>

        {/* ✅ Categories List (Scrollable) */}
        <ul className="space-y-3 py-5 text-lg font-semibold max-h-[60vh] overflow-y-auto">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center dark:text-white text-gray-800 justify-between p-3 dark:hover:text-[#00FF9C] hover:text-red-900 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              onClick={() => {
                navigate(`/products?category=${category.value}`);
                setIsOpen(false); // Close menu on category click
              }}
            >
              <span>
                {index + 1}. {category.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
