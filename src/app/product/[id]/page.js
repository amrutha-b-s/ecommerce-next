"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 mx-auto object-contain"
      />

      <h1 className="text-2xl font-bold mt-6">
        {product.title}
      </h1>

      <p className="text-gray-600 mt-4">
        {product.description}
      </p>

      <p className="text-xl font-bold mt-4">
        ₹ {product.price}
      </p>

      <button className="mt-6 px-6 py-2 bg-black text-white rounded">
        Add to Cart
      </button>
    </main>
  );
}
