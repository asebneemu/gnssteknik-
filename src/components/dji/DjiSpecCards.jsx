import React, { useEffect, useRef } from "react";

const DjiSpecCards = ({ product }) => {
  const visuals = product?.images?.slice(2) || [];
  const specs = product?.specs || [];

  const totalCards = visuals.length >= 6 ? 6 : visuals.length;
  const specsPerCard = Math.floor(specs.length / totalCards);
  const remainder = specs.length % totalCards;

  let distributedSpecs = [];
  let currentIndex = 0;
  for (let i = 0; i < totalCards; i++) {
    const count = specsPerCard + (i < remainder ? 1 : 0);
    const text = specs.slice(currentIndex, currentIndex + count).join(" ");
    distributedSpecs.push(text);
    currentIndex += count;
  }

  const refs = Array.from({ length: 6 }, () => useRef(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) target.classList.add("show");
        });
      },
      { threshold: 0.5 }
    );

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () =>
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
  }, []);

  return (
    <div className="w-full bg-gray-900 py-40 text-white space-y-14">
      {/* 1️⃣ Özel Tasarım İlk Kart */}
      {visuals[0] && (
        <div className="w-[70%] mx-auto h-[350px] relative flex items-center justify-center">
          <div className="w-[80%] h-full mx-auto md:ml-auto relative">
            <img
              src={visuals[0]}
              alt="Kart 1"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div
            ref={refs[0]}
            className="fade-up absolute md:left-0 top-[25%] w-full md:w-[40%] h-[250px] bg-black/40 rounded-xl flex items-center justify-center px-6"
          >
            <p className="text-sm md:text-lg font-semibold text-center leading-relaxed drop-shadow-md">
              {distributedSpecs[0]}
            </p>
          </div>
        </div>
      )}

      {/* 2️⃣ 30-70 İkili Kartlar */}
      {(visuals[1] || visuals[2]) && (
        <div className="w-[70%] mx-auto flex flex-col md:flex-row gap-6">
          {visuals[1] && (
            <div
              ref={refs[1]}
              className="fade-left md:w-[30%] relative h-[350px] overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={visuals[1]}
                alt="Kart 2-1"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%]">
                <p className="text-sm md:text-xl font-medium text-center leading-relaxed drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
                  {distributedSpecs[1]}
                </p>
              </div>
            </div>
          )}
          {visuals[2] && (
            <div
              ref={refs[2]}
              className="fade-right md:w-[70%] relative h-[350px] overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={visuals[2]}
                alt="Kart 2-2"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%]">
                <p className="text-sm md:text-xl font-medium text-center leading-relaxed drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
                  {distributedSpecs[2]}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3️⃣ 50-50 İkili Kartlar */}
      {(visuals[3] || visuals[4]) && (
        <div className="w-[70%] mx-auto flex flex-col md:flex-row gap-6">
          {visuals[3] && (
            <div
              ref={refs[3]}
              className="fade-left w-full md:w-1/2 relative h-[350px] overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={visuals[3]}
                alt="Kart 3-1"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[85%]">
                <p className="text-sm md:text-xl font-medium text-center leading-relaxed drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
                  {distributedSpecs[3]}
                </p>
              </div>
            </div>
          )}
          {visuals[4] && (
            <div
              ref={refs[4]}
              className="fade-right w-full md:w-1/2 relative h-[350px] overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src={visuals[4]}
                alt="Kart 3-2"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[85%]">
                <p className="text-sm md:text-xl font-medium text-center leading-relaxed drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
                  {distributedSpecs[4]}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4️⃣ Özel Tasarım Son Kart */}
      {visuals[5] && (
        <div className="w-[70%] mx-auto h-[350px] relative flex items-center justify-center">
          <div className="w-[80%] h-full mx-auto md:ml-auto relative">
            <img
              src={visuals[5]}
              alt="Kart 4"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div
            ref={refs[5]}
            className="fade-up absolute md:left-0 top-[25%] w-full md:w-[40%] h-[250px] bg-black/40 rounded-xl flex items-center justify-center px-6"
          >
            <p className="text-sm md:text-lg font-semibold text-center leading-relaxed drop-shadow-md">
              {distributedSpecs[5]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DjiSpecCards;
