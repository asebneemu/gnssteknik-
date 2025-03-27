import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { useLanguage } from "../../context/LanguageContext"; // useLanguage kullanıyoruz

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { compareList, toggleCompare, isInCompare } = useCompare();
  const { language } = useLanguage(); // Dil seçimini alıyoruz

  if (!product) {
    return null;
  }

  const isCompared = isInCompare(product.id);
  const mainImage = product.images?.[0] || product.image;

  // Dil seçimine göre metinleri ayarlıyoruz
  const moreInfoText = language === "tr" ? "Daha Fazla Bilgi" : "More Info";
  const compareText = language === "tr" ? "Karşılaştır" : "Compare";
  const removeText = language === "tr" ? "Kaldır" : "Remove";

  // Dil seçimine göre yol ayarı
  const categoryPath = language === "tr" ? "kategori" : "category";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[580px] p-5 relative transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-4 mb-4 line-clamp-3">{product.description}</p>
        <p className="text-xs text-gray-500 mb-4">{product.typeTitle}</p>
        
        <div className="mt-auto flex flex-col gap-4">
          <button
            onClick={() =>
              navigate(`/${categoryPath}/${product.category}/${product.brand}/${product.id}`)
            }
            className="bg-orange-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-orange-600 transition"
          >
            {moreInfoText}
          </button>

          <button
            onClick={() => toggleCompare(product)}
            className={`px-4 py-2 rounded-md text-white ${
              isCompared ? "bg-gray-500" : "bg-gray-700"
            } transition`}
          >
            {isCompared ? removeText : compareText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
