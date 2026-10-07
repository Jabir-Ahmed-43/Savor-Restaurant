"use client";
import Image from "next/image";
import Link from "next/link"; // 1. Import Link
import { useCart } from "../../context/CartContext";

const ItemCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-zinc-200">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-zinc-900 pr-4">{item.name}</h3>
          <span className="text-xl font-bold text-amber-600 shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-zinc-600 mb-6 text-sm leading-relaxed flex-1">
          {item.description}
        </p>

        {item.dietary?.length > 0 && (
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

        {/* 2. Wrap buttons in a flex container */}
        <div className="mt-auto flex gap-3">
          <Link
            href={`/menu/${item._id}`}
            className="flex-1 bg-zinc-100 text-zinc-800 font-medium py-3 px-2 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center text-sm"
          >
            See Details
          </Link>

          <button
            className="flex-[1.2] bg-zinc-900 text-white font-medium py-3 px-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-1.5 text-sm"
            onClick={() => addToCart(item)}
          >
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
