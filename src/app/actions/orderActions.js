// app/actions/orderActions.js
"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function submitOrder(customerDetails, cartItems, totalAmount) {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const newOrder = {
    customerName: customerDetails.name,
    phone: customerDetails.phone,
    email: customerDetails.email,
    address: customerDetails.address,
    specialInstructions: customerDetails.notes,
    items: cartItems,
    totalAmount: totalAmount,
    status: "Pending",
    createdAt: new Date(),
  };

  console.log("Submitting new order:", newOrder); // Debugging log

  const result = await db.collection("orders").insertOne(newOrder);

  revalidatePath("/admin/orders");

  return { success: true, orderId: result.insertedId.toString() };
}
export async function getUserOrders(userEmail) {
  if (!userEmail) return [];

  const client = await clientPromise;
  const db = client.db("savor-rest");

  const orders = await db
    .collection("orders")
    .find({ email: userEmail })
    .sort({ createdAt: -1 })
    .toArray();

  return orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));
}
