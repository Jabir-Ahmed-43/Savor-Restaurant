// components/admin/MenuTable.jsx
"use client";

import { toggleItemAvailability } from "@/app/actions/adminActions";
import { deleteMenuItem, updateMenuItem } from "@/app/actions/menuAcitons";
import Image from "next/image";
import { useState } from "react";

export default function MenuTable({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [processingId, setProcessingId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;

    setProcessingId(itemId);
    const response = await deleteMenuItem(itemId);

    if (response.success) {
      setItems(items.filter((item) => item._id !== itemId));
    }
    setProcessingId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setProcessingId(editingItem._id);

    const formData = new FormData(e.target);
    const updatedData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      description: formData.get("description"),
      category: formData.get("category"),
      image: formData.get("image"),
    };

    const response = await updateMenuItem(editingItem._id, updatedData);

    if (response.success) {
      setItems(
        items.map((item) =>
          item._id === editingItem._id ? { ...item, ...updatedData } : item,
        ),
      );
      setEditingItem(null);
    }
    setProcessingId(null);
  };
  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-500">
        No menu items found. Click &quot;Add New Dish&quot; to get started.
      </div>
    );
  }

  return (
    <>
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
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-zinc-100 shrink-0">
                      <Image
                        src={item.image || "/placeholder.jpg"} // Fallback in case image is missing
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
                  <button
                    onClick={() => setEditingItem(item)}
                    disabled={processingId === item._id}
                    className="text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={processingId === item._id}
                    className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                  >
                    {processingId === item._id ? "..." : "Delete"}
                  </button>
                </td>
                {/* Inventory Status Column */}
                <td className="px-6 py-4">
                  <button
                    onClick={async () => {
                      setProcessingId(item._id);
                      const res = await toggleItemAvailability(
                        item._id,
                        item.isAvailable !== false,
                      );
                      if (res.success) {
                        setItems(
                          items.map((i) =>
                            i._id === item._id
                              ? {
                                  ...i,
                                  isAvailable:
                                    i.isAvailable === false ? true : false,
                                }
                              : i,
                          ),
                        );
                      }
                      setProcessingId(null);
                    }}
                    disabled={processingId === item._id}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.isAvailable !== false
                        ? "bg-green-500"
                        : "bg-zinc-300"
                    } disabled:opacity-50`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.isAvailable !== false
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-xs font-medium text-zinc-500">
                    {item.isAvailable !== false ? "In Stock" : "Sold Out"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop-up Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-zinc-900/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Edit {editingItem.name}
            </h2>

            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Dish Name
            </label>
            <input
              name="name"
              defaultValue={editingItem.name}
              className="w-full border border-zinc-300 p-2 mb-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              required
            />
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Image URL
            </label>
            <input
              name="image"
              type="url"
              defaultValue={editingItem.image}
              className="w-full border border-zinc-300 p-2 mb-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="https://..."
              required
            />

            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Category
            </label>
            <input
              name="category"
              defaultValue={editingItem.category}
              className="w-full border border-zinc-300 p-2 mb-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              required
            />

            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={editingItem.price}
              className="w-full border border-zinc-300 p-2 mb-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              required
            />

            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={editingItem.description}
              className="w-full border border-zinc-300 p-2 mb-6 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              required
              rows="3"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processingId === editingItem._id}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
              >
                {processingId === editingItem._id
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
