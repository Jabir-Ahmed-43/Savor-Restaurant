// components/Navbar.jsx
"use client";

import { cookie } from "@/lib/fonts";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className={`${cookie.className} text-3xl font-serif font-bold text-white tracking-widest uppercase hover:text-amber-500 transition-colors`}
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
              href="/reservations"
              className="px-5 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium shadow-sm hover:shadow"
            >
              Reservations
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Icon Link */}
            <Link
              href="/cart"
              className="relative p-2 text-zinc-300 hover:text-amber-500 transition-colors"
              aria-label="View shopping cart"
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

              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full animate-in fade-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {session?.user ? (
              <div className="flex items-center space-x-4">
                <span className="text-xs font-medium hidden md:block tracking-wide uppercase px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-zinc-300 hover:text-amber-500 hidden md:block transition-colors font-medium text-sm cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-zinc-300 hover:text-amber-500 transition-colors font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-medium uppercase px-3 py-1.5 rounded border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
                aria-expanded={isOpen}
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
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col items-center">
            <Link
              href="/"
              onClick={toggleMenu}
              className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 w-full text-center"
            >
              Home
            </Link>
            <Link
              href="/menu"
              onClick={toggleMenu}
              className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 w-full text-center"
            >
              Menu
            </Link>

            {session?.user ? (
              <div className="w-full text-center py-2 border-t border-b border-zinc-800 my-1">
                <p className="text-xs text-amber-400 uppercase tracking-wider mb-2">
                  Signed in as {session.user.name || session.user.email}
                </p>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleSignOut();
                  }}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full space-y-2 pt-1">
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 w-full text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={toggleMenu}
                  className="block px-3 py-2 text-base font-medium text-amber-500 hover:text-amber-400 w-full text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              href="/reservations"
              onClick={toggleMenu}
              className="block mt-4 px-5 py-3 text-base font-medium bg-amber-600 text-white rounded-md hover:bg-amber-700 w-full text-center"
            >
              Reservations
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
