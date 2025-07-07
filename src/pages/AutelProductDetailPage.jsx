// pages/AutelProductDetailPage.jsx
import React from "react";
import AutelHero from "../components/autel/AutelHero";
import AutelZoomSequence from "../components/autel/AutelZoomSequence";
import ImageSpecsOverlay from "../components/autel/ImageSpecsOverlay";

export default function AutelProductDetailPage({ product }) {
  if (!product) {
    return (
      <div className="w-10/12 mx-auto py-10 text-center text-red-600 text-xl">
        Ürün bilgisi eksik.
      </div>
    );
  }

  // 10. görsel
  const overlaySrc = product.images[9];
  // Tüm specs’ler
  const allSpecs = product.specs;

  return (
    <div className="autel-product-detail-page">
      <AutelHero
        images={product.images}
        name={product.name}
        metaDescription={product.meta.description}
        onBuyClick={() => window.open(product.buyUrl, "_blank")}
      />
      {/* Diğer bölümler burada */}
      <AutelZoomSequence
        images={product.images}
        specs={product.specs} // product.specs en az 9 öğeyi içermeli
      />
      <ImageSpecsOverlay src={overlaySrc} specs={allSpecs} />
    </div>
  );
}
