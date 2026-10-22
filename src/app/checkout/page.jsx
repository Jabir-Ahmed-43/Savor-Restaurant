// app/checkout/page.jsx
"use client";

import { submitOrder } from "@/app/actions/orderActions";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalPrice } = useCart(); // Note: You will need a clearCart function here later!
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate final price with 8% tax
  const finalTotal = totalPrice + totalPrice * 0.08;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Gather form data
    const formData = new FormData(e.target);
    const customerDetails = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      notes: formData.get("notes"),
    };

    // 2. Send to MongoDB via Server Action
    const response = await submitOrder(
      customerDetails,
      cartItems,
      finalTotal,
      session?.user?.email,
    );

    if (response.success) {
      // In a full app, you would call clearCart() here to empty the context
      alert("Order placed successfully! The kitchen is preparing your food.");
      // clearCart();
      router.push("/");
    }
  };

  // Prevent checkout if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl text-zinc-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-serif text-zinc-900 mb-8">Checkout</h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200">
        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Delivery Address
            </label>
            <input
              type="text"
              name="address"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Kitchen Notes (Optional)
            </label>
            <textarea
              name="notes"
              rows="2"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
            <div className="text-xl font-bold text-zinc-900">
              Total: ${finalTotal.toFixed(2)}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
