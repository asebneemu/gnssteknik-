import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Fallback (Eğer resim bozuksa)
const fallbackLogo = "/logos/default-logo.png";

// ✅ Ekran genişliğini izlemek için custom hook
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default function Slider({ title = "Slider Başlığı", photos = [] }) {
  const width = useWindowWidth();
  const totalItems = photos.length;

  // ✅ Ekran boyutuna göre gösterilecek slide sayısı
  let visibleCount = 3;
  if (width >= 1024) visibleCount = 8;
  else if (width >= 768) visibleCount = 5;

  // ✅ Oklar sadece görünür öğe sayısından fazlaysa gösterilir
  const shouldShowNavigation = totalItems > visibleCount;

  return (
    <div className="relative w-10/12 mx-auto py-10 px-6 shadow-sm">
      {/* ✅ Başlık ve Oklar */}
      <div className="flex flex-col items-start relative mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          {title}
        </h2>

        {/* ✅ Oklar Sağ Üstte - mobilde biraz aşağı */}
        {shouldShowNavigation && (
          <div className="absolute top-0 sm:top-0 right-0 mt-1 sm:mt-0 flex gap-2 z-10">
            <button className="custom-prev w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center shadow-md transition-all">
              <FaChevronLeft className="text-gray-700 text-lg" />
            </button>
            <button className="custom-next w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center shadow-md transition-all">
              <FaChevronRight className="text-gray-700 text-lg" />
            </button>
          </div>
        )}
      </div>

      {/* ✅ Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={visibleCount}
        loop={true}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        speed={300}
        allowTouchMove={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 8 },
        }}
        className="rounded-lg"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-32 h-32 flex justify-center items-center bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <img
                src={photo.logo || fallbackLogo}
                alt={photo.name}
                className="w-28 h-28 object-contain transition-opacity duration-300 hover:opacity-80"
                loading="lazy"
                onError={(e) => (e.currentTarget.src = fallbackLogo)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
