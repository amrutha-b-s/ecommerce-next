"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Add to cart
  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      const updated = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.dispatchEvent(new Event("storage"));
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Loading ring only
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Products
      </h1>

      {/* SEARCH BAR */}
      <div className="relative max-w-md mx-auto mb-8">
        <span className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 pl-10 rounded-md"
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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

            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-black text-white py-2 rounded"
            >
              Add to Cart
            </button>

            <Link href={`/product/${product.id}`}>
              <button className="mt-2 w-full bg-gray-200 py-2 rounded">
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No products found.
        </p>
      )}
    </main>
  );
}
