import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";

const ProductListPage = () => {
  const { category, brand } = useParams(); // category olabilir de olmayabilir
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { data, language } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const technology = searchParams.get("tech");

  useEffect(() => {
    console.log("✅ ProductListPage çalıştı");
    console.log("URL tech param:", technology);
    console.log("category:", category);
    console.log("brand:", brand);

    if (!data || !data.products) return;

    const newFiltered = data.products.filter((item) => {
      const brandMatch = brand
        ? item.brand?.toLowerCase() === brand.toLowerCase()
        : true;

      const categoryMatch = category
        ? item.category?.toLowerCase() === category.toLowerCase()
        : true;

      const techMatch = technology
        ? item.technology
            ?.map((t) => t.toLowerCase())
            .includes(technology.toLowerCase())
        : true;

      return brandMatch && categoryMatch && techMatch;
    });

    setFilteredProducts(newFiltered);
  }, [location, data, category, brand, technology]);

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

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const type = product.typeTitle || "";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});

  return (
    <div className="w-10/12 mx-auto py-10">
      <div className="mb-6 text-center">
        {(category || brand) && (
          <h2 className="text-4xl font-bold text-orange-500">
            {category ? category.toUpperCase() : ""}
            {brand ? ` - ${brand.toUpperCase()}` : ""}
          </h2>
        )}

        {technology && (
          <p className="text-4xl font-bold mt-2">
            <span
              className={`font-semibold uppercase ${
                technology.toLowerCase() === "flatmesh"
                  ? "text-blue-800"
                  : technology.toLowerCase() === "geowan"
                  ? "text-green-600"
                  : "text-black"
              }`}
            >
              {technology}
            </span>
          </p>
        )}
      </div>

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
