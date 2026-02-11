"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalItems = cart.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <nav className="p-4 border-b flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          <Link href="/review">Review</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
