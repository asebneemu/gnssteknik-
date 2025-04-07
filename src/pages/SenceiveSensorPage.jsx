import React from "react";
import { Link } from "react-router-dom";

const SenceiveSensorPage = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-10 space-y-10">
      {/* Başlık */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          SENCEIVE - SENSOR
        </h1>
        <p className="text-xl text-gray-700">
          Yapı Sağlığı İzleme Sistemleri
        </p>
      </div>

      {/* Açıklama Kartları - 3 üstte, 2 altta */}
<div className="w-full flex flex-col items-center gap-10 text-gray-700 px-4">
  {/* Üst Satır - 3 Kart */}
  <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-7xl">
    <div className="flex-1 text-center px-4">
      <h3 className="font-bold text-xl mb-2">
        Senceive: Güvenilir ve Akıllı İzleme Teknolojilerinde Dünya Lideri
      </h3>
      <p>
        GNSS Teknoloji olarak temsilciliğini üstlendiğimiz Senceive, inşaat mühendisliği, demiryolu ve madencilik sektörlerinin zorlu koşullarına özel geliştirdiği yüksek hassasiyetli, sağlam ve güvenilir uzaktan izleme çözümleriyle öne çıkıyor. Bu sistemler, altyapı inşaatı ve bakım faaliyetlerinden sorumlu ekiplerin doğru ve zamanında kararlar almasını sağlar.
      </p>
    </div>
    <div className="flex-1 text-center px-4">
      <h3 className="font-bold text-xl mb-2">
        Saha İzlemede Öncü Bir Marka
      </h3>
      <p>
        2005’ten bu yana Senceive, kablosuz durum izleme teknolojilerini inşaat ve demiryolu sektörlerine entegre eden ilk firmalardan biri olarak sektörde öncü konumdadır. Uzun yıllara dayanan bu birikim, onu alanında en köklü ve güvenilir firmalardan biri hâline getirmiştir.
      </p>
    </div>
    <div className="flex-1 text-center px-4">
      <h3 className="font-bold text-xl mb-2">
        Müşteri Odaklı Ar-Ge Yaklaşımı
      </h3>
      <p>
        University College London (UCL) araştırma laboratuvarlarında temelleri atılan Senceive, kuruluşundan bu yana müşteri ihtiyaçlarını merkeze alan bir anlayışla çalışmaktadır. Bu yaklaşım; ürün geliştirmeden teknik desteğe kadar, tüm süreçlere yansımaktadır.
      </p>
    </div>
  </div>

  {/* Alt Satır - 2 Kart */}
  <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-5xl">
    <div className="flex-1 text-center px-4">
      <h3 className="font-bold text-xl mb-2">
        Mühendislikle Güçlenen İnovasyon
      </h3>
      <p>
        Senceive’in büyüme stratejisinin merkezinde mühendislik yer alır. Karmaşık saha koşullarında güvenilir performans sunan çözümler, sahada test edilmiş, pratik mühendislik deneyimiyle şekillenmektedir. Bu teknik yetkinlik, yenilikçi ürünlerin sürekliliğini sağlar.
      </p>
    </div>
    <div className="flex-1 text-center px-4">
      <h3 className="font-bold text-xl mb-2">
        Global Ölçekte Güvenilirlik
      </h3>
      <p>
        Bugün Senceive, dünya genelinde 80.000’den fazla sensör kurulumuyla kablosuz uzaktan izleme teknolojilerinde küresel lider konumundadır. GNSS Teknoloji olarak bu güçlü markayı ülkemizde ve bölgemizde müşterilerimizle buluşturmaktan gurur duyuyoruz.
      </p>
    </div>
  </div>
</div>


      {/* Görsel */}
      <div className="w-full flex-column justify-center">
        <h2 className="text-6xl text-center py-16">Senceive Wireless Çözümleri</h2>
        <img
          src="/marka-photos/senceive/main.png"
          alt="Senceive Ana Görsel"
          className="max-w-full h-auto rounded-xl shadow"
        />
      </div>

      {/* Tanıtım Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FlatMesh Kartı */}
        <Link to="/category/sensor/senceive/flat-mesh">
          <div className="border rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">Flat Mesh</h3>
            <p className="text-gray-600">
              FlatMesh, Senceive'in ilk nesil kablosuz izleme sistemidir. Esnek ve güvenilir altyapı sağlar.
            </p>
            {/* FlatMesh Açıklaması */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2 text-orange-500">FlatMesh Nedir?</h4>
              <p className="text-gray-700">
                FlatMesh, Senceive'in kablosuz izleme teknolojilerinde öncü bir çözümüdür. Bu sistem, çoklu sensörlerin bir ağ yapısı içinde entegre şekilde çalışmasını sağlar. 
                Yüksek doğrulukla veri toplama yeteneği sayesinde, altyapı projelerinde ve saha izleme uygulamalarında güvenilir bir çözüm sunar. FlatMesh, kablosuz iletişim teknolojisiyle karmaşık kablolama ihtiyacını ortadan kaldırır ve kurulum sürecini kolaylaştırır. 
                Özellikle dar alanlarda ve zorlu çevre koşullarında etkili bir performans sergiler.
              </p>
            </div>
          </div>
        </Link>

        {/* GeoWAN Kartı */}
        <Link to="/category/sensor/senceive/geowan-lora">
          <div className="border rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">GeoWAN (LoRa)</h3>
            <p className="text-gray-600">
              GeoWAN, geniş alanlarda düşük güç tüketimiyle izleme yapar. Uzun menzilli kablosuz iletişim sağlar.
            </p>
            {/* GeoWAN Açıklaması */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2 text-orange-500">GeoWAN Nedir?</h4>
              <p className="text-gray-700">
                GeoWAN, Senceive'in geniş alan izleme ihtiyaçları için geliştirdiği yenilikçi bir kablosuz iletişim teknolojisidir. LoRa (Long Range) protokolünü kullanarak kilometrelerce mesafeden veri iletimi yapabilir. 
                Bu sistem, düşük güç tüketimiyle uzun süreli izleme sağlar ve geniş alanlara yayılan altyapı projelerinde ideal bir çözümdür. GeoWAN, özellikle büyük ölçekli projelerde, örneğin barajlar, köprüler ve demiryolu hatları gibi geniş alanlarda güvenilir veri toplama ve iletim imkanı sunar.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Neden Senceive Bölümü */}
      <div className="bg-gray-100 p-10 rounded-xl text-center">
        <h2 className="text-8xl font-bold text-orange-600">
          NEDEN SENCEIVE?
        </h2>
        <img
          src="/marka-photos/senceive/neden-senceive.png"
          alt="Neden Senceive"
          className="mx-auto max-w-full h-auto rounded shadow"
        />
      </div>
    </div>
  );
};

export default SenceiveSensorPage;
