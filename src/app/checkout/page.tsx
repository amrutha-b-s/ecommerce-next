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

    setError("");
    setOrderPlaced(true);
  };

  // ✅ SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h1>Checkout</h1>

        <img
          src="/cat-success.png"
          alt="Success Cat"
          style={{ width: "200px", margin: "20px auto" }}
        />

        <h2 style={{ color: "green" }}>
          🎉 Order placed successfully!
        </h2>

        <button
          onClick={() => router.push("/")}
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
          Continue Shopping 🛍️
        </button>
      </main>
    );
  }

  // ✅ FORM SCREEN
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
