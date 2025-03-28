import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext"; // useLanguage kullanıyoruz
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
  const { data, language } = useLanguage(); // Dil bilgisini alıyoruz
  const { newNavbar = [] } = data; // newNavbar'ı LanguageContext'ten alıyoruz
  const [isLg, setIsLg] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex items-center justify-center relative mb-20 banner-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full"
        navigation={isLg} // Büyük ekranda oklar aktif
        pagination={{ clickable: true }}
        autoplay={isLg ? false : { delay: 3000, disableOnInteraction: false }} // Küçük ekranda autoplay
        loop={true}
        loopAdditionalSlides={1}
      >
        {newNavbar.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center h-auto"
          >
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${item["banner-photo"]})` }}
            >
              <div
                className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg 
               lg:absolute lg:left-1/4 lg:bottom-1/4 lg:-translate-x-1/4
               w-4/5 max-md:w-4/5 max-md:mx-auto"
                style={{ width: "30%" }}
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.name} {/* ✅ Başlık */}
                </h2>
                <p className="text-gray-600 mt-2 hidden lg:block">
                  {item["banner-description"]} {/* ✅ Açıklama */}
                </p>
                <a href={item["banner-url"]} target="_blank" rel="noopener noreferrer">
                  <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md">
                    {language === "tr" ? "Hemen Keşfet" : "Discover Now"} {/* ✅ Dil'e bağlı metin */}
                  </button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper buton ve pagination stilleri */}
      <style jsx>{`
        .banner-slider .swiper {
          min-height: 70vh !important;
        }

        .banner-slider .swiper-slide {
          min-height: 70vh !important;
        }

        @media (max-width: 1024px) {
          .banner-slider .swiper-button-next,
          .banner-slider .swiper-button-prev {
            display: none !important;
          }
        }

        .banner-slider .swiper-button-next,
        .banner-slider .swiper-button-prev {
          width: 80px;
          height: 80px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .banner-slider .swiper-button-next:hover,
        .banner-slider .swiper-button-prev:hover {
          background: white;
          color: black;
        }

        .banner-slider .swiper-button-next {
          right: 5%;
        }

        .banner-slider .swiper-button-prev {
          left: 5%;
        }

        .banner-slider .swiper-pagination-bullet {
          width: 20px;
          height: 4px;
          border-radius: 0;
          background: gray;
          transition: all 0.3s ease;
        }

        .banner-slider .swiper-pagination-bullet-active {
          width: 40px;
          background: black;
        }
      `}</style>
    </div>
  );
}
