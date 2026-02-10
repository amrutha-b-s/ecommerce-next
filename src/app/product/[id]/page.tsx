"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = localStorage.getItem("cart");
    const cart: Product[] = existingCart ? JSON.parse(existingCart) : [];

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 mx-auto object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">₹ {product.price}</p>

          <button
            onClick={addToCart}
            className="mt-6 px-6 py-2 bg-black text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
