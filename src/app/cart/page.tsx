"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sync cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const increaseQty = (id: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (id: number) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const saveForLater = (item: CartItem) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // Avoid duplicate in wishlist
    if (!wishlist.find((w: any) => w.id === item.id)) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Remove from cart
    setCart(cart.filter(c => c.id !== item.id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>Cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map(item => (
        <div
          key={item.id}
          className="border p-4 mb-4 flex items-center gap-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-20"
          />

          <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>
            <p>₹ {item.price}</p>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 bg-gray-300"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white"
              >
                Remove
              </button>

              <button
                onClick={() => saveForLater(item)}
                className="ml-2 px-3 py-1 bg-blue-500 text-white"
              >
                Save for later
              </button>
            </div>
          </div>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">
        Total: ₹ {total.toFixed(2)}
      </h2>

      <div className="flex gap-4 mt-4">
        <Link href="/checkout">
          <button className="px-4 py-2 bg-green-600 text-white">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </main>
  );
}