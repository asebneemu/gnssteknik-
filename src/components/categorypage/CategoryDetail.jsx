// src/components/CategoryDetail.jsx
import { useRef, useState, useEffect } from "react";

const CategoryDetail = ({ title, description, photo }) => {
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);
  const imageHeight = 350;

  // ✅ Yazı yüksekliğini hesaplama
  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setTextHeight(textRef.current.clientHeight);
      }
    };

    handleResize(); // İlk yükleme için
    window.addEventListener("resize", handleResize); // Sayfa boyutu değiştiğinde yeniden hesapla

    return () => {
      window.removeEventListener("resize", handleResize); // Temizleme
    };
  }, [description]);

  return (
    <div className="mb-16 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-left">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div
          className="relative w-full overflow-hidden rounded-lg shadow-lg"
          style={{ height: `${imageHeight}px` }}
        >
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={textRef}
          className={`text-lg text-gray-700 ${
            textHeight > imageHeight ? "overflow-y-scroll max-h-[350px] pr-2" : ""
          }`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
