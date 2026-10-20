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
    address: customerDetails.address,
    specialInstructions: customerDetails.notes,
    items: cartItems, // The array of dishes from the CartContext
    totalAmount: totalAmount,
    status: "Pending",
    createdAt: new Date(),
  };

  const result = await db.collection("orders").insertOne(newOrder);

  // Instantly refresh the admin orders page so the kitchen sees it
  revalidatePath("/admin/orders");

  return { success: true, orderId: result.insertedId.toString() };
}
