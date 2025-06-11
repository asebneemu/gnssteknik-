import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // react-helmet kurulu varsayılıyor
import { useLanguage } from "../context/LanguageContext";

const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const ProductDetailPage = () => {
  const { category, brand, productName } = useParams();
  const navigate = useNavigate();
  const { data } = useLanguage();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!data?.products) return;
    const product = data.products.find(
      (item) =>
        toSlug(item.name) === productName &&
        toSlug(item.category) === category &&
        toSlug(item.brand) === brand
    );
    if (!product?.specs?.length) return;

    const interval = setInterval(() => {
      setHighlightIndex(Math.floor(Math.random() * product.specs.length));
    }, 2500);

    return () => clearInterval(interval);
  }, [data, category, brand, productName]);

  if (!data || !data.products) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <h2 className="text-2xl font-semibold">Veri yüklenemedi</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-white/30 backdrop-blur-md border border-white/40 text-gray-900 py-2 px-6 rounded-md hover:bg-white/50 transition"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const product = data.products.find(
    (item) =>
      toSlug(item.name) === productName &&
      toSlug(item.category) === category &&
      toSlug(item.brand) === brand
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <h2 className="text-2xl font-semibold">Ürün Bulunamadı</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-white/30 backdrop-blur-md border border-white/40 text-gray-900 py-2 px-6 rounded-md hover:bg-white/50 transition"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const mainImage = selectedImage || product.images?.[1] || product.image;
  const brochureLink = product.brochureUrl || "#";

  return (
    <div className="w-[90%] mx-auto py-10 relative">
      <Helmet>
        <title>{product.meta?.title || product.title || product.name}</title>
        <meta
          name="description"
          content={product.meta?.description || product.description}
        />
        <meta
          name="keywords"
          content={product.meta?.keywords?.join(", ") || ""}
        />
      </Helmet>

      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-5 right-5 bg-white/30 backdrop-blur-md border border-white/40 text-gray-900 py-2 px-6 rounded-md hover:bg-white/50 transition z-50"
      >
        ← Geri Dön
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="h-[3px] bg-gradient-to-r from-gray-400 to-orange-500 mx-auto mt-2"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start mb-12">
        <div className="flex w-full lg:w-[60%] items-start">
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

          <div className="w-full">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-h-[500px] object-contain rounded-md"
            />
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-col justify-center relative">
          {/* Beyaz neon çubuk */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/70 rounded"></div>

          <div className="pl-8 pr-4">
            <p className="text-lg lg:text-xl font-semibold text-gray-800 leading-relaxed">
              {product.meta?.description || product.description}
            </p>

            {/* Ürün Broşürü sol alt köşede, açıklamadan 2 parmak aşağıda */}
            <a
              href={brochureLink}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-800 hover:text-orange-600 transition cursor-pointer select-none text-lg font-semibold mt-8"
              aria-label="Ürün Broşürünü İndir"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m0 0l-5-5m5 5l5-5M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H8l-4 4v10a2 2 0 002 2z"
                />
              </svg>
              <span>Ürün Broşürü</span>
            </a>
          </div>
        </div>
      </div>

      {/* Teknik Özellikler bölümü */}
      <div className="w-[90%] mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-left">
          Teknik Özellikler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {product.specs && product.specs.length > 0 ? (
            product.specs.map((spec, index) => {
              const isHighlighted = index === highlightIndex;
              return (
                <div
                  key={index}
                  className={`rounded-lg p-4 flex items-center transition-colors duration-500 ${
                    isHighlighted
                      ? "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.85)] text-black font-semibold"
                      : "bg-gray-800 border border-gray-600 text-white"
                  }`}
                >
                  <span className="w-1 h-6 rounded mr-4 flex-shrink-0 bg-current"></span>
                  <span>{spec}</span>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-center">
              Teknik özellikler mevcut değil.
            </div>
          )}
        </div>
      </div>

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
};

export default ProductDetailPage;
