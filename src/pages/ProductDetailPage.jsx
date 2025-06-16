import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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

  if (!data || !data.products) return null;

  const product = data.products.find(
    (item) =>
      toSlug(item.name) === productName &&
      toSlug(item.category) === category &&
      toSlug(item.brand) === brand
  );

  if (!product) return null;

  const mainImage = selectedImage || product.images?.[1] || product.image;
  const brochureLink = product.brochureUrl || "#";

  return (
    <div className="w-full">
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

      {/* HERO */}
      <section className="w-full text-white bg-gradient-to-r from-gray-900 via-black to-gray-900 py-14 px-6 mt-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
        <p className="text-xl opacity-90 max-w-4xl mx-auto">
          {product.meta?.description || product.description}
        </p>
      </section>

      {/* Galeri + Teknik Özellikler */}
      <div className="w-full py-16 flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-[90%] max-w-[1400px]">
          {/* Sol Özellikler */}
          <div className="flex-1 space-y-4">
            {product.specs?.filter((_, i) => i % 2 === 0).map((spec, index) => (
              <div
                key={index}
                className={`rounded-lg px-4 py-3 transition duration-300 ${
                  index === highlightIndex
                    ? "bg-white shadow-xl text-black font-semibold"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {spec}
              </div>
            ))}
          </div>

          {/* Ürün Görseli + Thumbnail'lar */}
          <div className="flex flex-col items-center w-full md:w-[360px]">
            <img
              src={mainImage}
              onClick={() => setIsModalOpen(true)}
              className="w-full h-auto object-contain rounded-md cursor-pointer"
              alt={product.name}
            />
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {product.images?.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-opacity duration-300 ${
                    img === mainImage ? "opacity-100" : "opacity-50 hover:opacity-90"
                  }`}
                  alt={`thumb-${i}`}
                />
              ))}
            </div>

            {/* Broşür bağlantısı — gizli */}
            {/*
            <a
              href={brochureLink}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 mt-4 hover:text-orange-800 font-medium"
            >
              Ürün Broşürü
            </a>
            */}
          </div>

          {/* Sağ Özellikler */}
          <div className="flex-1 space-y-4">
            {product.specs?.filter((_, i) => i % 2 === 1).map((spec, index) => (
              <div
                key={index}
                className={`rounded-lg px-4 py-3 transition duration-300 ${
                  index + 1 === highlightIndex
                    ? "bg-white shadow-xl text-black font-semibold"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {spec}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Görsel Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl"
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

      {/* Geri Dön Butonu - Sağ Altta Sabit */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-5 right-5 z-50 bg-white/30 backdrop-blur-md border border-white/40 text-gray-900 py-2 px-6 rounded-md hover:bg-white/50 transition"
      >
        ← Geri Dön
      </button>
    </div>
  );
};

export default ProductDetailPage;
