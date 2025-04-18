import React from "react";
import { useLanguage } from "../context/LanguageContext";
import IhaDjiPage from "./IhaDjiPage";
import ProductCard from "../components/product/ProductCard";

const DjiMainPage = () => {
  const { data } = useLanguage();

  if (!data || !data.products) return null;

  // Filtre: sadece iha ve dji olan ürünleri al
  const filtered = data.products.filter(
    (item) =>
      item.category?.toLowerCase() === "iha" &&
      item.brand?.toLowerCase() === "dji"
  );

  if (filtered.length === 0) return null;

  const renderedTypeTitles = new Set();

  return (
    <div className="w-10/12 mx-auto py-10">
      {/* Üst Başlık */}
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold text-orange-500">IHA - DJI</h2>
      </div>

      {/* Ürünleri sırayla işleyerek hem IhaDjiPage hem de gridli listeleri sırayla göstereceğiz */}
      {filtered.map((product) => {
        // Özel durum: ID 170 ise IhaDjiPage çalıştır
        if (product.id === 170) {
          return (
            <div key="iha-dji-170" className="mb-16">
              <IhaDjiPage />
            </div>
          );
        }

        // Bu başlık zaten işlendi mi? Atla
        if (renderedTypeTitles.has(product.typeTitle)) {
          return null;
        }

        // Aynı typetitle'a sahip ürünleri grupla
        const groupItems = filtered.filter(
          (p) => p.typeTitle === product.typeTitle && p.id !== 170
        );

        // Render edildi olarak işaretle
        renderedTypeTitles.add(product.typeTitle);

        // Grup renderı
        return (
          <div key={product.typeTitle} className="mb-10">
            <h2 className="text-3xl font-bold text-center mb-6">
              {product.typeTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {groupItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            {/* Çizgi */}
            <div
              className="h-[3px] bg-gradient-to-r from-gray-400 to-orange-500 mt-6"
              style={{
                width: `${(groupItems.length % 4 || 4) * (100 / 4)}%`, // Son satırdaki ürünlerin genişliği
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default DjiMainPage;
