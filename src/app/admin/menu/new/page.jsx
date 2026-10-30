// app/admin/menu/new/page.jsx
import { addDish } from "@/app/actions/menuAcitons";
import Link from "next/link";

export const metadata = {
  title: "Add New Dish | Admin",
};

export default function AddDishPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/menu"
          className="p-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900">Add New Dish</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200">
        {/* We attach the Server Action directly to the form's action attribute */}
        <form action={addDish} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700"
              >
                Dish Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="e.g. Truffle Fries"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-zinc-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                required
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-zinc-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="Starters">Starters</option>
                <option value="Mains">Mains</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="dietary"
                className="text-sm font-medium text-zinc-700"
              >
                Dietary Tags (Comma separated)
              </label>
              <input
                type="text"
                id="dietary"
                name="dietary"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="e.g. Vegan, Gluten-Free"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="text-sm font-medium text-zinc-700"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Describe the dish..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-4 border-t border-zinc-100">
            <Link
              href="/admin/menu"
              className="px-6 py-3 rounded-lg font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-medium text-white bg-zinc-900 hover:bg-amber-600 transition-colors"
            >
              Save Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
