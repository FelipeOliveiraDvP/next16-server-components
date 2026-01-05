import { Product } from "@/types";
import ImageGallery from "@/components/image-gallery";
import Link from "next/link";
import BackToTopButton from "@/components/back-to-top-button";

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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
    }).format(value || 0);

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("pt-BR") : "—";

  return (
    <main className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/80 shadow-sm hover:bg-black/5"
        >
          ← Voltar para o catálogo
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-0 lg:p-4">
          <ImageGallery
            images={Array.isArray(product.images) ? product.images : []}
          />
        </div>

        <section className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl md:text-2xl font-semibold">
              {product.title}
            </h1>
            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-xs text-black/70">
              {product.category}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-black/70">
            <div>Marca: {product.brand || "—"}</div>
            <div>SKU: {product.sku || "—"}</div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="text-2xl font-bold">
              {formatCurrency(product.price)}
            </div>
            {product.discountPercentage ? (
              <div className="text-sm text-green-700">
                Desconto: {product.discountPercentage}%
              </div>
            ) : null}
            <div className="text-sm text-black/60">
              Avaliação: {product.rating} ★
            </div>
            {product.stock > 0 ? (
              <span className="text-xs rounded-md bg-green-100 px-2 py-1 text-green-700">
                Em estoque
              </span>
            ) : (
              <span className="text-xs rounded-md bg-red-100 px-2 py-1 text-red-700">
                Indisponível
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-black/80">
            {product.description}
          </p>

          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs text-black/70"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Specs */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-black/10 bg-white/50 p-3">
              <h2 className="text-sm font-medium">Dimensões</h2>
              <div className="mt-1 text-sm text-black/70">
                Largura: {product.dimensions?.width ?? "—"} • Altura:{" "}
                {product.dimensions?.height ?? "—"} • Profundidade:{" "}
                {product.dimensions?.depth ?? "—"}
              </div>
              <div className="mt-1 text-sm text-black/70">
                Peso: {product.weight ?? "—"}
              </div>
              <div className="mt-1 text-sm text-black/70">
                Quantidade mínima: {product.minimumOrderQuantity ?? "—"}
              </div>
            </div>
            <div className="rounded-md border border-black/10 bg-white/50 p-3">
              <h2 className="text-sm font-medium">Disponibilidade</h2>
              <div className="mt-1 text-sm text-black/70">
                Status: {product.availabilityStatus || "—"}
              </div>
              <div className="mt-1 text-sm text-black/70">
                Estoque: {product.stock ?? "—"}
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-black/10 bg-white/50 p-3">
              <h2 className="text-sm font-medium">Garantia</h2>
              <p className="mt-1 text-sm text-black/70">
                {product.warrantyInformation || "—"}
              </p>
            </div>
            <div className="rounded-md border border-black/10 bg-white/50 p-3">
              <h2 className="text-sm font-medium">Envio</h2>
              <p className="mt-1 text-sm text-black/70">
                {product.shippingInformation || "—"}
              </p>
            </div>
            <div className="rounded-md border border-black/10 bg-white/50 p-3 sm:col-span-2">
              <h2 className="text-sm font-medium">Devolução</h2>
              <p className="mt-1 text-sm text-black/70">
                {product.returnPolicy || "—"}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-6 rounded-md border border-black/10 bg-white/50 p-3">
            <h2 className="text-sm font-medium">Metadados</h2>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-black/70">
              <div>Criado em: {formatDate(product.meta?.createdAt)}</div>
              <div>Atualizado em: {formatDate(product.meta?.updatedAt)}</div>
              <div>Barcode: {product.meta?.barcode || "—"}</div>
              <div>QR Code: {product.meta?.qrCode || "—"}</div>
            </div>
          </div>

          {/* Reviews */}
          {Array.isArray(product.reviews) && product.reviews.length > 0 && (
            <div className="mt-6 rounded-lg border border-black/10 bg-white p-3">
              <h2 className="text-sm font-medium">Avaliações</h2>
              <ul className="mt-2 space-y-3">
                {product.reviews.map((r, i) => (
                  <li
                    key={`${r.reviewerEmail}-${i}`}
                    className="rounded-md border border-black/10 bg-white/50 p-3"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {r.reviewerName || "Usuário"}
                      </span>
                      <span className="text-black/60">
                        {formatDate(r.date)} • {r.rating} ★
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-black/80">{r.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              className="h-10 rounded-md bg-black px-4 text-sm font-medium text-white shadow-sm hover:bg-black/85"
            >
              Comprar
            </button>
            <button
              type="button"
              className="h-10 rounded-md border border-black/15 bg-white px-4 text-sm font-medium text-black/80 shadow-sm hover:bg-black/5"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </section>
        {/* Floating back-to-top button */}
        <BackToTopButton />
      </div>
    </main>
  );
}
