"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = () => {
    if (!name || !address || !phone) {
      setError("⚠️ Please fill all fields!");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone must be exactly 10 digits (0-9 only)");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
      setError("Cart is empty!");
      return;
    }

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: "Processing",
      paymentMode: "Cash on Delivery",
      total,
      items: cart,
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new Event("storage"));

    setOrderPlaced(true);
    setError("");
  };

  if (orderPlaced) {
    return (
      <main className="p-6 text-center">
        <img
          src="/cat-success.png"
          alt="Success Cat"
          className="w-80 mx-auto"
        />

        <h2 className="text-green-600 text-2xl font-bold mt-4">
          🎉 Order placed successfully!
        </h2>

        <button
          onClick={() => router.push("/orders")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
        >
          View Orders
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <input
        type="text"
        placeholder="Full Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Address"
        className="border p-2 w-full mb-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="border p-2 w-full mb-2"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value.replace(/\D/g, ""))
        }
        maxLength={10}
      />

      {error && (
        <p className="text-red-600 font-bold">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded w-full"
      >
        Place Order
      </button>
    </main>
  );
}