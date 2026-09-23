// app/layout.jsx
import Navbar from "\u0018\u0018@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Savor Restaurant",
  description: "An unforgettable culinary journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        {/* Place it here above the children */}
        {/* We wrap children in a pt-20 (padding-top) so the fixed navbar doesn't cover your page content */}
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
