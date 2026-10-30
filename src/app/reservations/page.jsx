// app/reservations/page.jsx
"use client";

import { createReservation } from "@/app/actions/reservationActions";
import { useState } from "react";

export default function ReservationsPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    const result = await createReservation(formData);

    if (result.success) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-zinc-900 mb-4">Book a Table</h1>
        <p className="text-zinc-600">
          Reserve your spot for an unforgettable dining experience.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-green-50 text-green-800 p-8 rounded-xl text-center border border-green-200">
          <h2 className="text-2xl font-bold mb-2">Reservation Request Sent!</h2>
          <p>We have received your booking and will confirm shortly.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-green-700 underline font-medium"
          >
            Book another table
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Name
              </label>
              <input
                name="customerName"
                required
                className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Date
              </label>
              <input
                name="date"
                type="date"
                required
                className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Time
              </label>
              <input
                name="time"
                type="time"
                required
                className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Party Size
              </label>
              <select
                name="partySize"
                required
                className="w-full border border-zinc-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Person" : "People"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-zinc-900 text-white font-medium py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {status === "submitting" ? "Processing..." : "Request Reservation"}
          </button>

          {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </main>
  );
}
