import { useRef, useState, useEffect } from "react";

const CategoryDetail = ({ title, description, photo }) => {
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setTextHeight(textRef.current.clientHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [description]);

  // photo === "" veya undefined/null ise noImage true olur
  const noImage = !photo;

  return (
    <div className="mb-16 mt-16">
      {/* Başlık: resimsizse ortala */}
      <h1
        className={`text-4xl font-bold mb-8 ${
          noImage ? "text-center" : "text-left"
        }`}
      >
        {title}
      </h1>

      {/* Grid: resim yoksa tek sütun */}
      <div
        className={`grid gap-8 items-stretch ${
          noImage ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {/* Görsel alanı: yalnızca photo varsa */}
        {!noImage && (
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-[200px] sm:h-[250px] md:h-[350px]">
            <img
              src={photo}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Açıklama */}
        <div
          ref={textRef}
          className={`text-lg text-gray-700 ${
            noImage ? "mx-auto max-w-2xl text-center" : ""
          }`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
