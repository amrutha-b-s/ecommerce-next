"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const placeOrder = () => {
    // Basic validation
    if (!name.trim() || !address.trim() || !phone.trim()) {
      setError("Please fill all fields before placing the order.");
      return;
    }

    // Clear error
    setError("");

    // Clear cart
    localStorage.removeItem("cart");

    // Show success
    setOrderPlaced(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {orderPlaced ? (
        <h2 className="text-green-600 text-xl">
          🎉 Order placed successfully!
        </h2>
      ) : (
        <>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />

          {error && (
            <p className="text-red-600 mb-3">{error}</p>
          )}

          <button
            onClick={placeOrder}
            className="w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );
}
