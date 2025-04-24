import React from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";
import ZenmuseSlider from "../components/ZenmuseSlider"; // ZenmuseSlider'ı doğru yoldan import ediyoruz

const IhaDjiPage = () => {
  const { data } = useLanguage();

  const getProductsByIds = (ids) =>
    data.products.filter((item) => ids.includes(item.id));

  const getProductsByTypeTitle = (title) =>
    data.products.filter((item) => item.typeTitle === title);

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
    <div className="mx-auto">
      {/* Matrice 350 ve Zenmuse */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-black mb-20">
          Matrice 350 Serisi ve Zenmuse Serisi Faydalı Yükler
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1 flex items-center justify-center">
            <ProductCard product={matrice350Products[0]} />
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-1">
            <ZenmuseSlider products={zenmuseProducts} /> {/* ZenmuseSlider burada kullanılıyor */}
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
