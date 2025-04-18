import React, { useState } from "react";
import ProductCard from "./product/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ZenmuseSlider = ({ products }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="lg:hidden flex flex-col items-center mt-8">
      <div className="relative w-full flex justify-center items-center">
        {/* Sol ok */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ChevronLeftIcon className="w-8 h-8 text-gray-600 hover:text-orange-500 transition" />
        </button>

        {/* Kart */}
        <div className="w-[80%] sm:w-[60%] md:w-[50%]">
          <ProductCard product={products[current]} />
        </div>

        {/* Sağ ok */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ChevronRightIcon className="w-8 h-8 text-gray-600 hover:text-orange-500 transition" />
        </button>
      </div>

      {/* Noktalar */}
      <div className="mt-4 flex gap-2">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === current ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ZenmuseSlider;
