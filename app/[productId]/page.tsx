import { Product } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const res = await fetch(`https://dummyjson.com/products/${productId}`, {
    cache: "no-store",
  });
  const product: Product = await res.json();

  return (
    <main>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </main>
  );
}
