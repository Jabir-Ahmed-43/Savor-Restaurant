// app/actions/menuActions.js
"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addDish(formData) {
  // 1. Extract data from the submitted form
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
    category: formData.get("category"),
    image: formData.get("image"),
    // Split comma-separated dietary string into an array, or return empty array
    dietary: formData.get("dietary")
      ? formData
          .get("dietary")
          .split(",")
          .map((item) => item.trim())
      : [],
  };

  // 2. Generate a numeric ID (crucial for your Cart grouping logic!)
  const newItem = {
    ...rawData,
    id: Date.now(), // Uses the current timestamp as a unique numeric ID
  };

  // 3. Connect to MongoDB and insert the document
  const client = await clientPromise;
  const db = client.db("savor-rest");
  await db.collection("menuitems").insertOne(newItem);

  // 4. Tell Next.js to refresh the admin menu page cache to show the new item
  revalidatePath("/admin/menu");

  // 5. Redirect the user back to the menu table
  redirect("/admin/menu");
}
