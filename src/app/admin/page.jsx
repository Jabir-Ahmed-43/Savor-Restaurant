// app/admin/page.jsx
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">
        Today&apos;s Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
          <p className="text-sm font-medium text-zinc-500 mb-1">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-zinc-900">$1,245.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
          <p className="text-sm font-medium text-zinc-500 mb-1">
            Active Orders
          </p>
          <p className="text-3xl font-bold text-zinc-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
          <p className="text-sm font-medium text-zinc-500 mb-1">
            Pending Reservations
          </p>
          <p className="text-3xl font-bold text-zinc-900">4</p>
        </div>
      </div>
    </div>
  );
}
