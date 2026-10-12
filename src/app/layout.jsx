// app/layout.jsx
import Navbar from "@/components/Navbar";
import { inter } from "@/lib/fonts";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Savor Restaurant",
    default: "Savor Restaurant",
  },
  description: "An unforgettable culinary journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
