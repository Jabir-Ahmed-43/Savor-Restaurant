// components/AddressBook.jsx
"use client";

import { addUserAddress, getUserAddresses } from "@/app/actions/userActions";
import { useEffect, useState } from "react";

export default function AddressBook({ userEmail }) {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

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
      phone: formData.get("phone"),
      street: formData.get("street"),
    };

    const response = await addUserAddress(userEmail, addressData);

    if (response.success) {
      setAddresses([...addresses, response.address]);
      setIsAddingAddress(false);
    }

    setIsSubmittingAddress(false);
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
          <h3 className="font-bold text-zinc-900 mb-4">Add Delivery Address</h3>
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Label (e.g., Home, Work)
                </label>
                <input
                  type="text"
                  name="label"
                  required
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
                rows="2"
                placeholder="Street name, Apartment number..."
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingAddress(false)}
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
                You don&apos;t have any saved addresses.
              </p>
              <p className="text-sm text-zinc-500">
                Add an address for a faster checkout experience.
              </p>
            </div>
          ) : (
            addresses.map((address, idx) => (
              <div
                key={address.id || idx}
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
                  <button className="text-xs font-medium text-amber-600 hover:text-amber-800">
                    Edit
                  </button>
                  <button className="text-xs font-medium text-red-500 hover:text-red-700">
                    Delete
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
