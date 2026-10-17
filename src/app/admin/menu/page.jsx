// app/admin/menu/page.jsx
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Menu Manager | Admin",
};

export default async function AdminMenuPage() {
  // 1. Fetch all items from MongoDB
  const client = await clientPromise;
  const db = client.db("savor-rest");

  // Sort by category to keep the list organized
  const menuItems = await db
    .collection("menuitems")
    .find({})
    .sort({ category: 1 })
    .toArray();

  return (
    <div>
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-sm font-medium text-zinc-500">
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {menuItems.map((item) => (
                <tr
                  key={item._id.toString()}
                  className="hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-zinc-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-zinc-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-zinc-500 truncate w-48">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors">
                      Edit
                    </button>
                    <button className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {menuItems.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            No menu items found. Click &quot;Add New Dish&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
}
