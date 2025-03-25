import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // ✅ Özel ikonlar

// Fallback (Eğer resim bozuksa)
const fallbackLogo = "/logos/default-logo.png";

export default function Slider({ title = "Slider Başlığı", photos = [] }) {
  // Verinin sayısını almak
  const totalItems = photos.length;

  // En büyük ekran boyutundaki öğe sayısını belirliyoruz
  const maxItemsOnScreen = 8; // En büyük ekranda gösterilecek öğe sayısı

  // Okları gösterecek ya da gizleyecek durumu hesaplıyoruz
  const shouldHideNavigation = totalItems === maxItemsOnScreen;

  return (
    <div className="relative w-10/12 mx-auto py-10 px-6 shadow-sm">
      {/* ✅ Başlık ve Oklar */}
      <div className="flex flex-col items-start relative mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {title}
        </h2>

        {/* ✅ Oklar Sağ Üstte */}
        {!shouldHideNavigation && (
          <div className="absolute top-0 right-0 flex gap-2 z-10">
            <button className="custom-prev w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center shadow-md transition-all">
              <FaChevronLeft className="text-gray-700 text-lg" />
            </button>
            <button className="custom-next w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center shadow-md transition-all">
              <FaChevronRight className="text-gray-700 text-lg" />
            </button>
          </div>
        )}
      </div>

      {/* ✅ Slider (Otomatik geçiş tamamen kapatıldı) */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3} // ✅ Başlangıçta 3 fotoğraf
        loop={true} // ✅ Sonsuz kaydırma açıldı
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        speed={300}
        allowTouchMove={true} // ✅ Dokunarak kaydırma açıldı
        breakpoints={{
          640: { slidesPerView: 3 }, // ✅ Küçük ekranlarda 3 fotoğraf
          768: { slidesPerView: 5 }, // ✅ Orta ekranlarda 5 fotoğraf
          1024: { slidesPerView: 8 }, // ✅ Büyük ekranlarda 8 fotoğraf
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
