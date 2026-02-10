"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Cart item type */
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // EMPTY CART UI
  if (cart.length === 0) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty 🛒</p>

        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-2 rounded"
        >
          Go to Products
        </Link>
      </main>
    );
  }

  // CART WITH ITEMS
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />

            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹ {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Clear Cart */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: ₹ {totalPrice.toFixed(2)}
        </p>

        <button
          onClick={clearCart}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Clear Cart
        </button>
      </div>
    </main>
  );
}
