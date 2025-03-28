import { useRef, useState, useEffect } from "react";

const CategoryDetail = ({ title, description, photo }) => {
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);
  const imageHeight = 350;

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setTextHeight(textRef.current.clientHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [description]);

  return (
    <div className="mb-16 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-left">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-[200px] sm:h-[250px] md:h-[350px]">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={textRef}
          className="text-lg text-gray-700 max-h-none overflow-visible"
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
