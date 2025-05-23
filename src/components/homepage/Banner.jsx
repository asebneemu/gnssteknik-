import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
  const { data, language } = useLanguage();
  const { newNavbar = [] } = data;
  const [swiperHeight, setSwiperHeight] = useState("auto");
  const [isCalculating, setIsCalculating] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const bannerRef = useRef(null);
  const location = useLocation();

  const calculateHeight = () => {
    if (bannerRef.current) {
      setIsCalculating(true);
      const offset = bannerRef.current.offsetTop;
      let height = window.innerHeight - offset;
      if (scrolled) {
        height = Math.min(height + 100, window.innerHeight);
      }
      setSwiperHeight(`${height}px`);
      setTimeout(() => setIsCalculating(false), 50);
    }
  };

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    const onScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10 && !scrolled) {
        setScrolled(true);
      } else if (scrollTop <= 10 && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setTimeout(() => {
      calculateHeight();
    }, 10);
  }, [location.pathname, scrolled]);

  return (
    <div
      className="w-full overflow-hidden relative banner-slider"
      ref={bannerRef}
      style={{
        transition: "opacity 0.3s ease-in-out, height 0.5s ease-in-out",
        opacity: isCalculating ? 0 : 1,
        height: swiperHeight,
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
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
            <BrandBanner item={item} />
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
      `}</style>
    </div>
  );
}

function BrandBanner({ item }) {
  const { language } = useLanguage();
  const [mediaIndex, setMediaIndex] = useState(0);
  const [previousMedia, setPreviousMedia] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const mediaList = item.bannerphotos || [];

  useEffect(() => {
    if (mediaList.length === 0) return;
    const current = mediaList[mediaIndex];
    const duration = current.type === "video" ? (current.duration || 10) * 1000 : 4000;

    setIsFading(true);
    const fadeTimeout = setTimeout(() => setIsFading(false), 1000);

    const timer = setTimeout(() => {
      setPreviousMedia(current);
      setMediaIndex((prev) => (prev + 1) % mediaList.length);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimeout);
    };
  }, [mediaIndex, mediaList]);

  const currentMedia = mediaList[mediaIndex];

  const renderMedia = (media, zIndex, extraClass = "") => {
    if (!media) return null;
    return media.type === "video" ? (
      <video
        key={media.src + zIndex}
        src={media.src}
        className={`absolute inset-0 w-full h-full object-cover z-${zIndex} ${extraClass}`}
        autoPlay
        muted
        playsInline
      />
    ) : (
      <div
        key={media.src + zIndex}
        className={`absolute inset-0 w-full h-full bg-cover bg-center z-${zIndex} ${extraClass}`}
        style={{ backgroundImage: `url(${media.src})` }}
      />
    );
  };

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
      {renderMedia(previousMedia, 0)}
      {renderMedia(currentMedia, 10, `${isFading ? "opacity-0" : "opacity-100"} transition-opacity duration-1000`)}

      <div
        className="bg-white bg-opacity-60 p-4 md:p-6 rounded-lg shadow-lg
        lg:absolute lg:left-1/4 lg:bottom-1/4 lg:-translate-x-1/4
        lg:w-auto lg:max-w-md lg:text-left lg:items-start
        max-[1023px]:absolute max-[1023px]:top-4 max-[1023px]:left-4
        max-[1023px]:w-fit max-[1023px]:max-w-[80%] max-[1023px]:text-left
        max-[1023px]:flex max-[1023px]:flex-col max-[1023px]:items-start
        max-[1023px]:gap-1 flex flex-col items-start z-20"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left w-full">
          {item.name}
        </h2>
        <p className="text-gray-600 mt-2 hidden lg:block text-left w-full">
          {item["banner-description"]}
        </p>
        <a href={item["banner-url"]} target="_blank" rel="noopener noreferrer">
          <button className="mt-3 md:mt-4 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-gray-600 text-white rounded-md text-left">
            {language === "tr" ? "Hemen Keşfet" : "Discover Now"}
          </button>
        </a>
      </div>
    </div>
  );
}