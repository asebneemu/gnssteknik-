// pages/SenceiveProductDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SenceiveHero from "../components/senceive/SenceiveHero";

// slugify fonksiyonu
const slugify = (str) =>
  str
    ?.toString()
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const SenceiveProductDetailPage = () => {
  const { data } = useLanguage();
  const { category, brand, slug } = useParams();

  const products = data?.products || [];
  const product = products.find(
    (p) =>
      slugify(p.category) === slugify(category) &&
      slugify(p.brand) === slugify(brand) &&
      slugify(p.name) === slugify(slug)
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        Ürün bulunamadı.
      </div>
    );
  }

  return (
    <div className="w-full">
      <SenceiveHero
        name={product.name}
        meta={{ description: product.meta.description }}
        images={product.images}
      />
      {/* Diğer bölümler: Specs, Gallery, Benefits... */}
    </div>
  );
};

export default SenceiveProductDetailPage;
