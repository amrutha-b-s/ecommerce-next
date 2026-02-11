"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ReviewPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">No items to review</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Review Your Order
      </h1>

      {cart.map(item => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="font-semibold">{item.title}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>
            Item Total: ₹{" "}
            {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">
        Grand Total: ₹ {total.toFixed(2)}
      </h2>

      <button
        onClick={() => router.push("/checkout")}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
      >
        Confirm & Go to Checkout
      </button>
    </main>
  );
}
