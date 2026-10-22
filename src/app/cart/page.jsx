// app/cart/page.jsx
"use client";

import { submitOrder } from "@/app/actions/orderActions"; // Import the Server Action
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  // UI States
  const [isOrdered, setIsOrdered] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeTotal = Number(totalPrice) || 0;
  const taxRate = 0.08;
  const taxAmount = safeTotal * taxRate;
  const finalTotal = safeTotal + taxAmount;

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const customerDetails = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      notes: "Submitted via Quick Checkout",
    };

    const response = await submitOrder(customerDetails, cartItems, finalTotal);

    if (response.success) {
      setIsOrdered(true);
      clearCart();
    }
  };
  if (isOrdered) {
    return (
      <main className="min-h-[75vh] py-20 px-4 flex flex-col items-center justify-center bg-zinc-50">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
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
        </div>
        <h2 className="text-3xl font-serif text-zinc-900 mb-3">
          Order Received!
        </h2>
        <p className="text-zinc-600 mb-8 text-center max-w-md">
          Thank you for choosing Savor! Our kitchen has received your order and
          is preparing it with passion.
        </p>
        <Link
          href="/menu"
          className="px-8 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors shadow-sm"
        >
          Order More Dishes
        </Link>
      </main>
    );
  }

  // Empty State
  if (cartItems.length === 0) {
    return (
      <main className="min-h-[75vh] py-20 px-4 flex flex-col items-center justify-center bg-zinc-50">
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
          className="px-8 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors shadow-sm"
        >
          Browse the Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 xl:px-12 max-w-7xl mx-auto bg-zinc-50">
      <h1 className="text-4xl font-serif text-zinc-900 mb-10">Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map((item) => {
            const itemId = item._id || item.id;
            const itemPrice = Number(item.price) || 0;
            const itemQty = Number(item.quantity) || 1;
            const itemImage =
              item.image && item.image.trim() !== ""
                ? item.image
                : fallbackImage;

            return (
              <div
                key={itemId}
                className="flex flex-col sm:flex-row bg-white p-4 rounded-xl shadow-sm border border-zinc-100 gap-6 items-center sm:items-start"
              >
                <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-zinc-200">
                  <Image
                    src={itemImage}
                    alt={item.name || "Menu item"}
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col w-full h-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900">
                        {item.name}
                      </h3>
                      {item.category && (
                        <p className="text-sm text-zinc-500">{item.category}</p>
                      )}
                    </div>
                    <span className="text-lg font-bold text-zinc-900">
                      ${(itemPrice * itemQty).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-4">
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(itemId, itemQty - 1)}
                        className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      </button>

                      <span className="w-10 text-center font-semibold text-zinc-900 text-sm border-x border-zinc-200">
                        {itemQty}
                      </span>

                      <button
                        onClick={() => updateQuantity(itemId, itemQty + 1)}
                        className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemId)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100 sticky top-28">
            {!isCheckingOut ? (
              <>
                <h2 className="text-2xl font-serif text-zinc-900 mb-6 pb-4 border-b border-zinc-100">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6 text-zinc-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900">
                      ${safeTotal.toFixed(2)}
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
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-zinc-900 text-white font-medium py-4 px-4 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer shadow-sm hover:shadow"
                >
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-100">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-zinc-500 hover:text-zinc-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </button>
                  <h2 className="text-xl font-serif text-zinc-900">
                    Delivery Details
                  </h2>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>{" "}
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-100">
                  <span className="text-lg font-bold text-amber-600">
                    ${finalTotal.toFixed(2)}
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {isSubmitting ? "Sending..." : "Confirm Order"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
