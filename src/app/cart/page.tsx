"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // LOAD CART
  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      const parsed = JSON.parse(stored);

      // Make sure quantity always exists
      const updated = parsed.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        image: item.image,
        quantity: item.quantity ? Number(item.quantity) : 1,
      }));

      setCart(updated);
    }
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // INCREASE
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // REMOVE
  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // CALCULATE TOTAL
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Cart is empty</p>
      )}

      {cart.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="h-20 object-contain"
            />

            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p>₹ {item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 px-4 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6">
            Total: ₹ {totalPrice.toFixed(2)}
          </h2>

          <button
            onClick={clearCart}
            className="mt-4 px-6 py-2 bg-black text-white rounded"
          >
            Clear Cart
          </button>

          <div className="flex gap-4 mt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded">
              Review Order
            </button>

            <button className="px-6 py-2 bg-green-600 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
