"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cart: CartItem[] = JSON.parse(savedCart);

      const totalQty = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(totalQty);
    } else {
      setCartCount(0);
    }
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
