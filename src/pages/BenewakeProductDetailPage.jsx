import React from "react";
import { motion } from "framer-motion";

export default function BenewakeProductDetailPage({ product }) {
  if (!product) return null;

  const { title, description, images = [], specs = [], buyUrl } = product;

  // Görsel sıralamalar 1 ötelendi (images[0] atlandı)
  const paragraphSpecs = specs.slice(0, 4);
  const gridImages = images.slice(6); // 🔹 6. görselden (images[6]) sonrası
  const remainingSpecs = specs.slice(4);

  const distributeSpecsToImages = (specsList, imageCount) => {
    const result = Array.from({ length: imageCount }, () => []);
    specsList.forEach((spec, index) => {
      result[index % imageCount].push(spec);
    });
    return result;
  };

  const distributedSpecs = distributeSpecsToImages(remainingSpecs, gridImages.length);

  const renderMedia = (src, className = "") => {
    if (!src || src.includes("bos.jpg")) return null;
    const ext = src.split(".").pop().toLowerCase();
    const isVideo = ext === "mp4" || ext === "webm";
    return isVideo ? (
      <video
        src={src}
        className={className}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        src={src}
        className={className}
        alt="Medya"
      />
    );
  };

  return (
    <div className="flex flex-col w-full">

      {/* 🟦 1. Bölüm → Artık images[1] */}
      <div className="relative w-full bg-[#0a0f3c]">
        {renderMedia(
          images?.[1],
          "w-full h-[calc(100vh-90px)] object-cover"
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg">{title}</h1>
          <p className="mt-6 text-2xl max-w-3xl text-white/90">{description}</p>
          {/* — Satın Al Butonu */}
          {buyUrl && (
            <button
              onClick={() => window.open(buyUrl, "_blank")}
              className="
                mt-4
                px-6 py-2
                text-white font-semibold
                border border-white/20
                bg-white/10 backdrop-blur-md
                rounded-md
                transition-all duration-300
                hover:bg-blue-200/30
                hover:border-blue-200/50
                hover:scale-105 shadow-lg
              "
            >
              Satın Al
            </button>
          )}
        </div>
      </div>

{/* 🟦 2. Bölüm → images[2] */}
{!(images?.[2]?.includes("bos.jpg")) && (
  <div className="w-full bg-[rgb(3,2,7)] py-20 px-6 flex flex-col items-center relative">
    {/* 🔹 Görsel */}
    {renderMedia(
      images?.[2],
      "w-[80%] rounded-xl shadow-lg object-cover"
    )}

    {/* 🔹 Altına yerleştirilen sarkan açıklamalar */}
    {product?.p?.length > 0 && (
  <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center items-stretch w-full px-4">
    {product.p.slice(0, 3).map((text, idx) => (
      <motion.div
        key={idx}
        className="w-full md:w-1/3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-8 text-white font-semibold text-base md:text-lg text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[220px] flex items-center justify-center"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 + idx * 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {text}
      </motion.div>
    ))}
  </div>
)}

  </div>
)}


      {/* 📐 3. Bölüm → images[3], [4], [5] */}
<div className="w-[80%] mx-auto bg-white py-20 flex flex-col gap-10">
  {/* Metin kısmı */}
  <div className="w-full flex justify-center md:justify-end">
    <motion.div
      className="
        w-[90%]      /* Mobilde %90 genişlik */
        md:w-[40%]   /* MD+ ekranlarda %40 genişlik */
        text-justify text-lg md:text-xl text-gray-700 font-medium leading-relaxed
      "
      initial={{ x: -200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {paragraphSpecs.join(' ')}
    </motion.div>
  </div>

  {/* Görseller */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    {images.slice(3, 6).map((src, idx) => (
      <div key={idx} className="w-full h-[300px] rounded-xl shadow-lg overflow-hidden">
        {renderMedia(src, 'w-full h-full object-cover')}
      </div>
    ))}
  </div>
</div>


      {/* 🟦 4. Bölüm → images[6] sonrası */}
<div className="w-[80%] mx-auto py-20 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
  {gridImages.map((src, index) => (
    <div
      key={index}
      className="relative w-full h-[300px] overflow-hidden rounded-xl shadow-md"
    >
      {renderMedia(src, "w-full h-full object-cover")}

      {/* Mavi overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] md:h-1/2 bg-blue-500/50 flex items-center justify-center px-4">
        <p className="text-sm md:text-lg text-white text-center font-semibold leading-relaxed">
          {distributedSpecs[index]?.join(" ") || "Özellik bilgisi"}
        </p>
      </div>
    </div>
  ))}
</div>


    </div>
  );
}
