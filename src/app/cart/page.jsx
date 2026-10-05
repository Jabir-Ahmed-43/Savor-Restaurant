// app/cart/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  const taxRate = 0.08;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + taxAmount;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-zinc-50">
        <div className="text-zinc-400 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-24 h-24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-serif text-zinc-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-zinc-600 mb-8 text-center max-w-md">
          Looks like you haven&apos;t added any delicious dishes to your order
          yet.
        </p>
        <Link
          href="/menu"
          className="px-8 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors"
        >
          Browse the Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 xl:px-12 max-w-screen-xl mx-auto bg-zinc-50">
      <h1 className="text-4xl font-serif text-zinc-900 mb-10">Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row bg-white p-4 rounded-xl shadow-sm border border-zinc-100 gap-6 items-center sm:items-start"
            >
              {/* Item Image */}
              <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-zinc-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 128px"
                  className="object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 flex flex-col w-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-zinc-500">{item.category}</p>
                  </div>
                  <span className="text-lg font-bold text-zinc-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-end mt-auto pt-4">
                  <div className="flex items-center space-x-2 text-zinc-600">
                    <span className="text-sm">Qty:</span>
                    <span className="font-semibold">{item.quantity}</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100 sticky top-28">
            <h2 className="text-2xl font-serif text-zinc-900 mb-6 pb-4 border-b border-zinc-100">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium text-zinc-900">
                  ${taxAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 pt-4 border-t border-zinc-100">
              <span className="text-lg font-bold text-zinc-900">Total</span>
              <span className="text-2xl font-bold text-amber-600">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-zinc-900 text-white font-medium py-4 px-4 rounded-lg hover:bg-amber-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
