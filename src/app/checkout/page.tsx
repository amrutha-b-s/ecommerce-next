"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 🚫 Redirect if cart empty
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      router.push("/");
    }
  }, []);

  const placeOrder = () => {
    if (!name.trim() || !address.trim() || !phone.trim()) {
      setError("Please fill all fields.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total,
      status: "Processing",
      paymentMode,
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    localStorage.removeItem("cart");

    // update navbar count
    window.dispatchEvent(new Event("storage"));

    setOrderPlaced(true);

    setTimeout(() => {
      router.push("/orders");
    }, 1500);
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
            placeholder="Full Name"
            className="border p-2 w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Address"
            className="border p-2 w-full mb-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            placeholder="Phone"
            className="border p-2 w-full mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="border p-2 w-full mb-3"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>

          {error && (
            <p className="text-red-600 mb-3">{error}</p>
          )}

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 text-white py-2"
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );
}
