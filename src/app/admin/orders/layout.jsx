// app/admin/orders/layout.jsx

export const metadata = {
  title: "Live Orders | Admin Savor",
  description: "Admin panel for managing active kitchen tickets.",
  robots: {
    index: false,
    follow: false,
  },
};

// This default export is strictly required for the layout to work!
export default function AdminOrdersLayout({ children }) {
  return <>{children}</>;
}
