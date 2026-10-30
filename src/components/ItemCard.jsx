"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

const ItemCard = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const isSoldOut = item.isAvailable === false;
  const itemId = item._id || item.id;
  const imageSrc =
    item.image && item.image.trim() !== "" ? item.image : fallbackImage;
  const priceDisplay = Number(item.price || 0).toFixed(2);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-zinc-200">
        <Image
          src={imageSrc}
          alt={item.name || "Menu item"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold tracking-wider uppercase px-4 py-1.5 rounded-full text-sm shadow-md">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-zinc-900 pr-4">{item.name}</h3>
          <span className="text-xl font-bold text-amber-600 shrink-0">
            ${priceDisplay}
          </span>
        </div>

        <p className="text-zinc-600 mb-6 text-sm leading-relaxed flex-1">
          {item.description}
        </p>

        {item.dietary && item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {item.dietary.map((diet) => (
              <span
                key={diet}
                className="text-[10px] uppercase tracking-wider font-semibold bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full"
              >
                {diet}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-3">
          <Link
            href={`/menu/${itemId}`}
            className="flex-1 bg-zinc-100 text-zinc-800 font-medium py-3 px-2 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center text-sm"
          >
            {isSoldOut ? "Sold Out" : "View Details"}
          </Link>

          <button
            className={`flex-[1.2] font-medium py-3 px-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm cursor-pointer ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-zinc-900 text-white hover:bg-amber-600"
            }`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
