// app/admin/reservations/page.jsx
import ReservationTable from "@/components/admin/ReservationTable";
import clientPromise from "@/lib/mongodb";

export const metadata = { title: "Reservations | Admin" };

export default async function AdminReservationsPage() {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  const rawReservations = await db
    .collection("reservations")
    .find({})
    .sort({ date: 1, time: 1 }) // Sort by soonest upcoming
    .toArray();

  const reservations = rawReservations.map((res) => ({
    ...res,
    _id: res._id.toString(),
    createdAt: res.createdAt?.toISOString() || null,
  }));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Table Bookings</h1>
        <p className="text-zinc-500 mt-1">
          Manage upcoming reservations and guest seating.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <ReservationTable initialData={reservations} />
      </div>
    </div>
  );
}
