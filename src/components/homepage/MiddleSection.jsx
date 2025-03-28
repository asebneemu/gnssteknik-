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
  const hasImageLeft = imageLeft.trim() !== "";
  const hasImageRight = imageRight.trim() !== "";
  const noImages = !hasImageLeft && !hasImageRight;

  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.clientHeight);
    }
  }, [description, paragraphs]);

  const mobileImageClass = "w-full max-h-[200px] object-cover rounded-lg shadow-lg";
  const desktopImageClass = "w-full h-full object-cover rounded-lg shadow-lg";

  return (
    <div className="py-10 my-10 w-10/12 mx-auto">
      
      {/* 🔹 MOBİL GÖRÜNÜM */}
      <div className="lg:hidden grid grid-cols-1 gap-6 items-stretch">
        {!noImages && (
          <div className="flex flex-col gap-4">
            {hasImageLeft && <img src={imageLeft} alt="Image Left" className={mobileImageClass} />}
            {hasImageRight && <img src={imageRight} alt="Image Right" className={mobileImageClass} />}
          </div>
        )}

        <div className="flex flex-col gap-6" ref={textRef}>
          {subtitle && <h4 className="text-base font-medium text-orange-500">{subtitle}</h4>}
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-base leading-relaxed">{description}</p>
          {paragraphs.map((text, index) => (
            <p key={index} className="text-base leading-relaxed">{text}</p>
          ))}
          {buttonText && buttonLink && (
            <a 
              href={buttonLink} 
              className="mt-4 inline-block bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition max-w-max whitespace-nowrap"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>

      {/* 🔹 MASAÜSTÜ GÖRÜNÜM */}
      <div className={`hidden lg:grid ${noImages ? "grid-cols-1" : "grid-cols-5"} gap-8 items-stretch`}>
        {layout === "left" || noImages ? (
          <>
            <div 
              className={`flex flex-col gap-6 ${noImages ? "col-span-5" : "col-span-2"}`}
              ref={textRef}
            >
              {subtitle && <h4 className="text-base font-medium text-orange-500">{subtitle}</h4>}
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="text-base leading-relaxed">{description}</p>
              {paragraphs.map((text, index) => (
                <p key={index} className="text-base leading-relaxed">{text}</p>
              ))}
              {buttonText && buttonLink && (
                <a 
                  href={buttonLink} 
                  className="mt-4 inline-block bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition max-w-max whitespace-nowrap"
                >
                  {buttonText}
                </a>
              )}
            </div>

            {!noImages && (
              <div className="grid grid-cols-5 gap-4 h-full col-span-3">
                {hasImageLeft && (
                  <div className={`overflow-hidden ${hasImageRight ? "col-span-2" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageLeft} alt="Image Left" className={desktopImageClass} />
                  </div>
                )}
                {hasImageRight && (
                  <div className={`overflow-hidden ${hasImageLeft ? "col-span-3" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageRight} alt="Image Right" className={desktopImageClass} />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {!noImages && (
              <div className="grid grid-cols-5 gap-4 h-full col-span-3">
                {hasImageLeft && (
                  <div className={`overflow-hidden ${hasImageRight ? "col-span-2" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageLeft} alt="Image Left" className={desktopImageClass} />
                  </div>
                )}
                {hasImageRight && (
                  <div className={`overflow-hidden ${hasImageLeft ? "col-span-3" : "col-span-5"}`} style={{ height: textHeight }}>
                    <img src={imageRight} alt="Image Right" className={desktopImageClass} />
                  </div>
                )}
              </div>
            )}

            <div 
              className={`flex flex-col gap-6 ${noImages ? "col-span-5" : "col-span-2"}`}
              ref={textRef}
            >
              {subtitle && <h4 className="text-base font-medium text-orange-500">{subtitle}</h4>}
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="text-base leading-relaxed">{description}</p>
              {paragraphs.map((text, index) => (
                <p key={index} className="text-base leading-relaxed">{text}</p>
              ))}
              {buttonText && buttonLink && (
                <a 
                  href={buttonLink} 
                  className="mt-4 inline-block bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition max-w-max whitespace-nowrap"
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
