// app/admin/layout.jsx
import AdminSidebar from "@/components/AdminSidebar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Admin Dashboard | Savor Restaurant",
};

export default async function AdminLayout({ children }) {
  // --- PROTECTION LOGIC ---
  // In a real app, you would verify a session token here (e.g., using NextAuth).
  // For now, we check for a hypothetical "admin_token" cookie.
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_token");

  // If the user does not have the admin token, immediately redirect them to the login page.
  if (!isAdmin) {
    // Note: Comment out this redirect temporarily while you are developing the UI!
    // redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      {/* The main content area where your admin pages will render */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Optional Top Bar for extra controls */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-medium text-zinc-800">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
