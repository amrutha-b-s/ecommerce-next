"use client";

import { useParams } from "next/navigation";
import productsData from "../../data/products.json";

export default function ProductPage() {
  const params = useParams();

  const id = parseInt(
    Array.isArray(params.id) ? params.id[0] : params.id
  );

  const product = productsData.find(
    (p) => p.id === id
  );

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <main className="p-6 text-center">
      <img
        src={product.image}
        className="h-60 mx-auto"
      />

      <h1 className="text-2xl font-bold mt-4">
        {product.title}
      </h1>

      <p className="mt-2 text-lg">
        ₹ {product.price}
      </p>
    </main>
  );
}