// BrandProductListPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";

const BrandProductListPage = () => {
  const { brand } = useParams();
  const { data, language } = useLanguage();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log("🔵 BrandProductListPage çalıştı");
    if (!data || !data.products) return;

    const brandLower = brand?.toLowerCase();
    const newFiltered = data.products.filter(
      (item) => item.brand?.toLowerCase() === brandLower
    );

    setFilteredProducts(newFiltered);
  }, [data, brand, location]);

  if (!data || !data.products) {
    return (
      <h2 className="text-center text-gray-600 text-xl mt-10">
        {language === "tr" ? "Veri yüklenemedi" : "Data could not be loaded"}
      </h2>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <h2 className="text-center text-gray-600 text-xl mt-10">
        {language === "tr" ? "Ürün Bulunamadı" : "No Products Found"}
      </h2>
    );
  }

  return (
    <div className="w-10/12 mx-auto py-10">
      <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
        {brand.toUpperCase()}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BrandProductListPage;
