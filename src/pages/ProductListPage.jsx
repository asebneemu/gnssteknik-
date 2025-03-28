import React from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";

const ProductListPage = () => {
  const { category, brand } = useParams(); // URL'den category ve brand parametrelerini alıyoruz
  const { data, language } = useLanguage(); // Dil ve veri alıyoruz

  if (!data || !data.products) {
    return (
      <h2 className="text-center text-gray-600 text-xl mt-10">
        {language === "tr" ? "Veri yüklenemedi" : "Data could not be loaded"}
      </h2>
    );
  }

  // Ürünleri filtrele
  const filteredProducts = data.products.filter(
    (item) =>
      item.category?.toLowerCase() === category?.toLowerCase() &&
      (brand ? item.brand?.toLowerCase() === brand?.toLowerCase() : true)
  );

  if (filteredProducts.length === 0) {
    return (
      <h2 className="text-center text-gray-600 text-xl mt-10">
        {language === "tr" ? "Ürün Bulunamadı" : "No Products Found"}
      </h2>
    );
  }

  // Ürünleri türlerine göre grupla
  const groupedProducts = filteredProducts.reduce(
    (acc, product) => {
      const type = product.typeTitle || ""; // Eğer typeTitle yoksa hiçbir şey yazılmayacak.
      if (!acc[type]) acc[type] = [];
      acc[type].push(product);
      return acc;
    },
    {}
  );

  return (
    <div className="w-10/12 mx-auto py-10">
      {/* En üstte kategori ve marka bilgisi */}
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold text-orange-500">
          {category.toUpperCase()} - {brand.toUpperCase()}
        </h2>
      </div>

      {/* Tür belirtilen ürünler */}
      {Object.entries(groupedProducts).map(([typeTitle, products]) => (
        <div key={typeTitle} className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">{typeTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListPage;
