"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="h-80 mx-auto object-contain"
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
    </main>
  );
}
