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
        loop={false}
        loopAdditionalSlides={1}
      >
        {newNavbar.map((item, index) => (
          <SwiperSlide key={index} className="h-full">
            <BrandBanner item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @media (max-width: 1024px) {
          .banner-slider .swiper-button-next,
          .banner-slider .swiper-button-prev {
            display: none !important;
          }
        }

        .banner-slider .swiper-button-next,
        .banner-slider .swiper-button-prev {
          width: 70px;
          height: 70px;
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50%;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .banner-slider .swiper-button-prev:hover {
          transform: translateX(-5px);
        }

        .banner-slider .swiper-button-next:hover {
          transform: translateX(5px);
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
  const [isFading, setIsFading] = useState(false);
  const mediaList = item.bannerphotos || [];
  const activeMedia = mediaList[mediaIndex];

  useEffect(() => {
    if (!activeMedia) return;

    const duration =
      activeMedia.type === "video"
        ? (activeMedia.duration || 10) * 1000
        : 4000;

    setIsFading(true);
    const fadeTimeout = setTimeout(() => setIsFading(false), 1000);

    const timer = setTimeout(() => {
      setMediaIndex((prev) => (prev + 1) % mediaList.length);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimeout);
    };
  }, [mediaIndex, activeMedia]);

  const renderMedia = (media, isVisible) => {
    if (!media) return null;

    if (media.type === "video") {
      return (
        <video
          key={media.src}
          src={media.src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVisible ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
      );
    } else {
      return (
        <img
          key={media.src}
          src={media.src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVisible ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          loading="eager"
          fetchpriority="high"
        />
      );
    }
  };

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
      {renderMedia(activeMedia, true)}

      <div
        className="backdrop-blur-md bg-white/10 border border-white/30 shadow-xl
        p-4 md:p-6 rounded-xl text-white
        lg:absolute lg:left-1/4 lg:bottom-1/4 lg:-translate-x-1/4
        lg:w-auto lg:max-w-md lg:text-left
        max-[1023px]:absolute max-[1023px]:top-4 max-[1023px]:left-4
        max-[1023px]:w-fit max-[1023px]:max-w-[80%]
        max-[1023px]:flex max-[1023px]:flex-col max-[1023px]:items-start
        max-[1023px]:gap-1 flex flex-col items-start z-20"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
          {item.name}
        </h2>
        <p className="mt-2 hidden lg:block text-white/90 drop-shadow-sm leading-relaxed">
          {item["banner-description"]}
        </p>
        <a href={item["banner-url"]} target="_blank" rel="noopener noreferrer">
          <button className="mt-3 md:mt-4 px-4 py-2 text-sm md:text-base bg-white/80 text-black font-semibold rounded-md hover:bg-white transition">
            {language === "tr" ? "Hemen Keşfet" : "Discover Now"}
          </button>
        </a>
      </div>
    </div>
  );
}
