// components/admin/ReservationTable.jsx
"use client";
import { updateReservationStatus } from "@/app/actions/reservationActions";
import { useState } from "react";

export default function ReservationTable({ initialData }) {
  const [reservations, setReservations] = useState(initialData);

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI update
    setReservations(
      reservations.map((res) =>
        res._id === id ? { ...res, status: newStatus } : res,
      ),
    );

    // Database update
    await updateReservationStatus(id, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Seated":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-zinc-100 text-zinc-800";
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-500">
        No reservations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200 text-sm font-medium text-zinc-500">
            <th className="px-6 py-4">Guest</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Date & Time</th>
            <th className="px-6 py-4">Party Size</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {reservations.map((res) => (
            <tr key={res._id} className="hover:bg-zinc-50">
              <td className="px-6 py-4 font-medium text-zinc-900">
                {res.customerName}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-zinc-900">{res.phone}</div>
                <div className="text-xs text-zinc-500">{res.email}</div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium">{res.date}</div>
                <div className="text-zinc-500 text-sm">{res.time}</div>
              </td>
              <td className="px-6 py-4 font-medium">{res.partySize}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(res.status)}`}
                >
                  {res.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <select
                  value={res.status}
                  onChange={(e) => handleStatusChange(res._id, e.target.value)}
                  className="text-sm border border-zinc-300 rounded p-1 outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Seated">Seated</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
