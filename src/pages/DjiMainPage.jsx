import React from "react";
import { useLanguage } from "../context/LanguageContext";
import IhaDjiPage from "./IhaDjiPage";
import ProductCard from "../components/product/ProductCard";

const DjiMainPage = () => {
  const { data } = useLanguage();

  if (!data || !data.products) return null;

  // Dock 3'ü hariç tut ve Matrice 4 ürünlerini en üste al
  const filtered = data.products.filter(
    (item) =>
      item.category?.toLowerCase() === "iha" &&
      item.brand?.toLowerCase() === "dji" &&
      item.id !== 149 // Dock 3'ü hariç tut
  );

  if (filtered.length === 0) return null;

  const matrice4Products = filtered.filter((item) =>
    [150, 151].includes(item.id)
  ); // Matrice 4 ürünleri
  const otherProducts = filtered.filter(
    (item) => ![150, 151, 170].includes(item.id)
  ); // Diğer ürünler (170: IhaDjiPage için)

  const renderedTypeTitles = new Set();

  return (
    <div className="w-10/12 mx-auto py-4">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold text-orange-500">IHA - DJI</h2>
      </div>

      {/* Matrice 4 ürünleri */}
      {matrice4Products.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">Matrice 4 Serisi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {matrice4Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div
            className="h-[3px] bg-gradient-to-r from-gray-400 to-orange-500 mt-6"
            style={{
              width: `${(matrice4Products.length % 4 || 4) * (100 / 4)}%`,
            }}
          ></div>
        </div>
      )}

      {/* IhaDjiPage */}
      <div className="mb-16">
        <IhaDjiPage />
      </div>

      {/* Diğer ürünler */}
      {otherProducts.map((product) => {
        if (renderedTypeTitles.has(product.typeTitle)) {
          return null;
        }

        const groupItems = filtered.filter(
          (p) => p.typeTitle === product.typeTitle && ![150, 151, 170].includes(p.id)
        );

        renderedTypeTitles.add(product.typeTitle);

        return (
          <div key={product.typeTitle} className="mb-10">
            <h2 className="text-3xl font-bold text-center">
              {product.typeTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {groupItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            <div
              className="h-[3px] bg-gradient-to-r from-gray-400 to-orange-500 mt-6"
              style={{
                width: `${(groupItems.length % 4 || 4) * (100 / 4)}%`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default DjiMainPage;
