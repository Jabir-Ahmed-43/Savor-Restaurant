// app/admin/history/page.jsx
import { getOrderHistory } from "@/app/actions/adminActions";

export const metadata = {
  title: "Order History | Admin Savor",
};

export default async function AdminHistoryPage() {
  const history = await getOrderHistory();

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Order History</h1>
        <p className="text-zinc-500 mt-1">
          Audit log of all completed deliveries.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50 text-zinc-900 font-medium border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {history.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No completed orders found.
                  </td>
                </tr>
              ) : (
                history.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                      {order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      <span className="text-zinc-400 ml-1">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900">
                        {order.customerName || "Customer"}
                      </p>
                      <p className="text-xs text-zinc-500">{order.phone}</p>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {order.items
                        ?.map((i) => `${i.quantity}x ${i.name}`)
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-bold">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
