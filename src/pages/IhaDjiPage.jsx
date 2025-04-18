import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons'dan ikonlar

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
        {/* Sol Ok */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-400"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        {/* Ürün Kartı */}
        <div className="w-[90%]">
          <ProductCard product={products[current]} />
        </div>

        {/* Sağ Ok */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-400"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>

      {/* Slider Göstergeleri */}
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

const IhaDjiPage = () => {
  const { data } = useLanguage();

  const matrice350List = [200, 201, 202, 190, 191, 180];

  const typeGroups = {
    "Matrice 350": matrice350List,
  };

  const getProductsByIds = (ids) =>
    data.products.filter((item) => ids.includes(item.id));

  const getProductsByTypeTitle = (title) =>
    data.products.filter((item) => item.typeTitle === title);

  return (
    <div className="mx-auto py-10">
      {Object.entries(typeGroups).map(([droneTitle, payloadIds], index) => {
        const droneProducts = getProductsByTypeTitle(droneTitle);
        const payloadProducts = getProductsByIds(payloadIds);
        const rightTitle = payloadProducts[0]?.typeTitle;

        const rightNames = payloadProducts.map((p) => p.name);
        const joinedNames =
          rightNames.length > 1
            ? rightNames.slice(0, -1).join(", ") + " ve " + rightNames.slice(-1)
            : rightNames[0];

        return (
          <div key={index} className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-6 text-black">
              {droneTitle}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sol: Drone Ürünleri */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 gap-10">
                  {droneProducts.map((product) => (
                    <div className="origin-left" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sağ: Payloadlar (Slider veya sabit) */}
              <div>
                {/* Slider (xl altında) */}
                <div className="">
                  <ZenmuseSlider products={payloadProducts} />
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="mt-8 text-gray-700 text-lg text-center">
              <p>
                {droneTitle}, {joinedNames} adlı {rightTitle} ile birlikte
                kullanılmaktadır.
              </p>
            </div>

            <div className="h-[3px] w-full bg-gradient-to-r from-gray-400 to-orange-500 mt-6"></div>
          </div>
        );
      })}
    </div>
  );
};

export default IhaDjiPage;
