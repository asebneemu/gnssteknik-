import React from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import DjiHeroVideo from "../components/dji/DjiHeroVideo";
import DjiSpecCards from "../components/dji/DjiSpecCards";

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

const DjiProductDetailPage = () => {
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

  const visuals = product.images || [];
  const videoUrl = visuals.find((v) => /\.(mp4|webm)$/i.test(v));
  const imageUrl = visuals.find((v) => !/\.(mp4|webm)$/i.test(v));

  return (
    <div className="relative w-full">
      <DjiHeroVideo
        name={product.name}
        meta={product.meta}
        videoUrl={videoUrl}
        imageUrl={product.imageUrl || product.images?.[1]}
        buyUrl={product.buyUrl} 
      />
      <DjiSpecCards product={product} />
    </div>
  );
};

export default DjiProductDetailPage;
