import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const SensorBenewakePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-10 space-y-16">
      {/* Sayfa Başlığı ve Alt Başlık */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          BENEWAKE - SENSOR
        </h1>
        <p className="text-xl text-gray-700">
          Yüksek Hassasiyetli Akıllı Sensör Sistemleri
        </p>
      </div>

      {/* Giriş Kartları (3+2 yapısı) */}
      <div className="flex flex-col items-center gap-10 text-gray-700 px-4">
        <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-7xl">
          <div className="flex-1 text-center px-4">
            <h3 className="font-bold text-xl mb-2">Küresel Teknoloji Lideri</h3>
            <p>
              Benewake, 2015 yılında Pekin’de kurulmuş ve kısa sürede lidar
              sensör alanında dünya çapında bilinirliğe ulaşmıştır. Akıllı şehir
              uygulamalarından otonom sistemlere kadar geniş bir alanda faaliyet
              gösterir. Bugün 80’den fazla ülkeye ihracat yaparak hem
              endüstriyel hem de akademik projelerde güvenilir çözüm ortağı
              konumundadır. Ar-Ge gücü ve uluslararası iş birlikleriyle sensör
              teknolojisinin evrimini yönlendirmektedir.
            </p>
          </div>
          <div className="flex-1 text-center px-4">
            <h3 className="font-bold text-xl mb-2">Geniş Ürün Yelpazesi</h3>
            <p>
              Benewake’in ürün portföyü, farklı menzil ve hassasiyet
              ihtiyaçlarına uygun olarak çeşitlendirilmiştir. TF-Luna gibi
              kompakt modellerden TF350 gibi uzun menzilli çözümlere kadar
              birçok model sunar. Her bir ürün, IP koruması, çoklu arayüz (UART,
              CAN, RS485) ve düşük güç tüketimi gibi avantajlarla donatılmıştır.
              Bu esneklik, farklı sektörlerdeki uygulamalarda entegrasyon
              kolaylığı sağlar.
            </p>
          </div>
          <div className="flex-1 text-center px-4">
            <h3 className="font-bold text-xl mb-2">
              Yenilikçi Ar-Ge ve Patentler
            </h3>
            <p>
              Benewake, bugüne dek 300’den fazla ulusal ve uluslararası patent
              başvurusunda bulunarak teknolojiye yön veren bir yapı kurmuştur.
              Sinyal işleme algoritmaları, optik yapı optimizasyonları ve
              donanım geliştirme süreçlerinde sürekli ilerleme sağlar. Çin’deki
              merkez ofisi dışında Avrupa ve Amerika’daki iş ortaklarıyla
              küresel inovasyon döngüsüne aktif katkı sunar. Ar-Ge bütçesi,
              toplam gelirinin önemli bir kısmını oluşturur.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-5xl">
          <div className="flex-1 text-center px-4">
            <h3 className="font-bold text-xl mb-2">
              Güvenilirlik ve Dayanıklılık
            </h3>
            <p>
              IP65 ve IP67 sınıfı koruma seviyelerine sahip modelleriyle
              Benewake sensörleri, zorlu saha koşullarında güvenilir performans
              sunar. -20°C ile +70°C sıcaklık aralığında çalışabilir, darbelere
              ve elektromanyetik parazitlere karşı dirençlidir. Sensörler,
              üretim aşamasında çok sayıda çevresel testten geçirilerek
              dayanıklılığı garanti altına alınır. Bu özellikler sayesinde uzun
              ömürlü ve bakım gerektirmeyen çözümler sağlar.
            </p>
          </div>
          <div className="flex-1 text-center px-4">
            <h3 className="font-bold text-xl mb-2">
              Çok Yönlü Uygulama Alanları
            </h3>
            <p>
              Benewake sensörleri; drone navigasyonu, engel algılama, araç içi
              güvenlik sistemleri, fabrika otomasyonu, tarım robotları ve daha
              fazlası için kullanılır. TF-Luna modeli sabit yükseklik
              kontrolünde, TF02-Pro engel algılamada öne çıkar. Yüksek frekans
              ve düşük güç tüketimi ile tüm bu uygulamalarda enerji verimliliği
              sağlar. Modüler yapısıyla hem gömülü sistemlere hem de bağımsız
              çözümlere kolayca entegre edilir.
            </p>
          </div>
        </div>
      </div>

      {/* Görsel + Açıklama Yatay Yerleşim */}
      <div className="flex flex-col md:flex-row items-center gap-8 pt-24">
        {/* Görsel Alanı */}
        <div className="w-full md:w-3/5">
          <img
            src="/marka-photos/benewake/bHero.png"
            alt="Benewake Sensörlü Drone"
            className="w-full rounded-xl shadow"
          />
        </div>

        {/* Açıklama Alanı */}
        <div className="w-full md:w-2/5 space-y-4 text-gray-700">
          <h2 className="text-3xl font-bold text-orange-600">
            Benewake Sensörleri Nasıl Çalışır?
          </h2>
          <p className="text-lg">
            Benewake sensörleri, ToF (Time-of-Flight) teknolojisiyle çalışan
            yüksek hassasiyetli mesafe ölçüm sistemleridir. Sensör, bir hedefe
            kızılötesi lazer ışını gönderir; bu ışık hedef yüzeyden yansıyıp
            geri dönerken, ışığın gidiş-dönüş süresi ölçülerek hedefe olan
            mesafe milimetre seviyesinde hesaplanır.
          </p>
          <p className="text-lg">
            Bu prensip sayesinde, sensörler drone sistemlerinde sabit yükseklik
            takibi, arazi yüzeyi izleme, iniş-yükselme kontrolü gibi görevleri
            yüksek doğrulukla yerine getirir. Robotik platformlarda engel
            tespiti ve yön değiştirme, otonom araçlarda çarpışma önleme ve nesne
            algılama gibi karar süreçlerine doğrudan veri sağlar. Bina
            otomasyonlarında da kat konumu, araç varlığı veya insan hareketi
            algılamada kullanılır.
          </p>
          <p className="text-lg">
            Benewake sensörleri; kompakt tasarımı, düşük güç tüketimi, IP koruma
            sınıfı ve çeşitli haberleşme arayüzleri (UART, CAN, RS485) ile
            farklı sistemlere kolayca entegre edilebilir. Bu da onları mobil
            sistemlerden endüstriyel otomasyonlara kadar birçok alanda ideal ve
            uzun ömürlü bir çözüm hâline getirir.
          </p>
        </div>
      </div>

      {/* Üçlü Kutu Serisi - Buton Yapısı */}
<div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
  <div
    onClick={() => navigate("/products/benewake?tech=single-point")}
    className="border rounded-xl shadow p-6 hover:shadow-lg cursor-pointer"
  >
    <h3 className="text-2xl font-bold text-orange-600 mb-2">
      Single Point Serisi
    </h3>
    <p>
      Hızlı, hafif ve düşük maliyetli uygulamalar için tek yönlü mesafe
      algılama sensörleri.
    </p>
  </div>

  <div
    onClick={() => navigate("/products/benewake?tech=2d")}
    className="border rounded-xl shadow p-6 hover:shadow-lg cursor-pointer"
  >
    <h3 className="text-2xl font-bold text-orange-600 mb-2">2D Serisi</h3>
    <p>
      Yüzey taraması ve geniş alan analizleri için çift boyutlu ölçüm
      imkanı sunar.
    </p>
  </div>

  <div
    onClick={() => navigate("/products/benewake?tech=3d")}
    className="border rounded-xl shadow p-6 hover:shadow-lg cursor-pointer"
  >
    <h3 className="text-2xl font-bold text-orange-600 mb-2">3D Serisi</h3>
    <p>
      Karmaşık nesne tanımlama ve çevresel haritalama uygulamaları için
      ideal hacimsel algılama çözümleri.
    </p>
  </div>
</div>

    </div>
  );
};

export default SensorBenewakePage;
