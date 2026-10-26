// app/profile/page.jsx
"use client";

import { getUserOrders } from "@/app/actions/orderActions";
import { addUserAddress, getUserAddresses } from "@/app/actions/userActions";
import AddressBook from "@/components/AddressBook";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState("orders");
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.email) {
        const [fetchedOrders, fetchedAddresses] = await Promise.all([
          getUserOrders(session.user.email),
          getUserAddresses(session.user.email),
        ]);

        setOrders(fetchedOrders);
        setAddresses(fetchedAddresses);
      }
      setIsLoadingOrders(false);
      setIsLoadingAddresses(false);
    }

    if (session?.user) {
      fetchData();
    } else if (isPending === false) {
      setIsLoadingOrders(false);
      setIsLoadingAddresses(false);
    }
  }, [session, isPending]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSubmittingAddress(true);

    const formData = new FormData(e.target);
    const addressData = {
      label: formData.get("label"),
      phone: formData.get("phone"),
      street: formData.get("street"),
    };

    const response = await addUserAddress(session.user.email, addressData);

    if (response.success) {
      setAddresses([...addresses, response.address]);
      setIsAddingAddress(false);
    }

    setIsSubmittingAddress(false);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    router.push("/login");
  };

  if (isPending) {
    return (
      <main className="min-h-screen py-20 px-4 max-w-5xl mx-auto flex justify-center">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-amber-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-serif text-zinc-900 mb-4">
          Access Denied
        </h2>
        <p className="text-zinc-600 mb-8 text-center">
          Please log in to view your profile and order history.
        </p>
        <Link
          href="/login"
          className="px-8 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
        >
          Log In
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-zinc-900 mb-2">My Account</h1>
        <p className="text-zinc-500">
          Welcome back, {session?.user?.name || "Guest"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-5 py-3 rounded-lg font-medium transition-colors ${activeTab === "orders" ? "bg-amber-600 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full text-left px-5 py-3 rounded-lg font-medium transition-colors ${activeTab === "addresses" ? "bg-amber-600 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
          >
            Address Book
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-5 py-3 rounded-lg font-medium transition-colors ${activeTab === "settings" ? "bg-amber-600 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
          >
            Account Settings
          </button>
          <div className="pt-4 mt-4 border-t border-zinc-200">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-5 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <div className="flex-1">
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-zinc-900 mb-6">
                Recent Orders
              </h2>

              {isLoadingOrders ? (
                <div className="text-zinc-500 animate-pulse">
                  Loading your orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200 text-center">
                  <p className="text-zinc-600 mb-4">
                    You haven&apos;t placed any orders yet.
                  </p>
                  <Link
                    href="/menu"
                    className="text-amber-600 font-medium hover:underline"
                  >
                    Start exploring the menu
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-zinc-100">
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">
                          Order #{order._id.slice(-6).toUpperCase()} •
                          <span
                            className={`ml-2 font-medium ${order.status === "Completed" ? "text-green-600" : "text-amber-600"}`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </p>
                        <p className="font-bold text-zinc-900">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-amber-600">
                        ${order.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-2 mb-6">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-sm text-zinc-700">
                          <span className="font-semibold">
                            {item.quantity}x
                          </span>{" "}
                          {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-zinc-200 max-w-2xl">
              <h2 className="text-2xl font-serif text-zinc-900 mb-6">
                Personal Details
              </h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={session?.user?.name}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      defaultValue={session?.user?.email}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <AddressBook userEmail={session.user.email}></AddressBook>
          )}
        </div>
      </div>
    </main>
  );
}
