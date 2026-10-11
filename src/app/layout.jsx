// app/layout.jsx
import { Inter } from "next/font/google";
import { CartProvider } from "../../context/CartContext";
import "./globals.css";
import Navbar from "\u0018\u0018@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
          <Navbar></Navbar>
          <div className="pt-20">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
