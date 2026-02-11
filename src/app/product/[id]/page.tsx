"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find(
      (item: any) => item.id === product.id
    );

    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1, // 🔥 important
      };

      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, newItem])
      );
    }

    alert("Added to cart!");
  };

  if (!product) {
    return <p className="p-6">Loading product...</p>;
  }

  return (
    <main className="p-6 flex gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 object-contain"
      />

      <div>
        <h1 className="text-2xl font-bold mb-4">
          {product.title}
        </h1>

        <p className="mb-4">{product.description}</p>

        <h2 className="text-xl font-semibold mb-4">
          ₹ {product.price}
        </h2>

        <button
          onClick={addToCart}
          className="px-6 py-2 bg-black text-white"
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
