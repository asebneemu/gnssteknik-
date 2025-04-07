import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
  const { data, language } = useLanguage();
  const { newNavbar = [] } = data;
  const [swiperHeight, setSwiperHeight] = useState("auto");
  const bannerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (bannerRef.current) {
        const offset = bannerRef.current.offsetTop; // banner yukarıdan kaç px aşağıda başlıyorsa
        const height = window.innerHeight - offset; // ekranın kalan yüksekliği
        setSwiperHeight(`${height}px`);
      }
    };

    handleResize(); // ilk yüklemede
    window.addEventListener("resize", handleResize); // pencere değişirse
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full overflow-hidden relative banner-slider"
      ref={bannerRef}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        style={{ height: swiperHeight }}
        className="w-full"
        navigation={window.innerWidth >= 1024}
        pagination={{ clickable: true }}
        autoplay={
          window.innerWidth >= 1024
            ? false
            : { delay: 3000, disableOnInteraction: false }
        }
        loop={true}
        loopAdditionalSlides={1}
      >
        {newNavbar.map((item, index) => (
          <SwiperSlide key={index} className="h-full">
            <div
              className="w-full h-full bg-cover bg-bottom flex items-center justify-center relative"
              style={{ backgroundImage: `url(${item["banner-photo"]})` }}
            >
              <div
                className="bg-white bg-opacity-60 p-4 md:p-6 rounded-lg shadow-lg
                lg:absolute lg:left-1/4 lg:bottom-1/4 lg:-translate-x-1/4
                lg:w-auto lg:max-w-md lg:text-left lg:items-start
                max-[1023px]:absolute max-[1023px]:top-4 max-[1023px]:left-4
                max-[1023px]:w-fit max-[1023px]:max-w-[80%] max-[1023px]:text-left
                max-[1023px]:flex max-[1023px]:flex-col max-[1023px]:items-start
                max-[1023px]:gap-1 flex flex-col items-start"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left w-full">
                  {item.name}
                </h2>
                <p className="text-gray-600 mt-2 hidden lg:block text-left w-full">
                  {item["banner-description"]}
                </p>
                <a
                  href={item["banner-url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-3 md:mt-4 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-gray-600 text-white rounded-md text-left">
                    {language === "tr" ? "Hemen Keşfet" : "Discover Now"}
                  </button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
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
          right: 10%;
        }

        .banner-slider .swiper-button-prev {
          left: 10%;
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
