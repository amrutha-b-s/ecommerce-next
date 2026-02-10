"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {loading && <p>Loading products...</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain"
            />

            <h2 className="mt-3 font-semibold text-sm">
              {product.title}
            </h2>

            <p className="font-bold mt-2">
              ₹ {product.price}
            </p>

            <Link href={`/product/${product.id}`}>
              <button className="mt-3 px-4 py-2 bg-black text-white rounded">
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
