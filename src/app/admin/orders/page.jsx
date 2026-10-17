// app/admin/orders/page.jsx
import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Live Orders | Admin",
};

// A helper function to color-code order statuses
function getStatusBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-red-100 text-red-800";
    case "Preparing":
      return "bg-amber-100 text-amber-800";
    case "Ready":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-zinc-100 text-zinc-800";
  }
}

export default async function AdminOrdersPage() {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  // Fetch orders, sorting by newest first.
  // (In a real scenario, you might filter out "Completed" orders to keep the board clean)
  const orders = await db
    .collection("orders")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Live Orders</h1>
          <p className="text-zinc-500">
            Manage incoming customer orders and kitchen tickets.
          </p>
        </div>
        <div className="flex gap-2">
          {/* Quick filters for the kitchen staff */}
          <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium">
            All Active
          </button>
          <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-sm font-medium hover:bg-zinc-50">
            Completed
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-zinc-200 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-zinc-300 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          <h3 className="text-lg font-medium text-zinc-900 mb-1">
            No orders yet
          </h3>
          <p className="text-zinc-500">
            When customers check out, their orders will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id.toString()}
              className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-zinc-50 p-4 border-b border-zinc-200 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-zinc-900">
                      Order #{order._id.toString().slice(-6).toUpperCase()}
                    </h3>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusBadge(order.status || "Pending")}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {order.customerName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-600">
                    ${order.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items List */}
              <div className="p-4 flex-1">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Kitchen Ticket
                </h4>
                <ul className="space-y-3">
                  {order.items?.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <div className="flex gap-3">
                        <span className="font-bold text-zinc-900">
                          {item.quantity}x
                        </span>
                        <span className="text-zinc-700">{item.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {order.specialInstructions && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm text-amber-800">
                      <span className="font-bold">Notes:</span>{" "}
                      {order.specialInstructions}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-amber-100 text-amber-800 font-medium rounded-lg text-sm hover:bg-amber-200 transition-colors">
                  Prepare
                </button>
                <button className="flex-1 px-4 py-2 bg-zinc-900 text-white font-medium rounded-lg text-sm hover:bg-zinc-800 transition-colors">
                  Mark Ready
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
