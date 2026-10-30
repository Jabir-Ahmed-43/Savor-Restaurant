"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function getDashboardStats() {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const [totalOrders, activeOrders, completedOrders] = await Promise.all([
    db.collection("orders").countDocuments(),
    db.collection("orders").countDocuments({ status: { $ne: "Completed" } }),
    db.collection("orders").find({ status: "Completed" }).toArray(),
  ]);

  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0,
  );

  return {
    totalOrders,
    activeOrders,
    completedCount: completedOrders.length,
    totalRevenue,
  };
}

export async function getLiveOrders() {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const orders = await db
    .collection("orders")
    .find({ status: { $ne: "Complete" } })
    .sort({ createdAt: 1 })
    .toArray();

  return orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
    createdAt: order.createdAt ? order.createdAt.toISOString() : null,
    items:
      order.items?.map((item) => ({
        ...item,
        _id: item._id ? item._id.toString() : item.id,
      })) || [],
  }));
}

export async function updateOrderStatus(orderId, newStatus) {
  if (!orderId || !newStatus) return { success: false };

  const client = await clientPromise;
  const db = client.db("savor-rest");

  await db.collection("orders").updateOne(
    {
      _id: new ObjectId(orderId),
    },
    {
      $set: { status: newStatus },
    },
  );
  revalidatePath("/admin/orders");
  return { success: true };
}

export async function getOrderHistory() {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const orders = await db
    .collection("orders")
    .find({ status: "Completed" })
    .sort({ createdAt: -1 })
    .toArray();

  return orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
    createdAt: order.createdAt ? order.createdAt.toISOString() : null,
    items:
      order.items?.map((item) => ({
        ...item,
        _id: item._id ? item._id.toString() : item.id,
      })) || [],
  }));
}

export async function toggleItemAvailability(itemId, currentStatus) {
  if (!itemId) return { success: false };

  const client = await clientPromise;
  const db = client.db("savor-rest");

  await db
    .collection("menuitems")
    .updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { isAvailable: !currentStatus } },
    );

  revalidatePath("/admin/menu");
  revalidatePath("/menu");

  return { success: true };
}
