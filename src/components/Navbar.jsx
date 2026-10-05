// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { totalItems } = useCart();

  return (
    <nav className="fixed w-full z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-serif font-bold text-white tracking-widest uppercase"
            >
              Savor
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-zinc-300 hover:text-amber-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-zinc-300 hover:text-amber-500 transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              href="/login"
              className="text-zinc-300 hover:text-amber-500 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/reservations"
              className="px-5 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
            >
              Reservations
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Existing links... */}

            {/* New Cart Icon Link */}
            <Link
              href="/cart"
              className="relative p-2 text-zinc-300 hover:text-amber-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {/* Only show the badge if there are items in the cart */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
            <Link
              href="/"
              onClick={toggleMenu}
              className="block px-3 py-3 text-base font-medium text-zinc-300 hover:text-amber-500 w-full text-center"
            >
              Home
            </Link>
            <Link
              href="/menu"
              onClick={toggleMenu}
              className="block px-3 py-3 text-base font-medium text-zinc-300 hover:text-amber-500 w-full text-center"
            >
              Menu
            </Link>
            <Link
              href="/reservations"
              onClick={toggleMenu}
              className="block mt-4 px-5 py-3 text-base font-medium bg-amber-600 text-white rounded-md hover:bg-amber-700 w-[90%] text-center"
            >
              Reservations
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
