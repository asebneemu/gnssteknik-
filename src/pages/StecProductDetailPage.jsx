import React from "react";
import { motion } from "framer-motion";

export default function StecProductDetailPage({ product }) {
  if (!product) return <div>Ürün bulunamadı!</div>;

  const { name, meta, images = [], specs = [], description = "" } = product;
  const mainDescription = meta?.description || "";
  const paragraphSpecs = [specs[0], specs[1], specs[2]]
    .filter(Boolean)
    .join(" ");
  const detailSpec = specs[3] || "";
  const boxSpecs = specs.slice(4, 8);
  const metricSpecs = specs.slice(8, 10);
  const remainingSpecs = specs.slice(10);

  const renderMedia = (src, alt, className) => {
    if (!src) return null;
    const ext = src.split(".").pop().toLowerCase();
    const isVideo = ["mp4", "webm", "mov", "mkv"].includes(ext);

    return isVideo ? (
      <motion.video
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    ) : (
      <motion.img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    );
  };

  return (
    <div className="bg-black text-white flex flex-col items-center gap-20 py-20">
      {/* 1. Div */}
      <div className="w-[90%] max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          {renderMedia(images[1], "STEC Logo", "h-32 object-contain")}
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-10">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-md">{mainDescription}</p>
          <button
            onClick={() => window.open(product.buyUrl, "_blank")}
            className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-md border border-white/30 shadow-sm transition duration-300 hover:bg-red-600 hover:border-red-600 hover:scale-105"
          >
            Satın Al
          </button>
        </div>
      </div>

      {/* 2. Div */}
      {paragraphSpecs && (
        <motion.div
          className="w-[90%] max-w-6xl relative flex flex-col md:flex-row"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-[60%]">
            {renderMedia(
              images[2],
              "Ürün Görseli",
              "w-full h-auto object-cover rounded-lg"
            )}
          </div>
          <div className="w-full md:w-[50%] bg-black bg-opacity-60 p-6 md:absolute md:right-0 md:top-12 md:bottom-8 flex flex-col justify-center items-end rounded-lg mt-6 md:mt-0">
            {renderMedia(
              images[3],
              "Sağdaki Görsel",
              "h-20 mb-4 object-contain"
            )}
            <p className="text-left text-lg leading-relaxed">
              {paragraphSpecs}
            </p>
          </div>
        </motion.div>
      )}

      {/* 3. Div */}
      {(description || detailSpec) && (
        <motion.div
          className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center py-20 px-4 gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Metin bloğu */}
          <div className="order-2 lg:order-1 w-full lg:max-w-[520px] bg-gray-800 bg-opacity-60 rounded-xl p-8 shadow-xl z-10">
            <div className="mb-8">
              <p className="text-lg font-semibold mb-2">{description}</p>
              <p className="text-md">{detailSpec}</p>
            </div>
            {/* Metin bloğu içindeki grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boxSpecs.map((text, idx) => {
                const src = images[5 + idx] || "";
                const isEmpty = src.toLowerCase().includes("bos.png");

                return (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-white rounded-xl p-4 flex flex-col items-center justify-center h-48"
                  >
                    {/* Eğer boş resimse atla */}
                    {!isEmpty &&
                      renderMedia(
                        src,
                        `Box ${idx + 1}`,
                        "w-16 h-16 mb-3 object-contain"
                      )}

                    {/* Yazı: boşsa büyük ve ortalı */}
                    <p
                      className={`
            ${isEmpty ? "text-md text-center" : "text-sm text-center"}
          `}
                    >
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ana Medya bloğu (MOBİLDE ORTALANDI) */}
          <div className="order-1 lg:order-2 w-full lg:w-[50%] flex justify-center items-center">
            {renderMedia(
              images[4],
              "Ana Medya",
              "block max-w-[90%] lg:max-w-full mx-auto h-auto object-cover rounded-xl"
            )}
          </div>
        </motion.div>
      )}

      {/* 4. Div (MEDYA ALANI) */}
      {(metricSpecs[0] || metricSpecs[1]) && (
        <motion.div
          className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center py-20 px-4 gap-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Metin kısmı */}
          <div className="w-full md:w-[60%] flex flex-col gap-10 text-left">
            {metricSpecs.map((spec, i) => (
              <h2
                key={i}
                className="text-3xl md:text-4xl font-extrabold leading-tight"
              >
                {spec}
              </h2>
            ))}
          </div>

          {/* Medya kısmı */}
          <div
            className="
      relative
      w-full max-w-[90%] mx-auto   /* Mobilde %90 ve ortala */
      md:w-[40%]                    /* MD+ %40 genişlik */
      min-w-[200px]
      h-[300px] md:h-[380px]
    "
          >
            <div className="absolute inset-[-24px] border-2 border-black rounded-xl pointer-events-none z-0" />
            <div className="w-full h-full rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105 relative z-10">
              {renderMedia(
                images[9],
                "Çerçeve Medya",
                "w-full h-full object-cover"
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* 5. Div */}
      {remainingSpecs.length > 0 && (
        <motion.div
          className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center py-20 px-4 gap-8"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full lg:w-[50%]">
            {renderMedia(
              images[10],
              "Alt Medya",
              "w-full h-auto object-cover rounded-lg"
            )}
          </div>
          <div className="w-full lg:w-[40%] bg-black bg-opacity-20 text-white p-6 rounded-xl shadow-md">
            <p className="text-md leading-relaxed">
              {remainingSpecs.filter(Boolean).join(" ")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
