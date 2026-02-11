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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // If product already exists → increase quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // If new product → add with quantity 1
      existingCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // 🔥 Trigger navbar update
    window.dispatchEvent(new Event("storage"));

    alert("Product added to cart ✅");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-lg mb-4">₹ {product.price}</p>

          <p className="mb-4 text-gray-600">
            {product.description}
          </p>

          <button
            onClick={addToCart}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
