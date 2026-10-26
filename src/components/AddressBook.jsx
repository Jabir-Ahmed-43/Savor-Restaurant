// components/AddressBook.jsx
"use client";

import {
  addUserAddress,
  deleteUserAddress,
  editUserAddress,
  getUserAddresses,
} from "@/app/actions/userActions";
import { useEffect, useState } from "react";

export default function AddressBook({ userEmail }) {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch only addresses independently
  useEffect(() => {
    async function loadAddresses() {
      if (userEmail) {
        const fetchedAddresses = await getUserAddresses(userEmail);
        setAddresses(fetchedAddresses);
      }
      setIsLoading(false);
    }
    loadAddresses();
  }, [userEmail]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSubmittingAddress(true);

    const formData = new FormData(e.target);
    const addressData = {
      label: formData.get("label"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      street: formData.get("street"),
    };

    if (editingAddress) {
      const respone = await editUserAddress(
        userEmail,
        editingAddress,
        addressData,
      );
      if (respone.success) {
        setAddresses(
          addresses.map((addr) =>
            addr.id === editingAddress.id ? { ...addr, ...addressData } : addr,
          ),
        );
        setIsAddingAddress(false);
        setEditingAddress(null);
      }
    } else {
      const response = await addUserAddress(userEmail, addressData);

      if (response.success) {
        setAddresses([...addresses, response.address]);
        setIsAddingAddress(false);
      }
    }

    setIsSubmittingAddress(false);
  };

  const handleDeleteAddress = async (addressId) => {
    console.log("Attempting to delete address with ID:", addressId);
    if (confirm("Are you sure you want to delete this address?")) {
      setDeletingId(addressId);

      try {
        const response = await deleteUserAddress(userEmail, addressId);

        if (response.success) {
          setAddresses(addresses.filter((addr) => addr.id !== addressId));
        } else {
          {
            alert("Failed to delete the address. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error deleting address:", error);
        alert(
          "An error occurred while deleting the address. Please try again.",
        );
      }
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-zinc-500 animate-pulse">
        Loading saved addresses...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-zinc-900">Saved Addresses</h2>
        {!isAddingAddress && (
          <button
            onClick={() => setIsAddingAddress(true)}
            className="text-sm font-medium text-amber-600 hover:text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg"
          >
            + Add New
          </button>
        )}
      </div>

      {isAddingAddress ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 mb-6">
          <h3 className="font-bold text-zinc-900 mb-4">
            {editingAddress ? "Edit Delivery Address" : "Add Delivery Address"}
          </h3>

          {/* 4. Add key={...} to force React to reset the form when switching modes */}
          <form
            key={editingAddress?.id || "new"}
            onSubmit={handleSaveAddress}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Label (e.g., Home, Work)
                </label>
                {/* 5. Pre-fill the default values if editing */}
                <input
                  type="text"
                  name="label"
                  required
                  defaultValue={editingAddress?.label}
                  placeholder="Home"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  defaultValue={editingAddress?.phone}
                  placeholder="1234567890"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Full Address
              </label>
              <textarea
                name="street"
                required
                defaultValue={editingAddress?.street}
                rows="2"
                placeholder="Street name, Apartment number..."
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingAddress(false);
                  setEditingAddress(null);
                }}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingAddress}
                className="px-6 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-amber-600 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmittingAddress ? "Saving..." : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.length === 0 ? (
            <div className="col-span-full bg-zinc-50 p-8 rounded-xl border border-zinc-200 text-center">
              <p className="text-zinc-600 mb-2">
                You don't have any saved addresses.
              </p>
              <p className="text-sm text-zinc-500">
                Add an address for a faster checkout experience.
              </p>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-zinc-200 relative overflow-hidden"
              >
                {address.isDefault && (
                  <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                    Default
                  </div>
                )}
                <h3 className="font-bold text-zinc-900 mb-1">
                  {address.label}
                </h3>
                <p className="text-sm text-zinc-600 mb-2">{address.street}</p>
                <p className="text-sm text-zinc-500 mb-4 font-medium">
                  📞 {address.phone}
                </p>
                <div className="flex gap-3 pt-3 border-t border-zinc-100">
                  {/* 6. Wire up the Edit button to open the form and populate state */}
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Editing address: ${address.label}`);
                      setEditingAddress(address);
                      setIsAddingAddress(true);
                    }}
                    className="text-xs font-medium text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(address.id)}
                    disabled={deletingId === address.id}
                    className="text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                  >
                    {deletingId === address.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
