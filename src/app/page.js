import Link from "next/link";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="border p-4 rounded hover:shadow-lg transition cursor-pointer">
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
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
