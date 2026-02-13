"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");

  const validatePhone = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = () => {
    if (!name || !address || !phone) {
      setError("⚠️ Please fill all fields!");
      return;
    }

    if (!validatePhone(phone)) {
      setError("⚠️ Phone must be 10 digits and start with 6-9");
      return;
    }

    setError("");

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
      setError("⚠️ Cart is empty!");
      return;
    }

    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString("en-IN"),
      status: "Processing",
      paymentMode,
      total,
      items: cart,
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    // Clear cart
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));

    // Delivery date (5 days later)
    const date = new Date();
    date.setDate(date.getDate() + 5);
    setDeliveryDate(
      date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    setOrderPlaced(true);
  };

  // ✅ SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <main className="p-8 text-center">
        <img
          src="/cat-success.png"
          alt="Success"
          className="w-64 md:w-72 mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order placed successfully!
        </h1>

        <p>
          <strong>Status:</strong>{" "}
          <span className="text-yellow-600 font-semibold">
            Processing
          </span>
        </p>

        <p>
          <strong>Delivery By:</strong>{" "}
          <span className="text-blue-600 font-semibold">
            {deliveryDate}
          </span>
        </p>

        <p>
          <strong>Payment Mode:</strong> {paymentMode}
        </p>

        <button
          onClick={() => router.push("/orders")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
        >
          View Order
        </button>
      </main>
    );
  }

  // ✅ FORM SCREEN
  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          maxLength={10}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, ""))
          }
          className="border p-2 rounded"
        />

        {/* PAYMENT OPTIONS */}
        <div>
          <h2 className="font-semibold mb-2">
            Select Payment Method
          </h2>

          <div className="flex gap-3">
            {["COD", "UPI", "Card"].map((mode) => (
              <button
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={`px-4 py-2 border rounded ${
                  paymentMode === mode
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                {mode === "COD"
                  ? "Cash on Delivery"
                  : mode}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-600 font-semibold">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 py-3 bg-green-600 text-white rounded"
        >
          Place Order
        </button>
      </div>
    </main>
  );
}
