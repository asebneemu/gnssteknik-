import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const SenceiveSensorPage = () => {
  const navigate = useNavigate();
  const { data, language } = useLanguage();

  const intro = data?.senceiveIntro || [];
  const tech = data?.senceiveTechnologies || [];
  const links = data?.senceiveLinks || [];
  const nedenImage = data?.nedenSenceiveImage;
  const mainImage = data?.senceiveMainImage;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-10 space-y-16">

      {/* Başlık */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">SENCEIVE - SENSOR</h1>
        <p className="text-xl text-gray-700">
          {language === "tr"
            ? "Yapı Sağlığı İzleme Sistemleri"
            : "Structural Health Monitoring Systems"}
        </p>
      </div>

      {/* Açıklama Kartları */}
      <div className="w-full flex flex-col items-center gap-10 text-gray-700 px-4">
        <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-7xl">
          {intro.slice(0, 3).map((item, i) => (
            <div key={i} className="flex-1 text-center px-4">
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-5xl">
          {intro.slice(3).map((item, i) => (
            <div key={i} className="flex-1 text-center px-4">
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wireless Çözümler Başlık + Görsel */}
      <div className="w-full text-center">
        <h2 className="text-5xl font-bold text-orange-600 py-12">
          {language === "tr"
            ? "Senceive Wireless Çözümleri"
            : "Senceive Wireless Solutions"}
        </h2>
        <img
          src={mainImage}
          alt="Senceive Wireless"
          className="max-w-full h-auto rounded-xl shadow mx-auto"
        />
      </div>

      {/* Teknoloji Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tech.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              console.log(`${item.title} clicked`);
              navigate(`/products/senceive?tech=${item.id}`);
            }}
            className="cursor-pointer border rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold text-orange-600 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2 text-orange-500">{item.subTitle}</h4>
              <p className="text-gray-700">{item.details}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Neden Senceive Görseli */}
      <div className="bg-gray-100 p-10 rounded-xl text-center">
        <h2 className="text-6xl font-bold text-orange-600">
          {language === "tr" ? "NEDEN SENCEIVE?" : "WHY SENCEIVE?"}
        </h2>
        <img
          src={nedenImage}
          alt="Neden Senceive"
          className="mx-auto max-w-full h-auto rounded shadow mt-8"
        />
      </div>

      {/* Alt Link Kartları */}
      <div className="grid md:grid-cols-2 gap-8">
        {links.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="cursor-pointer border rounded-xl shadow p-10 flex items-center justify-center hover:shadow-lg transition"
          >
            <h3 className="text-4xl font-extrabold text-orange-600">{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SenceiveSensorPage;
