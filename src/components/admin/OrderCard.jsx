// components/admin/OrderCard.jsx
export default function OrderCard({ order, children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200">
      <div className="flex justify-between items-start mb-3 border-b border-zinc-100 pb-3">
        <div>
          <p className="text-xs font-bold text-zinc-400 mb-1">
            #{order._id.slice(-6).toUpperCase()}
          </p>
          <p className="font-bold text-zinc-900 text-sm">
            {order.customerName}
          </p>
          <p className="text-xs text-zinc-500">{order.phone}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-amber-600 text-sm">
            ${order.totalAmount?.toFixed(2)}
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            {new Date(order.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {order.items?.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-zinc-700">
              <span className="font-bold mr-1">{item.quantity}x</span>{" "}
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {order.specialInstructions && (
        <div className="bg-amber-50 p-2 rounded text-xs text-amber-800 border border-amber-100 mb-4">
          <span className="font-bold">Note:</span> {order.specialInstructions}
        </div>
      )}

      {/* Renders the action buttons passed from the main page */}
      {children}
    </div>
  );
}
