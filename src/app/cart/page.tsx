"use client";

import { useEffect, useState } from "react";

/* Cart item type */
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty</p>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b pb-4 mb-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-20 object-contain"
          />

          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>₹ {item.price}</p>
          </div>
        </div>
      ))}

      <button
        onClick={clearCart}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded"
      >
        Clear Cart
      </button>
    </main>
  );
}
