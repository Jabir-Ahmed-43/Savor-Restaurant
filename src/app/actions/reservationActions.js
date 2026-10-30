// app/actions/reservationActions.js
"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// For Customers: Create a new reservation
export async function createReservation(formData) {
  try {
    const client = await clientPromise;
    const db = client.db("savor-rest");

    const newReservation = {
      customerName: formData.get("customerName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      partySize: parseInt(formData.get("partySize"), 10),
      status: "Pending", // Default status
      createdAt: new Date(),
    };

    await db.collection("reservations").insertOne(newReservation);

    return { success: true };
  } catch (error) {
    console.error("Reservation Error:", error);
    return { success: false, error: "Failed to book table." };
  }
}

export async function updateReservationStatus(id, newStatus) {
  try {
    const client = await clientPromise;
    const db = client.db("savor-rest");

    await db
      .collection("reservations")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: newStatus } });

    revalidatePath("/admin/reservations");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
