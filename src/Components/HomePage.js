import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../Components/ThemeToggle.js";
import { ShoppingCart, Search, ShoppingBasket, Trash2 } from "lucide-react";
import { useCart } from "../Components/Cart"; // Import useCart hook

export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart(); // Get cart data & remove function
  const [isCartOpen, setIsCartOpen] = useState(false); // Toggle cart popup
  const cartRef = useRef(null);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?q=${search}`);
    }
  };

  // Close popup when clicking outside (optional)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dark:shadow-xl shadow-lg h-24 dark:text-white dark:bg-slate-900 bg-slate-200 relative">
      {/* Navbar */}
      <div className="flex md:flex-row flex-col items-center pt-5 justify-between max-w-[1750px] mx-auto">
        <h4 className="text-3xl font-mono font-extrabold md:flex hidden">
          <ShoppingBasket
            size={32}
            className="mr-3 dark:text-[#FB9237] text-red-900"
          />
          Eazy<span className="dark:text-orange-400 text-red-900">Buy</span>
        </h4>

        <div className="flex md:w-[75%] sm:w-[95%] w-full justify-between px-3 sm:px-0 sm:gap-16 gap-6">
          {/* Search Bar */}
          <div className="flex md:w-[60%] sm:w-[90%] w-full bg-white rounded-md">
          <button
              onClick={handleSearch}
              className="px-4 py-2 bg-white font-extra-bold rounded-md flex items-center justify-center"
            >
              <Search size={24} className="text-slate-900" />
            </button>
            <input
              type="text"
              className="w-full p-2 rounded-md text-slate-800 font-semibold text-lg outline-none"
              placeholder="Search here.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              required
            />
           
          </div>

          {/* Categories Dropdown */}
          <select
            name="categories"
            id="categories"
            className="dark:bg-slate-900 bg-slate-200 font-semibold text-xl dark:hover:text-[#00FF9C]  hover:text-red-900 md:block hidden"
            onChange={(e) => navigate(`/products?category=${e.target.value}`)}
          >
            <option value="">Select Category</option>
            <option value="smartphones">Smartphones 📱</option>
            <option value="laptops">Laptops 💻</option>
            <option value="fragrances">Fragrances 🌸</option>
            <option value="skincare">Skincare 💆‍♀️</option>
            <option value="groceries">Groceries 🛒</option>
            <option value="home-decoration">Home Decoration 🏠</option>
            <option value="furniture">Furniture 🛋️</option>
            <option value="tops">Tops 👚</option>
            <option value="womens-dresses">Women's Dresses 👗</option>
            <option value="womens-shoes">Women's Shoes 👠</option>
            <option value="mens-shirts">Men's Shirts 👕</option>
            <option value="mens-shoes">Men's Shoes 👞</option>
            <option value="mens-watches">Men's Watches ⌚</option>
            <option value="womens-watches">Women's Watches ⌚</option>
            <option value="womens-bags">Women's Bags 👜</option>
            <option value="womens-jewellery">Women's Jewellery 💍</option>
            <option value="sunglasses">Sunglasses 🕶️</option>
            <option value="automotive">Automotive 🚗</option>
            <option value="motorcycle">Motorcycle 🏍️</option>
            <option value="lighting">Lighting 💡</option>
          </select>

          <ThemeToggle />

          {/* Cart Icon with Badge */}
          <div
            className="relative sm:p-2 p-1"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart
              size={32}
              className="cursor-pointer dark:hover:text-[#00FF9C] hover:text-red-900"
            />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <a
          href="https://romeesakamal.github.io/RK-professional-portfolio/"
          target="_blank"
          rel="noreferrer"
          className="md:flex hidden"
        >
          <img
            src="/Assets/girl.jpg"
            alt="Profile"
            className="h-12 w-12 rounded-full border-[3px] dark:border-white hover:border-red-900 border-slate-900 dark:hover:border-[#00FF9C] "
          />
        </a>
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <div
          ref={cartRef}
          className="absolute top-20 right-10 dark:bg-white bg-[#474E68] dark:text-slate-900 text-white  shadow-lg p-5 w-[300px] rounded-lg z-50"
        >
          <h2 className="text-lg font-bold border-b pb-2">Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 mt-2">Your cart is empty.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-12 w-12 object-contain"
                  />
                  <div className="flex-1 ml-2">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-sm dark:text-gray-700 text-yellow-500">
                      ${item.price}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item)}>
                    <Trash2
                      size={20}
                      className="dark:text-red-500 text-[#541212] hover:text-red-700"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Close Cart Button */}
          <button
            onClick={() => setIsCartOpen(false)}
            className="mt-3 w-full dark:bg-red-500 bg-red-700 text-white py-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700"
          >
            Close Cart
          </button>
        </div>
      )}
    </div>
  );
}
