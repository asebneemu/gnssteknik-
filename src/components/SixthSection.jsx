import { useEffect, useRef, useState } from "react";

export default function SixthSection({
  leftImage,
  topImage,
  gradientText,
}) {
  const imgWrapRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const [rot, setRot] = useState(0); // derece

  useEffect(() => {
    const onScroll = () => {
      const currY = window.scrollY;
      const dir = currY > lastY.current ? 1 : -1; // 1: aşağı, -1: yukarı
      lastY.current = currY;

      const el = imgWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        setRot((r) => {
          const next = r + dir * 2.5; // küçük adım
          return Math.max(Math.min(next, 20), -20); // ±20°
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = (e) => {
    const box = imgWrapRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height; // 0..1
    const offset = (0.5 - relY) * 6; // -3..+3°
    box.style.setProperty("--mouse-tilt", `${offset}deg`);
  };

  const onMouseLeave = () => {
    const box = imgWrapRef.current;
    if (!box) return;
    box.style.setProperty("--mouse-tilt", `0deg`);
  };

  return (
    <section className="relative bg-black text-white py-20">
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* SOL: Görsel (scroll & mouse ile döner) */}
        <div
          ref={imgWrapRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            transform: `rotate(${rot}deg) rotate(var(--mouse-tilt, 0deg))`,
            transition: "transform 200ms ease",
            transformOrigin: "50% 50%",
          }}
          className="flex justify-center lg:justify-start"
        >
          <img
            src={leftImage}
            alt="SDi Pro - Left Visual"
            className="w-full max-w-5xl h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* SAĞ: Üst görsel + altta gradient kutu */}
        <div className="space-y-6">
          <div className="w-full h-40 lg:h-20 overflow-hidden rounded-xl flex items-center justify-center ">
            <img
              src={topImage}
              alt="Top Visual"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="w-full">
            {/* beyaz çerçeveli, içi mavi→yeşil gradient kutu (genişliği korur) */}
            <div className="w-full">
            <div
  className="rounded-[12px] py-6 px-4 flex flex-col items-center justify-center
             border-2 border-white
             bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
>
  {Array.isArray(gradientText) ? (
    gradientText.map((line, i) => (
      <span
        key={i}
        className="text-white text-lg lg:text-xl font-bold drop-shadow leading-tight"
      >
        {line}
      </span>
    ))
  ) : (
    <span className="text-white text-xl lg:text-2xl font-bold drop-shadow">
      {gradientText}
    </span>
  )}
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
