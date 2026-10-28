// app/admin/orders/page.jsx
"use client";

import { getLiveOrders, updateOrderStatus } from "@/app/actions/adminActions";
import OrderCard from "@/components/admin/OrderCard";
import OrderColumn from "@/components/admin/OrderColumn";
import { useEffect, useState } from "react";

export default function AdminLiveOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      const data = await getLiveOrders();
      setOrders(data);
      setIsLoading(false);
    }

    loadOrders();
    const interval = setInterval(loadOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    const response = await updateOrderStatus(orderId, newStatus);

    if (response.success) {
      if (newStatus === "Completed") {
        setOrders(orders.filter((order) => order._id !== orderId));
      } else {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      }
    }
    setUpdatingId(null);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen p-8 bg-zinc-50 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
      </main>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const preparingOrders = orders.filter((o) => o.status === "Preparing");
  const readyOrders = orders.filter((o) => o.status === "Ready");

  return (
    <main className="min-h-screen p-8 bg-zinc-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Live Orders</h1>
          <p className="text-zinc-500 mt-1">Manage active kitchen tickets</p>
        </div>
        <button
          onClick={async () => {
            setIsLoading(true);
            setOrders(await getLiveOrders());
            setIsLoading(false);
          }}
          className="px-4 py-2 bg-white border border-zinc-700 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-50"
        >
          ↻ Refresh Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OrderColumn
          title="New Arrivals"
          count={pendingOrders.length}
          color="bg-red-50"
          dotColor="bg-red-500"
          badgeColor="text-red-600"
        >
          {pendingOrders.map((order) => (
            <OrderCard key={order._id} order={order}>
              <button
                onClick={() => handleStatusUpdate(order._id, "Preparing")}
                disabled={updatingId === order._id}
                className="w-full mt-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded hover:bg-zinc-800 disabled:opacity-50"
              >
                {updatingId === order._id ? "Updating..." : "Start Preparing"}
              </button>
            </OrderCard>
          ))}
        </OrderColumn>

        <OrderColumn
          title="In Kitchen"
          count={preparingOrders.length}
          color="bg-amber-50"
          dotColor="bg-amber-500"
          badgeColor="text-amber-500"
        >
          {preparingOrders.map((order) => (
            <OrderCard key={order._id} order={order}>
              <button
                onClick={() => handleStatusUpdate(order._id, "Ready")}
                disabled={updatingId === order._id}
                className="w-full mt-4 py-2 bg-amber-500 text-white text-sm font-medium rounded hover:bg-amber-600 disabled:opacity-50"
              >
                {updatingId === order._id ? "Updating..." : "Mark as Ready"}
              </button>
            </OrderCard>
          ))}
        </OrderColumn>

        <OrderColumn
          title="Ready for Delivery"
          count={readyOrders.length}
          color="bg-green-50"
          dotColor="bg-green-500"
          badgeColor="text-green-500"
        >
          {readyOrders.map((order) => (
            <OrderCard key={order._id} order={order}>
              <button
                onClick={() => handleStatusUpdate(order._id, "Completed")}
                disabled={updatingId === order._id}
                className="w-full mt-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50"
              >
                {updatingId === order._id ? "Updating..." : "Complete Order"}
              </button>
            </OrderCard>
          ))}
        </OrderColumn>
      </div>
    </main>
  );
}
