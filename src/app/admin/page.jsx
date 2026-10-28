// app/admin/page.jsx
import { getDashboardStats } from "@/app/actions/adminActions";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "Active Kitchen Tickets",
      value: stats.activeOrders,
      color: "text-amber-600",
    },
    {
      label: "Completed Orders",
      value: stats.completedCount,
      color: "text-green-600",
    },
    {
      label: "Total Orders All-Time",
      value: stats.totalOrders,
      color: "text-zinc-900",
    },
    {
      label: "Total Gross Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: "text-zinc-900",
    },
  ];

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Dashboard Overview
          </h1>
          <p className="text-zinc-500 mt-1">
            Real-time store performance & activity
          </p>
        </div>
        <Link
          href="/admin/orders"
          className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          View Live Board →
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm"
          >
            <p className="text-sm font-medium text-zinc-500">{card.label}</p>
            <p className={`text-3xl font-bold mt-2 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-2">
            Live Order Dispatch
          </h2>
          <p className="text-sm text-zinc-600 mb-4">
            Transition customer orders across New Arrivals, Kitchen Prep, and
            the Delivery Zone.
          </p>
          <Link
            href="/admin/orders"
            className="text-sm font-semibold text-amber-600 hover:text-amber-800"
          >
            Open Kanban Board &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-2">
            Order History & Logs
          </h2>
          <p className="text-sm text-zinc-600 mb-4">
            Audit fulfilled tickets, review customer notes, and search past
            deliveries.
          </p>
          <Link
            href="/admin/history"
            className="text-sm font-semibold text-amber-600 hover:text-amber-800"
          >
            Review Historical Records &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
