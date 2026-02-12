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

    // 🔥 CLEAR CART
    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new Event("storage"));

    setOrderPlaced(true);
    setError("");
  };

  if (orderPlaced) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <img
          src="/cat-success.png"
          alt="Success Cat"
          style={{ width: "200px", margin: "20px auto" }}
        />

        <h2 style={{ color: "green" }}>
          🎉 Order placed successfully!
        </h2>

        <p style={{ marginTop: "10px" }}>
          <strong>Status:</strong>{" "}
          <span style={{ color: "green" }}>
            Processing
          </span>
        </p>

        <p>
          <strong>Delivery By:</strong>{" "}
          {new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <button
          onClick={() => router.push("/orders")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          View Orders
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h1>Checkout</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: "10px" }}
        />

        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            padding: "12px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
    </main>
  );
}
