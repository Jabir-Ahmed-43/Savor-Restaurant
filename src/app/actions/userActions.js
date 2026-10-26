// app/actions/userActions.js
"use server";

import clientPromise from "@/lib/mongodb";

export async function getUserAddresses(userEmail) {
  if (!userEmail) return [];

  const client = await clientPromise;
  const db = client.db("savor-rest");

  const user = await db.collection("users").findOne({ email: userEmail });

  return user?.addresses || [];
}

export async function addUserAddress(userEmail, addressData) {
  if (!userEmail) return { success: false };

  const client = await clientPromise;
  const db = client.db("savor-rest");

  const newAddress = {
    id: Date.now().toString(),
    label: addressData.label,
    phone: addressData.phone,
    street: addressData.street,
    isDefault: addressData.isDefault || false,
    createdAt: new Date(),
  };

  await db
    .collection("users")
    .updateOne(
      { email: userEmail },
      { $push: { addresses: newAddress } },
      { upsert: true },
    );

  return { success: true, address: newAddress };
}
