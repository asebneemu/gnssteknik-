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
      item.brand?.toLowerCase() === "3dsurvey" &&
      item.category?.toLowerCase() === "yazilim"
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
        <p className="text-4xl font-bold text-gray-700">
          Hızlı, Doğru ve Kolay Fotogrametri Yazılımı
        </p>
      </div>

      {/* Üçlü Anlatım Alanı */}
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div className="text-center px-4">
          <h3 className="font-bold text-xl mb-2">3D Survey Nasıl Çalışır?</h3>
          <p>
            3Dsurvey, klasik fotogrametrik iş akışını modernize ederek tüm ölçüm
            süreçlerini otomatik ve kullanıcı dostu hale getirir. Drone veya yer
            tabanlı kameralarla çekilmiş yüksek çözünürlüklü fotoğraflar, yazılıma
            aktarıldığında sistem bu görüntülerden kameranın pozisyon bilgilerini,
            içsel parametrelerini ve sahadaki 3B yapıyı belirler. 
            <br /><br />
            Süreç, fotoğrafların hizalanması ile başlar; ardından yüksek yoğunlukta nokta
            bulutu oluşturulur. Bu bulut verisi üzerinden arazi modeli (DSM/DTM) ve
            3B mesh yapılır. Ortofoto üretimi, hacim analizleri, yükseklik farkı ölçümleri ve
            kesit alınması gibi çıktılar bu modeller üzerinden hesaplanır.
            <br /><br />
            3Dsurvey’in algoritmaları, özellikle zorlu arazilerde ve homojen yüzeylerde
            yüksek tutarlılık sağlar. Görüntülerin otomatik hizalanması, eşleşen noktaların
            doğruluğu ve yüzeylerin interpolasyonu yapay zekâ destekli katmanlarla
            optimize edilir. Tüm bu adımlar minimum kullanıcı müdahalesiyle tamamlanır.
          </p>
        </div>

        <div className="text-center px-4">
          <h3 className="font-bold text-xl mb-2">Yazılım İçeriği Nedir?</h3>
          <p>
            3Dsurvey, uçtan uca entegre bir fotogrametri yazılım paketidir. Görüntü
            hizalama sürecinden başlayarak, yüksek yoğunluklu nokta bulutu üretimi,
            yüzey modelleme (DSM/DTM), ortofoto harita oluşturma, hacim hesaplama,
            3B mesh modelleme ve kesit analizlerine kadar tüm fotogrametrik ihtiyaçları
            karşılar.
            <br /><br />
            Yazılım, lazer tarama ve fotogrametri verilerini birleştirme desteğine de sahiptir.
            Gelişmiş zemin sınıflandırma araçları sayesinde yapay ve doğal yüzey ayrımları
            kolaylıkla yapılabilir. Ayrıca projeye özgü koordinat sistemi ayarları,
            raster ve vektör tabanlı dışa aktarma seçenekleri (GeoTIFF, DXF, LAS, OBJ vb.)
            gibi profesyonel veri entegrasyonu sunar.
            <br /><br />
            3Dsurvey, projeleri karşılaştırmalı olarak yönetmeyi sağlar: örneğin kazı dolgu
            hesaplarında iki farklı zaman dilimindeki verileri analiz ederek stok değişimini
            gösterir. Yüzey düzleştirme, boşluk doldurma, silme ve yeniden sınıflandırma gibi
            manuel düzenleme araçları ile kullanıcıya tam kontrol sunar.
          </p>
        </div>

        <div className="text-center px-4">
          <h3 className="font-bold text-xl mb-2">Neden 3D Survey?</h3>
          <p>
            3Dsurvey, sahada toplanan verileri ofis ortamında hızlı, doğru ve verimli
            bir şekilde işlemek isteyen profesyoneller için geliştirilmiştir. Kendi
            geliştirdiği yüksek performanslı algoritmalar sayesinde diğer yazılımlara göre
            çok daha hızlı veri işleme süresi sunar. Aynı zamanda düşük sistem kaynakları
            ile çalışabilmesi, donanım yatırım maliyetini azaltır.
            <br /><br />
            Kullanıcı dostu arayüzü, kısa öğrenme süreci ve Türkçe dil desteğiyle yeni başlayanlar
            için idealdir. Uzman kullanıcılar ise gelişmiş modüller, çoklu proje desteği ve
            detaylı raporlama araçlarıyla daha kompleks projeleri rahatlıkla yönetebilir.
            <br /><br />
            Mühendislik, harita, maden, inşaat, enerji ve tarım gibi geniş bir sektörel
            yelpazede kullanılabilir. 3Dsurvey, zaman ve maliyet tasarrufu sağlarken aynı
            zamanda daha yüksek doğruluk ve denetlenebilirlik sunar.
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
  3Dsurvey, sahadaki veri toplamadan ofisteki son çıktıya kadar olan tüm süreci yönetmenizi sağlar.
  Nokta bulutları, kesitler, hacim analizleri, ortofotolar ve yüzey modelleri hızlıca oluşturulur.
  Tüm bu çıktılar yüksek hassasiyetle ve kısa işlem süresiyle elde edilir. Çekilen verilerin formatı
  ne olursa olsun sistem içerisinde kolayca entegre edilebilir, dönüştürülebilir ve analiz edilebilir.
  Harita üretimi, arazi planlaması ve proje kontrolü gibi tüm mühendislik süreçlerine sorunsuz entegre olur.
</p>
<p className="text-lg">
  Tamamen kendi geliştirdiği algoritmaları ile rakiplerinden ayrılır; stabil ve optimize işlem süreciyle
  yüksek performans sunar. Ayrıca düşük sistem gereksinimleri ile ekonomik donanımlarda da sorunsuz çalışır.
  Proje dosyalarının kolay paylaşımı ve çok kullanıcılı ortamda çalışma imkânı, ekip verimliliğini en üst düzeye çıkarır.
  3Dsurvey, farklı uzmanlık seviyesindeki kullanıcılar için sade ama güçlü bir deneyim sunar.
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
