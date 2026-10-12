"use client";

import Link from "next/link";
import { useState } from "react";

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
    seating: "Dining Room",
    specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 xl:px-12 max-w-5xl mx-auto bg-zinc-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-4">
          Table Reservation
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-zinc-600 max-w-xl mx-auto text-lg">
          Join us for an unforgettable dining experience. Reserve your table in advance to secure your spot.
        </p>
      </div>

      {submitted ? (
        <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-serif text-zinc-900 mb-2">Reservation Confirmed!</h2>
          <p className="text-zinc-600 mb-6">
            Thank you, <span className="font-semibold text-zinc-900">{formData.name}</span>. We have reserved a table for you.
          </p>

          <div className="bg-zinc-50 rounded-xl p-6 text-left border border-zinc-100 space-y-3 mb-8">
            <div className="flex justify-between">
              <span className="text-zinc-500">Date & Time:</span>
              <span className="font-medium text-zinc-900">{formData.date || "Selected Evening"} at {formData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Party Size:</span>
              <span className="font-medium text-zinc-900">{formData.guests} Guests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Seating Area:</span>
              <span className="font-medium text-zinc-900">{formData.seating}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Confirmation Sent To:</span>
              <span className="font-medium text-zinc-900">{formData.email}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  guests: "2",
                  date: "",
                  time: "19:00",
                  seating: "Dining Room",
                  specialRequests: "",
                });
              }}
              className="px-6 py-3 bg-zinc-100 text-zinc-800 rounded-lg hover:bg-zinc-200 font-medium transition-colors cursor-pointer"
            >
              Make Another Reservation
            </button>
            <Link
              href="/menu"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-colors shadow-sm"
            >
              Explore Our Menu
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Party Size
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 bg-white"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6+ People</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Seating Area
                </label>
                <select
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 bg-white"
                >
                  <option value="Dining Room">Dining Room</option>
                  <option value="Outdoor Terrace">Outdoor Terrace</option>
                  <option value="Chef's Bar">Chef&apos;s Bar</option>
                  <option value="Private Wine Room">Private Wine Room</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 bg-white"
                >
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Special Requests or Dietary Notes
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                placeholder="Allergies, anniversaries, birthdays, or special seating requirements..."
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors cursor-pointer shadow-md text-lg disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? "Confirming Booking..." : "Confirm Table Reservation"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
