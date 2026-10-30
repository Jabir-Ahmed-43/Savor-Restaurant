// app/admin/menu/page.jsx
import MenuTable from "@/components/admin/MenuTable"; // We will create this next
import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export const metadata = {
  title: "Menu Manager | Admin",
};

export default async function AdminMenuPage() {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const rawMenuItems = await db
    .collection("menuitems")
    .find({})
    .sort({ category: 1 })
    .toArray();

  const menuItems = rawMenuItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Menu Manager</h1>
        <Link
          href="/admin/menu/new"
          className="bg-zinc-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Dish
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        {/* Pass the data to our interactive Client Component */}
        <MenuTable initialItems={menuItems} />
      </div>
    </div>
  );
}
