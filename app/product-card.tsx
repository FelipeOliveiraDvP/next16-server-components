import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/${product.id}`}>
      <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded"
            priority
          />
        </div>
        <h2 className="text-xl font-semibold mb-2 truncate">{product.title}</h2>
        <p className="text-gray-700 mb-2 line-clamp-3">{product.description}</p>
        <p className="text-lg font-bold mb-2">${product.price}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
      </div>
    </Link>
  );
}
