import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Components/Cart";
import { MoveLeft, ShoppingCart, Check } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false); // Track if the product is added

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000); // Reset after 3 seconds (optional)
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product)
    return <p className="text-center text-3xl mt-8 dark:text-white text-red-950">Loading...</p>;

  return (
    <div className="p-4 h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="dark:text-[#00FF9C] hover:text-red-950 dark:hover:text-red-400 text-slate-900"
      >
        <MoveLeft size={44} />
      </button>

      <div className="rounded-lg dark:p-4 p-5 flex-col md:flex-row flex gap-16 items-center max-w-4xl mx-auto justify-center mt-28 dark:shadow-2xl shadow-lg border-4 dark:border-white border-[#872341] w-full sm:w-2/3">
        <div className="w-1/2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="sm:h-[500px] h-full w-full object-contain rounded-md"
          />
        </div>
        <div className="md:w-[600px] p-5 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold dark:text-red-500 text-[#872341] m-0 ">
            {product.title}
          </h1>
          <h4 className="text-lg dark:text-gray-200 text-gray-800">
            Brand:{" "}
            <span className="dark:text-[#00FF9C] text-[#872341] font-bold text-xl pl-2">
              {product.brand}
            </span>
          </h4>
          <h4 className="dark:text-white text-gray-800 text-lg ">
            Price:{" "}
            <span className="dark:text-[#00FF9C] text-[#872341] font-bold text-xl pl-2">
              ${product.price}
            </span>
          </h4>
          <p className="text-gray-400  text-base">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className={`mt-6 px-4 py-2 text-center dark:text-red-950 text-white rounded justify-center transition duration-300 text-xl font-bold flex items-center gap-2 ${
              added
                ? "dark:bg-red-500 bg-red-900 text-white cursor-not-allowed"
                : "dark:bg-[#00FF9C] bg-[#872341] text-black dark:hover:bg-red-200 hover:bg-slate-900"
            }`}
            disabled={added} // Disable button when added
          >
            <ShoppingCart size={28} />
            {added ? "Added to Cart" : "Add to Cart"}
            {added && <Check size={28} className="font-extrabold" />} {/* Tick icon after text */}
          </button>
        </div>
      </div>
    </div>
  );
}
