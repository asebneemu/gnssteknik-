// Yeni IhaDjiPage.jsx yapısı
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-orange-600 transition"
        >
          <FaChevronLeft className="text-3xl" />
        </button>

        {/* Ürün kartı */}
        <div className="w-[135%] flex items-stretch"> {/* Genişlik artırıldı */}
          <div className="w-full flex flex-col">
            <ProductCard
              product={products[current]}
              className="h-[450px]" // Kart yüksekliği artırıldı
            />
          </div>
        </div>

        {/* Sağ ok */}
        <button
          onClick={nextSlide}
          className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-orange-600 transition"
        >
          <FaChevronRight className="text-3xl" />
        </button>
      </div>

      {/* Slider göstergeleri */}
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

  const getProductsByIds = (ids) =>
    data.products.filter((item) => ids.includes(item.id));

  const getProductsByTypeTitle = (title) =>
    data.products.filter((item) => item.typeTitle === title);

  // Matrice 4 + Dock 3 kısmı
  const matrice4Ids = [150, 151];
  const dock3Id = 149;

  const matrice4Products = getProductsByIds(matrice4Ids);
  const dock3Product = getProductsByIds([dock3Id]);

  // Matrice 350 + Zenmuse kısmı
  const matrice350Products = getProductsByTypeTitle("Matrice 350");
  const zenmusePayloadIds = [200, 201, 202, 190, 191, 180, 197, 198, 199, 203, 204, 205];
  const zenmuseProducts = getProductsByIds(zenmusePayloadIds);

  const zenmuseNames = zenmuseProducts.map((p) => p.name);
  const joinedZenmuse =
    zenmuseNames.length > 1
      ? zenmuseNames.slice(0, -1).join(", ") + " ve " + zenmuseNames.slice(-1)
      : zenmuseNames[0];

  return (
    <div className="mx-auto py-10">
      {/* Matrice 4 Serisi ve Dock 3 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Matrice 4 Serisi ve Dock 3 Çözümü
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Solda iki Matrice 4 kartı */}
          {matrice4Products.map((product) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
          {/* Ortadaki boşluk */}
          <div className="col-span-1"></div>
          {/* Sağda Dock 3 kartı */}
          <div className="col-span-1 flex items-center justify-center">
            <ProductCard product={dock3Product[0]} />
          </div>
        </div>
        <div className="mt-8 text-gray-700 text-lg text-center">
          <p>
            Matrice 4 Serisi, DJI Dock 3 Çözümü ile birlikte kullanılabilir.
          </p>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-gray-400 to-orange-500 mt-6"></div>
      </div>

      {/* Matrice 350 ve Zenmuse */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Matrice 350 ve Zenmuse Serisi Faydalı Yükler 
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Solda tek Matrice 350 kartı */}
          <div className="col-span-1 flex items-center justify-center">
            <ProductCard product={matrice350Products[0]} />
          </div>
          {/* Ortadaki boşluk */}
          <div className="col-span-2"></div>
          {/* Sağda Zenmuse slider */}
          <div className="col-span-1">
            <ZenmuseSlider products={zenmuseProducts} />
          </div>
        </div>
        <div className="mt-8 text-gray-700 text-lg text-center">
          <p>
            Matrice 350, {joinedZenmuse} gibi çeşitli yüklerle birlikte
            kullanılmaktadır.
          </p>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-gray-400 to-orange-500 mt-6"></div>
      </div>
    </div>
  );
};

export default IhaDjiPage;
