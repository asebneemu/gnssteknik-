import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TestimonialSlider = ({ testimonials }) => {
  return (
    <div className="w-10/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Müşteri Yorumları</h2>
      <Swiper spaceBetween={30} slidesPerView={1} loop>
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">{testimonial.name}</h3>
              <span className="text-sm text-gray-500">{testimonial.position}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
