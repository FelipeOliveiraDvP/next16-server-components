"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

export type ImageGalleryProps = {
  images: string[];
  className?: string;
};

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const slides = useMemo(
    () =>
      images.map((src, i) => {
        const fileName = src.split("/").pop() || `Image ${i + 1}`;
        const alt = fileName
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .trim();
        return { src, alt };
      }),
    [images]
  );

  const currentAlt = slides[activeIndex]?.alt ?? "Product image";

  return (
    <div className={className}>
      <div className="relative w-full aspect-square overflow-hidden rounded-md bg-white ring-1 ring-black/5">
        <Image
          src={slides[activeIndex].src}
          alt={currentAlt}
          fill
          sizes="(min-width: 1024px) 640px, (min-width: 640px) 480px, 90vw"
          className="object-contain"
          priority
          onClick={() => setOpen(true)}
        />

        <button
          type="button"
          aria-label="Abrir galeria"
          onClick={() => setOpen(true)}
          className="absolute bottom-2 right-2 rounded-md bg-black/70 px-3 py-1 text-xs font-medium text-white hover:bg-black"
        >
          Zoom
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {slides.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            aria-label={`Mostrar miniatura ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-black/10 hover:ring-black/30 ${
              i === activeIndex ? "ring-2 ring-blue-500" : ""
            }`}
            style={{ background: "#f3f3f3" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={activeIndex}
        plugins={[Thumbnails, Zoom, Fullscreen]}
        carousel={{ finite: true }}
        on={{ view: ({ index }) => setActiveIndex(index) }}
      />
    </div>
  );
}
