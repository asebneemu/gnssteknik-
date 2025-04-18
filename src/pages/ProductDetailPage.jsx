import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ProductDetailPage() {
  const { category, brand, productId } = useParams();
  const navigate = useNavigate();
  const { data } = useLanguage();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data || !data.products) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <h2 className="text-2xl font-semibold">Veri yüklenemedi</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const normalizedCategory = category?.replace("/", "").toLowerCase() || "";
  const normalizedBrand = brand?.replace("/", "").toLowerCase() || "";
  const normalizedProductId = productId?.toString() || "";

  const product = data.products.find(
    (item) =>
      item.id.toString() === normalizedProductId &&
      item.category?.toLowerCase() === normalizedCategory &&
      item.brand?.toLowerCase() === normalizedBrand
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <h2 className="text-2xl font-semibold">Ürün Bulunamadı</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const mainImage = selectedImage || product.images?.[1] || product.image;

  return (
    <div className="w-[90%] mx-auto py-10">
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-5 right-5 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition z-50"
      >
        ← Geri Dön
      </button>

      {/* Başlık ve Açıklama */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <div className="h-[3px] bg-gradient-to-r from-gray-400 to-orange-500 mx-auto mt-2"></div>
          <p className="text-md text-gray-700 mt-4">{product.description}</p>
        </div>
      </div>

      {/* Görseller ve Özellikler */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sol: Küçük resimler ve büyük görsel */}
        <div className="flex w-full lg:w-[60%] items-start">
          {/* Küçük görseller - sol dikey */}
          <div className="flex flex-col space-y-3 mr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {product.images?.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Small ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-opacity duration-300 ${
                  mainImage === image ? "opacity-100" : "opacity-50"
                }`}
              />
            ))}
          </div>

          {/* Büyük görsel - sağ */}
          <div className="w-full">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-h-[500px] object-contain rounded-md"
            />
          </div>
        </div>

        {/* Sağ: Teknik Özellikler */}
        <div className="w-full lg:w-[40%]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Teknik Özellikler
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {product.specs?.map((spec, i) => (
              <li key={i}>✅ {spec}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
          >
            ✕
          </button>
          <img
            src={mainImage}
            alt="Tam Ekran"
            className="object-contain max-h-full max-w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
