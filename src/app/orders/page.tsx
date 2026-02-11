"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">
          No orders placed yet.
        </h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 mb-6 rounded"
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
          <p className="font-bold">
            Total: ₹ {order.total.toFixed(2)}
          </p>

          <div className="mt-3">
            {order.items.map((item: any) => (
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
