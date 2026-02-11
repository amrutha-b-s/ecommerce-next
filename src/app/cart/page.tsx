"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              className="border p-4 mb-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p>₹ {item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 bg-gray-300"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="px-4 py-1 bg-red-500 text-white ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-6">
            Total: ₹ {totalPrice.toFixed(2)}
          </h2>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => router.push("/review")}
              className="px-6 py-2 bg-blue-600 text-white"
            >
              Review Order
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="px-6 py-2 bg-green-600 text-white"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
