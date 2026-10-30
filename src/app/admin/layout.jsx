// app/admin/layout.jsx
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | Savor",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 text-white shrink-0 flex flex-col justify-between p-6">
        <div>
          <div className="mb-8">
            <Link
              href="/admin"
              className="text-2xl font-serif font-bold text-amber-500"
            >
              Savor Admin
            </Link>
            <p className="text-xs text-zinc-400 mt-1">Management Portal</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              Overview
            </Link>

            <Link
              href="/admin/menu"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              Menu Management
            </Link>

            <Link
              href="/admin/orders"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              Live Orders
            </Link>
            <Link
              href="/admin/history"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              Order History
            </Link>
            <Link
              href="/admin/reservations"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              Table Bookings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <Link
            href="/"
            className="block text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
