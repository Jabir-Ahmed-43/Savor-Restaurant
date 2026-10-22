// app/actions/orderActions.js
"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function submitOrder(
  customerDetails,
  cartItems,
  totalAmount,
  userEmail,
) {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const newOrder = {
    customerName: customerDetails.name,
    phone: customerDetails.phone,
    email: userEmail || customerDetails.email, // Use the provided email or fallback to form email
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

  // Bulletproof serialization for Next.js Client Components
  return orders.map((order) => {
    return {
      ...order,
      // 1. Convert the main document ID to a string
      _id: order._id.toString(),

      // 2. Convert the MongoDB Date object to an ISO string
      createdAt: order.createdAt ? order.createdAt.toISOString() : null,

      // 3. Ensure any nested item ObjectIds are also strings
      items:
        order.items?.map((item) => ({
          ...item,
          _id: item._id ? item._id.toString() : item.id,
        })) || [],
    };
  });
}
