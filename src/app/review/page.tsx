"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Calculate total
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // If cart empty
  if (cart.length === 0) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>No items in cart.</h1>
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Review Your Order
      </h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>
            Item Total: ₹ {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>
        Grand Total: ₹ {grandTotal.toFixed(2)}
      </h2>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        {/* Go to checkout */}
        <button
          onClick={() => router.push("/checkout")}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Confirm & Go to Checkout
        </button>

        {/* Continue shopping */}
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
