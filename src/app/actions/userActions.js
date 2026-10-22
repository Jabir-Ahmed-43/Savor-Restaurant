// app/actions/userActions.js
"use server";

import clientPromise from "@/lib/mongodb";

// Fetch the user's saved addresses
export async function getUserAddresses(userEmail) {
  if (!userEmail) return [];

  const client = await clientPromise;
  const db = client.db("savor-rest");

  const user = await db.collection("users").findOne({ email: userEmail });

  // Return the addresses array, or an empty array if none exist yet
  return user?.addresses || [];
}

// Add a new address to the user's document
export async function addUserAddress(userEmail, addressData) {
  if (!userEmail) return { success: false };

  const client = await clientPromise;
  const db = client.db("savor-rest");

  const newAddress = {
    id: Date.now().toString(), // Generate a unique ID for this address
    label: addressData.label,
    phone: addressData.phone,
    street: addressData.street,
    isDefault: addressData.isDefault || false,
    createdAt: new Date(),
  };

  // Push the new address into the user's 'addresses' array
  await db
    .collection("users")
    .updateOne({ email: userEmail }, { $push: { addresses: newAddress } });

  return { success: true, address: newAddress };
}
