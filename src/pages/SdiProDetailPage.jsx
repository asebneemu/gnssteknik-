import SdiProUcluKısım3 from "../components/sdi/SdiProUcluKısım3";
import SixthSection from "../components/SixthSection";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SdiProYazılıKısım4 from "../components/sdi/SdiProYazılıKısım4";

export default function SdiProDetailPage({ product }) {
  // Tüm görseller (slice yok)
  const images = product?.images || [];

  // Güvenli erişim helper
  const src = (idx, fallback = "/placeholder.webp") =>
    idx >= 0 && idx < images.length ? images[idx] : fallback;

  // "İlk görsel kullanılmıyor, 2.'den başlanıyor"
  const fromSecond = (i, fallback = "/placeholder.webp") =>
    src(i + 1, fallback);

  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // path değişince component yeniden mount edilsin
    setKey((k) => k + 1);
  }, [location.pathname]);

  return (
    <main className="w-full min-h-screen text-white">
      {/* ====================== 1. div ====================== */}
      <section className="relative bg-black w-full min-h-[70vh] sm:min-h-[80vh] md:h-screen flex items-center justify-center">
        <div className="w-[90%] sm:w-[85%] md:w-[70%] mx-auto flex justify-center">
          <img
            src={fromSecond(0)}
            alt={product?.name || "STEC SDi Pro"}
            className="max-w-full h-auto select-none"
          />
        </div>
      </section>

      {/* ====================== 2. div ====================== */}
      <section
        className="relative w-full py-12 sm:py-16 md:py-20"
        style={{ backgroundColor: "rgb(22,24,26)" }}
      >
        <div className="w-[90%] sm:w-[85%] md:w-[60%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* sol: resim + dik çizgi */}
          <div className="flex items-center justify-between gap-4">
            <img
              src={fromSecond(1)}
              alt="SDi Pro görsel"
              className="max-w-[75%] md:max-w-[70%] h-auto"
            />
            <span className="hidden sm:block w-[2px] h-40 md:h-64 bg-white" />
          </div>

          {/* sağ: metin */}
          <div className="mx-auto w-full lg:w-[90%] text-left">
            <p className="mb-4 leading-relaxed">
              {product?.description ||
                "SDi Pro’nun gelişmiş görsel + lazer mimarisi, uzun mesafede kararlı ve yüksek doğruluklu ölçüm sağlar."}
            </p>
            <p className="leading-relaxed">
              FusionAR Gen2 çift kamera deneyimiyle hedefe yaklaşırken otomatik
              olarak daha hassas kadraja geçer.
            </p>
          </div>
        </div>
      </section>

      {/* ====================== 3. div ====================== */}
      <section className="relative bg-black py-12 sm:py-16 md:py-20">
        {/* üstte tek görsel */}
        <div className="w-full flex justify-center mb-10 sm:mb-12">
          <img
            src={fromSecond(2)}
            alt="SDi Pro Showcase"
            className="w-[25%] sm:w-[10%] md:w-[20%] h-auto"
          />
        </div>

        <SdiProUcluKısım3 key={key} />
      </section>

      {/* ====================== 4. div ====================== */}
      <SdiProYazılıKısım4 key={key} />

      {/* ====================== 5. div ====================== */}
      <section className="relative bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#999999] text-white py-14 sm:py-16 md:py-20">
        {/* üst bölüm */}
        <div className="w-[90%] sm:w-[85%] md:w-[70%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* sol */}
            <div className="min-w-0 flex justify-center md:justify-start items-center">
              <img
                src={fromSecond(6)}
                alt="SDi Pro gövde"
                className="w-[85%] sm:w-[80%] md:w-[90%] max-w-[800px] h-auto object-contain"
              />
            </div>

            {/* sağ: 3 blok */}
            <div className="min-w-0 space-y-8">
              {/* 1) yatay geniş görsel */}
              <div className="w-full flex justify-center">
                <img
                  src={fromSecond(7)}
                  alt="Wide Banner"
                  className="w-44 sm:w-56 md:w-60 h-14 sm:h-16 object-cover rounded-lg"
                />
              </div>

              {/* 2) parlak çerçeveli kutu + 2 yazı */}
              <div className="w-full">
                <div className="p-[2px] rounded-xl bg-white/40">
                  <div className="relative rounded-[12px] bg-gray-900 overflow-hidden">
                    <img
                      src={fromSecond(8)}
                      alt="Ultimate Sensor"
                      className="w-full h-36 sm:h-40 md:h-44 object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <span className="text-5xl sm:text-2xl md:text-6xl font-bold">
                        ULTIMATE{" "}
                      </span>
                      <span className="text-xs sm:text-sm md:text-3xl opacity-90 mt-1">
                        IMAGING SENSOR
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3) iki kare kart */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {/* Kart A */}
                <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-square">
                  <img
                    src={fromSecond(9)}
                    alt="1920×1080 Pixel Array"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                    <span className="text-base sm:text-lg md:text-4xl font-bold leading-none">
                      1920×1080
                    </span>
                    <span className="text-[10px] sm:text-xl opacity-90 leading-none mt-1">
                      Pixel Array
                    </span>
                  </div>
                </div>

                {/* Kart B */}
                <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-square">
                  <img
                    src={fromSecond(10)}
                    alt="1/2.8” Optical Format"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                    <span className="text-base sm:text-lg md:text-4xl font-bold leading-none">
                      1/2.8”
                    </span>
                    <span className="text-[10px] sm:text-xl opacity-90 leading-none mt-1">
                      Optical Format
                    </span>
                  </div>
                </div>
              </div>
              {/* /iki kare kart */}
            </div>
          </div>
        </div>

        {/* alt bölüm: video kutusu */}
        <div className="w-[92%] sm:w-[70%] md:w-[40%] mx-auto mt-12 sm:mt-16 md:mt-20">
          <div className="p-[2px] rounded-2xl bg-white/40">
            <div className="relative rounded-[14px] bg-black overflow-hidden">
              <video
                src="/marka-photos/stec/sdiPro-video.mp4"
                className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <span className="absolute bottom-3 right-4 text-2xl sm:text-3xl md:text-4xl font-extrabold">
                NIGHT VISION
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 6. div ====================== */}
      <SixthSection
        leftImage={fromSecond(11)}
        topImage={fromSecond(12)}
        gradientText={[
          "Benzersiz Protokol",
          "Parazit Önleyici Anten",
          "2W Dahili Radyo Çıkışı",
          "+%20 Çalışma Menzili",
        ]}
      />

      {/* ====================== 7. div ====================== */}
      <section className="relative bg-black text-white py-12 sm:py-14 md:py-16">
        <div className="w-[92%] sm:w-[70%] md:w-[40%] mx-auto space-y-6">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src={fromSecond(13)}
              alt="Wide Visual"
              className="max-w-[160px] sm:max-w-[200px] h-auto object-contain mx-auto"
            />
          </div>
          <div className="text-left text-sm sm:text-base">
            <p className="mb-3 leading-relaxed">
              Alıcıdaki çift kamera, AR durum çıkışı sırasında doğruluğu ve
              yönlendirmeyi önemli ölçüde artırır. Ve bu, STEC fusionAR'ın 2.
              Nesli'dir.
            </p>
            <p className="leading-relaxed opacity-90">
              Ön kamera önce, tespit edilecek noktanın yönünü ve mesafesini
              gösterir. Yaklaştığında ise, doğru noktayı bulana kadar daha doğru
              bir yön göstermek için alt kameraya sorunsuz bir şekilde geçiş
              yapar. Tüm işlemleri etkinleştirmek için yalnızca tek bir tıklama
              yeterlidir.
            </p>
          </div>
        </div>
      </section>

      {/* ====================== 8. div ====================== */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: `url(${fromSecond(14)})` }}
      >
        <div className="min-h-[460px] sm:min-h-[560px] md:min-h-[700px] w-full flex items-center">
          <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* solda: yatay uzun kutu */}
            {/* solda: yatay uzun kutu (responsive, oran korumalı) */}
            <div className="p-[3px] rounded-xl bg-white/30 w-full md:w-[52%] lg:w-[40%]">
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{
                  /* yüksekliği ekrana göre ayarla: min 72px, ideal 12vw, max 120px */
                  height: "clamp(72px, 12vw, 120px)",
                }}
              >
                <img
                  src={fromSecond(15)}
                  alt="Feature box"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span
                  className="
    absolute inset-0 flex items-center justify-center
    font-extrabold tracking-wide drop-shadow
  "
                  style={{
                    fontSize: "clamp(3rem, 10vw, 6rem)", // min ~48px, ortalama ekran genişliğine göre, max 96px
                  }}
                >
                  IP68
                </span>
              </div>
            </div>

            {/* sağda: büyük yazı */}
            <div className="text-center md:text-right">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                Üstün Su ve <br /> Toz Geçirmez!
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
