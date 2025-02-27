import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function ProductListPage() {
  const [products, setProducts] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true); // New state for tracking loading
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("q") || "";
  const categoryQuery = new URLSearchParams(location.search).get("category") || "";

  useEffect(() => {
    let apiUrl = "https://dummyjson.com/products";

    if (categoryQuery) {
      apiUrl = `https://dummyjson.com/products/category/${categoryQuery}`; // ✅ Fixed issue
    }

    setLoading(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []); // Ensure products array is set
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Set an empty array on error
        setLoading(false);
      });
  }, [categoryQuery]); // ✅ Correct dependency

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="p-4 h-screen">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="dark:text-[#00FF9C] text-[#750E21] dark:hover:text-red-500 hover:text-slate-900">
        <MoveLeft size={44} />
      </button>

      <h1 className="text-4xl font-bold dark:text-[#00FF9C] text-red-900 text-center m-6 mb-12">
        {categoryQuery
          ? `Category: ${categoryQuery}`
          : `Search Results for "${searchQuery}"`}
      </h1>

      {/* Show "Loading..." while fetching data */}
      {loading ? (
        <p className="text-3xl mt-5 text-center dark:text-white text-[#872341]">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-2xl text-center dark:text-white text-slate-950">No products found.</p>
      ) : (
        <div className="flex gap-8 flex-wrap md:max-w-[1600px] items-center justify-center mx-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 dark:border-white border-2 border-[#750E21] rounded-lg dark:shadow-2xl shadow-lg w-[500px]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-[400px] w-full object-contain mb-2 rounded-md"
              />
              <div className="flex flex-col mb-3">
                <h2 className="text-2xl font-semibold dark:text-orange-400 text-[#750E21]">
                  {product.title}
                </h2>
                <b className="dark:text-white  text-[#AE445A]  mt-4 text-lg">{product.brand}</b>
                <div className="mt-3 flex justify-between">
                  <p className="dark:text-white text-[#AE445A] text-xl">${product.price}</p>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="dark:text-[#00FF9C] text-[#750E21]  hover:underline text-xl"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
