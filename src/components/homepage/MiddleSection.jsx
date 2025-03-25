import { useRef, useEffect, useState } from "react";

export default function MiddleSection({ 
  title, 
  subtitle,
  description,
  paragraphs = [],
  imageLeft = "",
  imageRight = "",
  buttonText, 
  buttonLink, 
  layout = "left"
}) {
  // 🔥 Resim durumu kontrolü
  const hasImageLeft = imageLeft.trim() !== "";
  const hasImageRight = imageRight.trim() !== "";
  const noImages = !hasImageLeft && !hasImageRight;

  // 🔥 Dinamik resim yüksekliği için referans ve state
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);

  // 🔥 Yazı uzunluğuna göre yükseklik ayarla
  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.clientHeight);
    }
  }, [description, paragraphs]);

  return (
    <div className="py-10 my-10 w-10/12 mx-auto">
      <div className={`grid ${noImages ? "lg:grid-cols-1" : "lg:grid-cols-5"} gap-8 items-stretch`}>
        
        {/* ✅ Metin İçeriği (%40 veya %100) */}
        {layout === "left" || noImages ? (
          <>
            <div 
              className={`flex flex-col gap-6 ${noImages ? "col-span-5" : "col-span-2"}`}
              ref={textRef}
            >
              {subtitle && <h4 className="text-base font-medium text-blue-600">{subtitle}</h4>}
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
              <p className="text-base leading-relaxed">{description}</p>
              {paragraphs.map((text, index) => (
                <p key={index} className="text-base leading-relaxed">{text}</p>
              ))}
              {buttonText && buttonLink && (
                <a 
                  href={buttonLink} 
                  className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition max-w-max whitespace-nowrap"
                >
                  {buttonText}
                </a>
              )}
            </div>

            {/* ✅ Görseller (%60 veya %100) */}
            {!noImages && (
              <div className="grid grid-cols-5 gap-4 h-full col-span-3">
                {hasImageLeft && (
                  <div className={`overflow-hidden ${hasImageRight ? "col-span-2" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageLeft} alt="Image Left" className="w-full h-full object-cover rounded-lg shadow-lg" />
                  </div>
                )}
                {hasImageRight && (
                  <div className={`overflow-hidden ${hasImageLeft ? "col-span-3" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageRight} alt="Image Right" className="w-full h-full object-cover rounded-lg shadow-lg" />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* ✅ Görseller (%60 veya %100) */}
            {!noImages && (
              <div className="grid grid-cols-5 gap-4 h-full col-span-3">
                {hasImageLeft && (
                  <div className={`overflow-hidden ${hasImageRight ? "col-span-2" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageLeft} alt="Image Left" className="w-full h-full object-cover rounded-lg shadow-lg" />
                  </div>
                )}
                {hasImageRight && (
                  <div className={`overflow-hidden ${hasImageLeft ? "col-span-3" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageRight} alt="Image Right" className="w-full h-full object-cover rounded-lg shadow-lg" />
                  </div>
                )}
              </div>
            )}

            {/* ✅ Metin İçeriği (%40 veya %100) */}
            <div 
              className={`flex flex-col gap-6 ${noImages ? "col-span-5" : "col-span-2"}`}
              ref={textRef}
            >
              {subtitle && <h4 className="text-base font-medium text-blue-600">{subtitle}</h4>}
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
              <p className="text-base leading-relaxed">{description}</p>
              {paragraphs.map((text, index) => (
                <p key={index} className="text-base leading-relaxed">{text}</p>
              ))}
              {buttonText && buttonLink && (
                <a 
                  href={buttonLink} 
                  className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition max-w-max whitespace-nowrap"
                >
                  {buttonText}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
