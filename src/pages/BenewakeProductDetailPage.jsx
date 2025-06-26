import React from "react";
import { motion } from "framer-motion";

export default function BenewakeProductDetailPage({ product }) {
  if (!product) return null;

  const { title, description, images = [], specs = [] } = product;

  const paragraphSpecs = specs.slice(0, 4);
  const gridImages = images.slice(5);
  const remainingSpecs = specs.slice(4);

  const distributeSpecsToImages = (specsList, imageCount) => {
    const result = Array.from({ length: imageCount }, () => []);
    specsList.forEach((spec, index) => {
      result[index % imageCount].push(spec);
    });
    return result;
  };

  const distributedSpecs = distributeSpecsToImages(remainingSpecs, gridImages.length);

  // 🔹 Ortak medya render (jpg/mp4/webp/webm + bos.jpg filtreli)
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

      {/* 🟦 1. Bölüm */}
      <div className="relative w-full bg-[#0a0f3c]">
        {renderMedia(
          images?.[0],
          "w-full h-[calc(100vh-90px)] object-cover"
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg">{title}</h1>
          <p className="mt-6 text-2xl max-w-3xl text-white/90">{description}</p>
        </div>
      </div>

      {/* 🟦 2. Bölüm */}
{!(images?.[1]?.includes("bos.jpg")) && (
  <div className="w-full bg-[rgb(3,2,7)] py-20 px-6 flex justify-center">
    {renderMedia(
      images?.[1],
      "w-[80%] rounded-xl shadow-lg object-cover"
    )}
  </div>
)}


      {/* 📐 3. Bölüm */}
      <div className="w-[80%] mx-auto bg-white py-20 flex flex-col gap-10">
        {/* Satır 1: Paragraf */}
        <div className="w-full flex justify-end">
          <motion.div
            className="w-[40%] text-justify text-lg md:text-xl text-gray-700 font-medium leading-relaxed"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {paragraphSpecs.join(" ")}
          </motion.div>
        </div>

        {/* Satır 2: 3 görsel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.slice(2, 5).map((src, idx) => (
            <div key={idx} className="w-full h-[300px] rounded-xl shadow-lg overflow-hidden">
              {renderMedia(src, "w-full h-full object-cover")}
            </div>
          ))}
        </div>
      </div>

      {/* 🟦 4. Bölüm */}
      <div className="w-[80%] mx-auto py-20 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
        {gridImages.map((src, index) => (
          <div key={index} className="relative w-full h-[300px] overflow-hidden rounded-xl shadow-md">
            {renderMedia(src, "w-full h-full object-cover")}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/50 flex items-center justify-center px-4">
              <p className="text-white text-center text-lg font-semibold leading-relaxed">
                {distributedSpecs[index]?.join(" ") || "Özellik bilgisi"}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
