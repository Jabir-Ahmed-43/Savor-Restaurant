// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
