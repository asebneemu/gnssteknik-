// pages/GeosunProductDetailPage.jsx
import React, { useRef, useEffect } from "react";
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

  // refs & controls for in-view detection
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
      {/* 1. HERO DIV (statik) */}
      <div className="bg-gray-900 py-16">
        <div className="w-[70%] mx-auto flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/2">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
            <p className="text-white">{product.meta.description}</p>
            <div className="flex gap-4">
  {product.buyUrl && (
    <button
      onClick={() => window.open(product.buyUrl, "_blank")}
      className="
        px-6 py-2
        bg-white/10 backdrop-blur-sm
        text-white font-medium
        border border-white
        rounded-md
        transition-colors duration-300
        hover:bg-red-600 hover:border-red-600
      "
    >
      Satın Al
    </button>
  )}
  {product.brochureUrl && (
    <a
      href={product.brochureUrl}
      download
      className="
        px-6 py-2
        bg-white/10 backdrop-blur-sm
        text-white font-medium
        border border-white
        rounded-md
        transition-colors duration-300
        hover:bg-red-600 hover:border-red-600
      "
    >
      Broşür İndir
    </a>
  )}
</div>

          </div>
        </div>
      </div>

      {/* 2. SECOND DIV */}
      <div className="bg-gray-200 py-16">
        {/* Sol blok */}
        <motion.div
          ref={refLeft}
          className="relative w-[70%] mb-16"
          initial="hidden"
          animate={controlsLeft}
          variants={slideInLeft}
        >
          <div className="flex justify-end">
            <img
              src={product.images[1]}
              alt=""
              className="h-[30rem] w-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute -top-6 left-[30%] z-10 rotate-1">
            <div className="bg-white/60 p-6 rounded-lg shadow-lg max-w-md">
              <p className="text-gray-800">{firstSpecs}</p>
            </div>
          </div>
        </motion.div>

        {/* Sağ blok */}
        <motion.div
          ref={refRight}
          className="relative w-[70%] ml-auto"
          initial="hidden"
          animate={controlsRight}
          variants={slideInRight}
        >
          <div className="flex justify-start">
            <img
              src={product.images[2]}
              alt=""
              className="h-[30rem] w-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute -top-6 right-[30%] z-10 -rotate-1">
            <div className="bg-white/60 p-6 rounded-lg shadow-lg max-w-md">
              <p className="text-gray-800">{secondSpecs}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
