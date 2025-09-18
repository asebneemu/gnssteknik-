// src/pages/BenewakeApplicationsPage.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// 1) assets klasöründeki ikonları derleme zamanında URL'e çevir
const iconsMap = import.meta.glob("/src/assets/icons/*.{webp,png,jpg,jpeg,svg}", {
  eager: true,
  as: "url",
});

// 2) (opsiyonel) base path varsa public için yardımcı (ikincil tercih)
function withBase(path) {
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/+$/, "") + "/" + String(path).replace(/^\/+/, "");
}

// 3) JSON'daki icon alanından dosya adını çekip assets'tan bul; yoksa public'e düş.
function resolveIconUrl(iconPathFromJson) {
  const fileName = String(iconPathFromJson || "").split("/").pop(); // "101.webp"
  const fromAssets = iconsMap[`/src/assets/icons/${fileName}`];
  return fromAssets || withBase(iconPathFromJson);
}

// 4) Görsel hata alırsa basit bir SVG placeholder (harici dosya gerektirmez)
const FALLBACK_DATA_URI =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
      <rect width='100%' height='100%' fill='#eee'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='#999'>no image</text>
    </svg>`
  );

export default function BenewakeApplicationsPage() {
  const { language, data } = useLanguage();
  const applications = (data && data.benewakeApplications) ? data.benewakeApplications : [];

  const metaDescription =
    language === "tr"
      ? "Benewake uygulama alanlarını keşfedin. Lidar teknolojisiyle inşaat, mühendislik ve diğer sektörlerdeki çözümlerimiz hakkında bilgi alın."
      : "Discover Benewake application areas. Learn about our solutions in construction, engineering, and other industries with Lidar technology.";

  const metaKeywords =
    language === "tr"
      ? "Benewake, Uygulama Alanları, Lidar, Teknoloji, İnşaat, Mühendislik"
      : "Benewake, Application Areas, Lidar, Technology, Construction, Engineering";

  return (
    <motion.div
      className="w-full px-4 py-12 flex justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>
          {language === "tr"
            ? "Benewake Uygulama Alanları - GNSS Teknik"
            : "Benewake Application Areas - GNSS Teknik"}
        </title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="GNSS Teknik" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="w-full max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-12 text-center">
          {language === "tr" ? "Uygulama Alanları" : "Application Areas"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {applications.map((item) => {
            const iconUrl = resolveIconUrl(item.icon); // önce assets, yoksa public/base
            const cacheBust = typeof window === "undefined" ? "" : `?v=${Date.now()}`; // cache kırıcı (isteğe bağlı)

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="border rounded-xl shadow hover:shadow-lg p-6 transition text-center"
              >
                <img
                  src={`${iconUrl}${cacheBust}`}
                  alt={item.title}
                  className="w-16 h-16 mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_DATA_URI; // harici dosya gerekmeyen fallback
                  }}
                />
                <h3 className="text-xl font-semibold text-orange-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {language === "tr" ? "Detaylı Bilgi" : "More Info"}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
