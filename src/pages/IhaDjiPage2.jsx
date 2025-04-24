import React from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";

const IhaDjiPage2 = () => {
  const { data } = useLanguage();

  const getProductsByIds = (ids) =>
    data.products.filter((item) => ids.includes(item.id));

  const dock3Id = 149;
  const matrice4DIds = [208, 209];

  const dock3Product = getProductsByIds([dock3Id]);
  const matrice4Products = getProductsByIds(matrice4DIds);

  return (
    <div className="mx-auto">
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Dock 3 Çözümü ve Matrice 4D Serisi
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 flex items-center justify-center">
            <ProductCard product={dock3Product[0]} />
          </div>
          <div className="col-span-1"></div>
          {matrice4Products.map((product) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-8 text-gray-700 text-lg text-center">
          <p>
            DJI Dock 3 Çözümü, Matrice 4D Serisi ile birlikte kullanılabilir.
          </p>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-gray-400 to-orange-500 mt-6"></div>
      </div>
    </div>
  );
};

export default IhaDjiPage2;
