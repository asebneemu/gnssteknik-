// components/SenceiveHero.jsx
import React from "react";

/**
 * SenceiveHero component
 * Props:
 * - name: string
 * - meta: { description: string }
 * - images: string[] (görseller dizisi; sadece index 1 kullanılır)
 */
const SenceiveHero = ({ name, meta: { description }, images = [] }) => {
  // sadece ikinci resmi arka plan olarak kullan
  const backgroundImageUrl = images.length > 1 ? images[1] : "";

  return (
    <section className="relative w-full h-screen">
      {/* Arka plan resmi */}
      <div className="absolute inset-0">
        <img
          src={backgroundImageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Kahverengi/ haki tonlu pastoral overlay */}
        <div className="absolute inset-0 bg-brown-900/30 mix-blend-multiply" />
      </div>

      {/* İçerik bloğu */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white">
          {name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-2xl text-white/90">
          {description}
        </p>
        <div className="mt-8 flex space-x-4">
          <button
            className="
              px-6 py-3 
              rounded-md 
              bg-white/20 
              backdrop-blur-sm 
              border border-transparent 
              text-white 
              transition 
              hover:bg-yellow-100/40 
              hover:border-yellow-300
            "
          >
            Satın Al
          </button>
          <button
            className="
              px-6 py-3 
              rounded-md 
              bg-white/20 
              backdrop-blur-sm 
              border border-transparent 
              text-white 
              transition 
              hover:bg-green-100/40 
              hover:border-green-300
            "
          >
            Broşür İndir
          </button>
        </div>
      </div>
    </section>
  );
};

export default SenceiveHero;
