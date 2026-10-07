// components/AddToCartButton.jsx
"use client";

import { useCart } from "../../context/CartContext";

export default function AddToCartButton({ item }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(item)}
      className="w-full sm:w-auto bg-zinc-900 text-white font-medium py-4 px-8 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 text-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      Add to Order
    </button>
  );
}
