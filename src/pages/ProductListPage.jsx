import React from "react";
import { useParams } from "react-router-dom";
import data from "../data.json";
import ProductCard from "../components/product/ProductCard";

const ProductListPage = ({ products }) => {
  const { category, brand } = useParams();

  const normalizedCategory = category ? category.replace("/", "") : "";
  const normalizedBrand = brand ? brand.replace("/", "") : "";

  const filteredProducts = data.products.filter(
    (item) =>
      item.category.toLowerCase() === normalizedCategory.toLowerCase() &&
      (normalizedBrand
        ? item.brand.toLowerCase() === normalizedBrand.toLowerCase()
        : true)
  );

  if (filteredProducts.length === 0) {
    return (
      <h2 className="text-center text-gray-600 text-xl mt-10">
        Ürün Bulunamadı
      </h2>
    );
  }

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const type = product.typeTitle || "diğer";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});

  return (
    <div className="w-10/12 mx-auto py-10">
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
