export const dynamic = "force-dynamic";

async function getProduct(id) {
  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <h1 className="p-6">Product not found</h1>;
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
