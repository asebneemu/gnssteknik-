import React, { useState } from "react";
import ProductCard from "./product/ProductCard"; // Ürün kartı bileşeni
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // İkonlu oklar için import

const ZenmuseSlider = ({ products }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="relative w-full flex justify-center items-center">
        {/* Sol ok */}
        <button
          onClick={prevSlide}
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-10"
        >
          <FaChevronLeft className="text-3xl" /> {/* İkonlu ok */}
        </button>

        {/* Ürün kartı */}
        <div className="w-[90%]">
          <ProductCard product={products[current]} />
        </div>

        {/* Sağ ok */}
        <button
          onClick={nextSlide}
          className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-10"
        >
          <FaChevronRight className="text-3xl" /> {/* İkonlu ok */}
        </button>
      </div>

      {/* Slider göstergeleri */}
      <div className="mt-4 flex gap-2">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === current ? "bg-orange-500" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ZenmuseSlider;
