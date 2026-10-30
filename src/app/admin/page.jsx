// app/admin/page.jsx
import { getDashboardStats } from "@/app/actions/analyticsActions";
import Link from "next/link";

export const metadata = { title: "Dashboard | Admin" };

export default async function AdminDashboard({ searchParams }) {
  // Await searchParams in Next.js 15+, or read directly in Next.js 14
  const params = await searchParams;
  const currentRange = params?.range || "all";

  // Fetch live stats based on the URL parameter
  const stats = await getDashboardStats(currentRange);

  // Helper array to render the filter tabs dynamically
  const timeFilters = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "week" },
    { label: "Last 30 Days", value: "month" },
    { label: "All-Time", value: "all" },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Dashboard Overview
          </h1>
          <p className="text-zinc-500 mt-1">
            Real-time store performance & activity
          </p>
        </div>

        {/* Time Filter Navigation */}
        <div className="flex bg-zinc-100 p-1 rounded-lg">
          {timeFilters.map((filter) => (
            <Link
              key={filter.value}
              href={`/admin?range=${filter.value}`}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentRange === filter.value
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Total Gross Revenue
          </h3>
          <div className="text-4xl font-bold text-zinc-900">
            ${stats.grossRevenue.toFixed(2)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Total Orders
          </h3>
          <div className="text-4xl font-bold text-zinc-900">
            {stats.totalOrders}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Active Kitchen Tickets
          </h3>
          <div className="text-4xl font-bold text-amber-600">
            {stats.activeTickets}
          </div>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              Live Order Dispatch
            </h3>
            <p className="text-zinc-500 text-sm mb-6">
              Transition customer orders across New Arrivals, Kitchen Prep, and
              the Delivery Zone.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-amber-600 font-medium hover:text-amber-800 transition-colors inline-flex items-center"
          >
            Open Kanban Board &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              Order History & Logs
            </h3>
            <p className="text-zinc-500 text-sm mb-6">
              Audit fulfilled tickets, review customer notes, and search past
              deliveries.
            </p>
          </div>
          <Link
            href="/admin/history"
            className="text-amber-600 font-medium hover:text-amber-800 transition-colors inline-flex items-center"
          >
            Review Historical Records &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
