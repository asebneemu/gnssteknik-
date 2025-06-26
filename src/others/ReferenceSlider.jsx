import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const references = [
  { name: "Reference 1", logo: "/logos/reference1.png" },
  { name: "Reference 2", logo: "/logos/reference2.png" },
  { name: "Reference 3", logo: "/logos/reference3.png" },
  { name: "Reference 4", logo: "/logos/reference4.png" },
  { name: "Reference 5", logo: "/logos/reference5.png" },
  { name: "Reference 6", logo: "/logos/reference6.png" },
  { name: "Reference 7", logo: "/logos/reference7.png" },
  { name: "Reference 8", logo: "/logos/reference8.png" },
  { name: "Reference 9", logo: "/logos/reference9.png" },
  { name: "Reference 10", logo: "/logos/reference10.png" },
  { name: "Reference 11", logo: "/logos/reference11.png" },
  { name: "Reference 12", logo: "/logos/reference12.png" },
  { name: "Reference 13", logo: "/logos/reference13.png" },
];

const ReferenceSlider = () => {
  return (
    <div className="w-10/12 mx-auto py-10 relative">
      {/* Başlık ve Oklar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-gray-500 text-transparent bg-clip-text">
          REFERANSLARIMIZ
        </h2>
        <div className="flex gap-4">
          <button className="swiper-button-prev-custom w-14 h-14 bg-gray-300 rounded-lg flex items-center justify-center text-2xl">
            ❮
          </button>
          <button className="swiper-button-next-custom w-14 h-14 bg-gray-300 rounded-lg flex items-center justify-center text-2xl">
            ❯
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="w-10/12 mx-auto">
        <Swiper
        loop={false}
          slidesPerView={3}
          slidesPerGroup={3} // her kaydırmada 3 slayt kaydıracak
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          className="mySwiper my-20"
          breakpoints={{
            0: {
              slidesPerView: 3, // en küçük ekranlar için 3 resim
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3, // sm ve altı 3 resim
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5, // md için 5 resim
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7, // lg ve üstü için 7 resim
              spaceBetween: 20,
            },
          }}
        >
          {references.map((reference, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={reference.logo}
                alt={reference.name}
                className="h-16 w-auto sm:h-12 md:h-14 lg:h-16" // responsive image height
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReferenceSlider;
