"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Products
      </h1>

      {/* 🔵 Loading Ring */}
      {loading && (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <p className="text-center text-red-600">
          Failed to load products. Please try again later.
        </p>
      )}

      {/* Products grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto object-contain"
              />

              <h2 className="mt-3 text-sm font-semibold line-clamp-2">
                {product.title}
              </h2>

              <p className="font-bold mt-2">
                ₹ {product.price}
              </p>

              <Link href={`/product/${product.id}`}>
                <button className="mt-3 w-full bg-black text-white py-2 rounded">
                  View Product
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
