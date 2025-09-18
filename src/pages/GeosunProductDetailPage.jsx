// pages/GeosunProductDetailPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function GeosunProductDetailPage() {
  const { data } = useLanguage();
  const { category, brand, slug } = useParams();
  const products = data.products || [];

  const slugify = (s) =>
    s
      ?.toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const product = products.find(
    (p) =>
      slugify(p.category) === slugify(category) &&
      slugify(p.brand) === slugify(brand) &&
      slugify(p.name) === slugify(slug)
  );
  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Ürün bulunamadı!
      </div>
    );
  }

  const half = Math.ceil(product.specs.length / 2);
  const firstSpecs = product.specs.slice(0, half).join(" ");
  const secondSpecs = product.specs.slice(half).join(" ");

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const [refLeft, inViewLeft] = useInView({ threshold: 0.5 });
  const controlsLeft = useAnimation();
  useEffect(() => {
    if (inViewLeft) controlsLeft.start("visible");
  }, [inViewLeft, controlsLeft]);

  const [refRight, inViewRight] = useInView({ threshold: 0.5 });
  const controlsRight = useAnimation();
  useEffect(() => {
    if (inViewRight) controlsRight.start("visible");
  }, [inViewRight, controlsRight]);

  return (
    <div>
      {/* 1. HERO DIV (responsive) */}
      <div className="bg-black py-16">
        <div className="w-[70%] mx-auto flex flex-col md:flex-row items-center overflow-hidden">
          {/* Görsel */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.images[1]}
              alt={product.name}
              className="
                w-full max-w-xs
                sm:max-w-sm
                md:max-w-[500px]
                h-auto sm:h-[200px] md:h-[300px]
                object-contain rounded-lg
              "
            />
          </div>
          {/* Mobilde: başlık/desc/buton alt */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 p-4 sm:p-8 flex flex-col justify-center space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center md:text-left">
              {product.name}
            </h2>
            <p className="text-white text-sm sm:text-base text-center md:text-left">
              {product.meta.description}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {product.buyUrl && (
                <button
                  onClick={() => window.open(product.buyUrl, "_blank")}
                  className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white font-medium border border-white rounded-md transition-colors duration-300 hover:bg-red-600 hover:border-red-600"
                >
                  Satın Al
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

 {/* 2. SECOND DIV */}
 <div className="bg-gray-200 py-16">
        <div className="w-[70%] mx-auto space-y-16">
          {/* Sol blok */}
          <motion.div
            ref={refLeft}
            className="relative mb-16"
            initial="hidden"
            animate={controlsLeft}
            variants={slideInLeft}
          >
            <div className="flex justify-end">
            <img
    src={product.images[2]}
    alt=""
    className="
      w-full h-auto          /* Mobilde tam genişlik, otomatik yükseklik */
      lg:w-[900px] lg:h-[450px] /* Desktop’ta 900×450 */
      object-cover rounded-lg shadow-2xl block
    "
  />
            </div>
            {/* MOBILE: overlay alt blok */}
            <div className="block lg:hidden mt-4">
              <div className="bg-black/40 p-6 rounded-lg shadow-lg border border-white/80">
                <p className="text-white text-sm">{firstSpecs}</p>
              </div>
            </div>
            {/* DESKTOP: yamuk overlay */}
            <div className="hidden lg:block absolute -top-6 left-[30%] z-10 rotate-1">
              <div className="bg-black/40 p-6 rounded-lg shadow-lg max-w-md border border-white/80">
                <p className="text-white">{firstSpecs}</p>
              </div>
            </div>
          </motion.div>

          {/* Sağ blok */}
          <motion.div
            ref={refRight}
            className="relative ml-auto"
            initial="hidden"
            animate={controlsRight}
            variants={slideInRight}
          >
            <div className="flex justify-start">
            <img
     src={product.images[3]}
     alt=""
     className="
       w-full h-auto
       lg:w-[900px] lg:h-[450px]
       object-cover rounded-lg shadow-2xl block
     "
   />
            </div>
            
            {/* Mobilde: alt alta yazı */}
          <div className="block lg:hidden mt-4">
            <div className="bg-black/40 p-6 rounded-lg shadow-lg border border-white/80">
              <p className="text-white text-sm">{secondSpecs}</p>
            </div>
          </div>
            {/* DESKTOP: yamuk overlay */}
            <div className="hidden lg:block absolute -top-6 right-[30%] z-10 -rotate-1">
              <div className="bg-black/40 p-6 rounded-lg shadow-lg max-w-md border border-white/80">
                <p className="text-white">{secondSpecs}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}