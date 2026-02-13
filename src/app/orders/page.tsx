"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const getDeliveryDate = (orderDate: string) => {
    const date = new Date(orderDate);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">No orders placed yet.</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 mb-6 rounded shadow-sm"
        >
          <p><strong>Order ID:</strong> {order.id}</p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.date).toLocaleString("en-IN")}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {order.status}
            </span>
          </p>

          <p>
            <strong>Delivery By:</strong>{" "}
            <span className="text-blue-600 font-semibold">
              {getDeliveryDate(order.date)}
            </span>
          </p>

          <p><strong>Payment Mode:</strong> {order.paymentMode}</p>

          <p className="font-bold mt-2">
            Total: ₹ {order.total?.toFixed(2)}
          </p>

          <div className="mt-3">
            {order.items?.map((item: any) => (
              <div key={item.id}>
                {item.title} (x{item.quantity})
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}