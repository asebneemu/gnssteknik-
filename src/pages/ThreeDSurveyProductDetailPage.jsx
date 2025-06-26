import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ThreeDSurveyProductDetailPage = ({ product }) => {
  if (!product) return null;

  const { images, specs, title, description, buyUrl } = product;

  // Görsel ve ikon eşle
  const visualImageCount = Math.floor(images.length / 2);
  const pairedImages = [];
  for (let i = 0; i < visualImageCount; i++) {
    pairedImages.push({
      image: images[i * 2],
      icon: images[i * 2 + 1],
    });
  }

  // Specs dağıt
  const distributeSpecs = (specs, imageCount) => {
    const result = Array.from({ length: imageCount }, () => []);
    specs.forEach((spec, index) => {
      result[index % imageCount].push(spec);
    });
    return result;
  };

  const distributedSpecs = distributeSpecs(specs, pairedImages.length);

  // Görsel veya video render bileşeni
  const MediaRenderer = ({ src }) => {
    const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
    return isVideo ? (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto rounded-2xl shadow-xl object-cover"
      />
    ) : (
      <img
        src={src}
        alt="Görsel"
        className="w-full h-auto rounded-2xl shadow-xl object-cover"
      />
    );
  };

  return (
    <div className="bg-black text-white py-20 flex flex-col items-center gap-24">
      {/* Satın Al Butonu */}
      {buyUrl && (
        <button
          onClick={() => window.open(buyUrl, "_blank")}
          className="mb-12 px-8 py-3 text-lg md:text-xl font-semibold text-white bg-white/10 border border-white/20 rounded-xl shadow-md backdrop-blur-md hover:bg-blue-600 hover:border-blue-600 hover:scale-105 transition-all duration-300"
        >
          Satın Al
        </button>
      )}

      {/* Başlık ve Açıklama */}
      <h1 className="text-5xl font-bold text-center">{title}</h1>
      <p className="text-xl text-gray-300 max-w-4xl text-center">{description}</p>

      {/* İçerik Blokları */}
      {pairedImages.map((pair, index) => {
        const currentSpecs = distributedSpecs[index];
        const isImageLeft = index % 2 === 0;
        const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.8 });

        return (
          <div
            key={index}
            className="w-[75%] grid md:grid-cols-5 gap-12 items-center"
          >
            {/* Görsel (5/3) */}
            <div className={`md:col-span-3 ${isImageLeft ? "" : "md:order-2"}`}>
              <MediaRenderer src={pair.image} />
            </div>

            {/* Yazı ve ikon (5/2) */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
              className={`md:col-span-2 text-lg md:text-xl text-gray-100 leading-relaxed flex flex-col gap-6 ${
                isImageLeft ? "items-end text-right" : "items-start text-left"
              }`}
            >
              <img
                src={pair.icon}
                alt={`ikon-${index}`}
                className="w-24 h-24 object-contain"
              />
              <p className="max-w-xl">{currentSpecs.join(" ")}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default ThreeDSurveyProductDetailPage;
