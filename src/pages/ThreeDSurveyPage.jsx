import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";

const ThreeDSurveyPage = () => {
  const { data } = useLanguage();
  const navigate = useNavigate();

  // Marka ve kategoriye göre filtrele
  const filteredProducts = data.products.filter(
    (item) =>
      item.brand?.toLowerCase() === "3dsurvey" && // Marka kontrolü
      item.category?.toLowerCase() === "yazilim" // Kategori kontrolü
  );

  // typeTitle'a göre gruplama
  const grouped = filteredProducts.reduce((acc, item) => {
    const group = item.typeTitle || "";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-10 space-y-16">
      {/* Sayfa Başlığı */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">3D SURVEY</h1>
        <p className="text-xl text-gray-700">
          Hızlı, Doğru ve Kolay Fotogrametri Yazılımı
        </p>
      </div>

      {/* İkili Anlatım Alanı */}
      <div className="flex flex-col md:flex-row justify-center gap-6 text-gray-700">
        <div className="flex-1 text-center px-4">
          <h3 className="font-bold text-xl mb-2">3D Survey Nasıl Çalışır?</h3>
          <p>
            3Dsurvey, sahada toplanan görüntü verilerini fotogrametrik modelleme
            ve yüzey üretimi için işleyerek harita, hacim, kesit, ortofoto gibi
            çıktılar sağlar. Drone ile çekilen görselleri hızlı şekilde işleyip
            CAD ve GIS uyumlu çıktılara dönüştürür.
          </p>
        </div>
        <div className="flex-1 text-center px-4">
          <h3 className="font-bold text-xl mb-2">Yazılım İçeriği Nedir?</h3>
          <p>
            Nokta bulutu üretimi, 3B mesh modelleme, dijital arazi modeli, 
            ortofoto harita oluşturma, hacim hesaplama ve kesit analizleri
            gibi tüm süreçleri tek yazılım çatısı altında sunar. Kullanıcı dostu
            arayüzü sayesinde sahadan ofise geçişi hızlandırır.
          </p>
        </div>
      </div>

      {/* Görselli Açıklama Alanı */}
      <div className="flex flex-col md:flex-row items-center gap-8 pt-16">
        <div className="w-full md:w-3/5">
          <img
            src="/marka-photos/3dsurvey/3dss.png"
            alt="3Dsurvey ekran görüntüsü"
            className="w-full rounded-xl shadow"
          />
        </div>
        <div className="w-full md:w-2/5 space-y-4 text-gray-700">
          <h2 className="text-3xl font-bold text-orange-600">
            Tüm Fotogrametri Süreci Tek Platformda
          </h2>
          <p className="text-lg">
            3Dsurvey, sahadaki veri toplamadan ofisteki son çıktıya kadar
            olan tüm süreci yönetmenizi sağlar. Nokta bulutları, kesitler,
            hacim analizleri, ortofotolar ve yüzey modelleri hızlıca oluşturulur.
          </p>
          <p className="text-lg">
            Tamamen kendi geliştirdiği algoritmaları ile rakiplerinden ayrılır;
            stabil ve optimize işlem süreciyle yüksek performans sunar.
          </p>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="space-y-12 pt-20">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
          3D Survey Yazılım
        </h2>

        {Object.entries(grouped).map(([title, items], index) => (
          <div key={index}>
            <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDSurveyPage;
