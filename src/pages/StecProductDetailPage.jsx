import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function StecProductDetailPage() {
  const { data } = useLanguage();
  const product = data.products.find((p) => p.brand === "stec");

  if (!product) return null;

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
    const isVideo = src.endsWith(".mp4");
    return isVideo ? (
      <video src={src} className={className} autoPlay loop muted playsInline />
    ) : (
      <img src={src} alt={alt} className={className} />
    );
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center gap-20 py-20">
      {/* 1. Div */}
      <div className="w-[80%] flex justify-between items-center">
        <div className="w-1/2 flex justify-center">
          {renderMedia(images[1], "STEC Logo", "h-44 object-contain")}
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start pl-10">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-md max-w-[90%]">{mainDescription}</p>
        </div>
      </div>

      {/* 2. Div */}
      <motion.div
        className="w-[90%] relative flex"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="w-[60%]">
          {renderMedia(
            images[2],
            "Ürün Görseli",
            "w-full h-auto object-cover rounded-lg"
          )}
        </div>
        <div className="w-[50%] bg-black bg-opacity-60 p-6 absolute right-0 top-12 bottom-8 h-auto flex flex-col justify-center items-end rounded-lg">
          {renderMedia(images[3], "Sağdaki Görsel", "h-20 mb-4 object-contain")}
          <p className="text-left text-xl leading-relaxed max-w-[90%]">
            {paragraphSpecs}
          </p>
        </div>
      </motion.div>

      {/* 3. Div */}
      <motion.div
        className="w-full flex items-center justify-center py-20 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Sol taraf: Yazı ve kutular */}
        <div className="order-1 w-auto max-w-[520px] bg-gray-800 bg-opacity-60 rounded-xl p-8 shadow-xl z-10 mr-[-80px]">
          <div className="mb-8">
            <p className="text-lg font-semibold mb-2">{description}</p>
            <p className="text-md">{detailSpec}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {boxSpecs.map((text, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-white rounded-xl p-4 flex flex-col items-center justify-center w-56 h-48"
              >
                {renderMedia(
                  images[5 + idx],
                  `Box ${idx + 1}`,
                  "w-16 h-16 mb-3 object-contain"
                )}
                <p className="text-sm text-center">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ taraf: Video */}
        <div className="order-2 w-[50%]">
          {images[4]?.endsWith(".mp4") ? (
            <video
              src={images[4]}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[380px] object-cover rounded-xl"
            />
          ) : (
            <img
              src={images[4]}
              alt="Ürün Görseli"
              className="w-full h-[380px] object-cover rounded-xl"
            />
          )}
        </div>
      </motion.div>

      {/* 4. Div */}
      {/* 4. Div */}
      {/* 4. Div */}
      <motion.div
        className="w-full flex items-center justify-center py-20 gap-16"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Sol: Yazı Alanı */}
        <div className="flex flex-col gap-10 text-left max-w-[500px]">
          <h2 className="text-4xl font-extrabold leading-tight">{specs[8]}</h2>
          <h2 className="text-4xl font-extrabold leading-tight">{specs[9]}</h2>
        </div>

        {/* Sağ: Çerçeve + Video */}
        <div className="relative">
          {/* Çerçeve */}
          <div className="absolute top-[-24px] left-[-24px] right-[-24px] bottom-[-24px] border-2 border-white rounded-xl pointer-events-none z-0" />

          {/* Video veya Görsel */}
          <div className="w-[400px] h-[280px] rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105 relative z-10">
            {images[9]?.endsWith(".mp4") ? (
              <video
                src={images[9]}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={images[9]}
                alt="Ürün Görseli"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* 5. Div */}
     {/* 5. Div */}
<motion.div
  className="w-full flex items-center justify-center py-20 gap-8"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  {/* Sol: Video veya Görsel */}
  <div className="w-[48%] relative z-0">
    {images[10]?.endsWith(".mp4") ? (
      <video
        src={images[10]}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover rounded-lg"
      />
    ) : (
      <img
        src={images[10]}
        alt="Ürün Görseli"
        className="w-full h-auto object-cover rounded-lg"
      />
    )}
  </div>

  {/* Sağ: Yazılar birleşik paragraf olarak, videonun üzerine taşan, silik beyaz kutuda */}
  <div className="w-[40%] -ml-56 bg-black bg-opacity-20 text-white p-6 rounded-xl shadow-md relative z-10">
    <p className="text-lg leading-relaxed">
      {remainingSpecs.filter(Boolean).join(" ")}
    </p>
  </div>
</motion.div>

    </div>
  );
}
