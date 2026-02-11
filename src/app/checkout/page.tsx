"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const placeOrder = () => {
    // Clear cart
    localStorage.removeItem("cart");

    // Show success message
    setOrderPlaced(true);

    // Redirect to home after 2 seconds
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {orderPlaced ? (
        <h2 className="text-green-600 text-xl">
          🎉 Order placed successfully!
        </h2>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 w-full mb-2"
            />
          </div>

          <button
            onClick={placeOrder}
            className="px-6 py-2 bg-green-600 text-white rounded"
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );
}
