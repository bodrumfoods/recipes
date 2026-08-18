"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  "https://bodrumfoods.co.uk/cdn/shop/files/12657155318238262723.jpg?v=1765881330&width=1200",
  "https://bodrumfoods.co.uk/cdn/shop/files/Gemini_Generated_Image_bgn5uqbgn5uqbgn5.png?v=1784619833&width=1400",
  "https://bodrumfoods.co.uk/cdn/shop/files/Bodrum-new-vinegar-collections.png?v=1773761213&width=1600",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-56 w-full overflow-hidden bg-brand-muted sm:h-72 md:h-[420px]">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Bodrum Foods promotion ${i + 1}`}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
