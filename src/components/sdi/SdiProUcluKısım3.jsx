import { motion } from "framer-motion";

export default function SdiProUcluKısım3() {
  // ORTA GÖRSEL: yüksekten düşer gibi, büyükten normale
  const centerDropBigToFit = {
    hidden: {
      opacity: 0,
      scale: 1.35,
      y: -140,
      rotateX: -10,
      filter: "blur(10px)",
      transformPerspective: 900,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transformPerspective: 900,
      transition: {
        type: "spring",
        stiffness: 130,
        damping: 18,
        mass: 0.9,
        // süper hafif bir overshoot için
        // restDelta: 0.002
      },
    },
  };

  // Sol/sağ kartlar: uzaktan düşer gibi
  const fromDepth = (delay = 0) => ({
    hidden: {
      opacity: 0,
      scale: 0.78,
      y: -30,
      rotateX: 12,
      filter: "blur(10px)",
      transformPerspective: 900,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transformPerspective: 900,
      transition: { delay, type: "spring", stiffness: 120, damping: 16 },
    },
  });

  // Başlıklar: uzaktan ama daha hızlı
  const titleFromDepth = (delay = 0) => ({
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: -18,
      rotateX: 8,
      filter: "blur(8px)",
      transformPerspective: 900,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transformPerspective: 900,
      transition: { delay, type: "spring", stiffness: 140, damping: 14 },
    },
  });

  // zamanlama
  const t = {
    centerStart: 0, // orta görsel hemen başlasın
    sidesStart: 0.65, // sonra kartlar
    titlesStart: 1.1, // en son yazılar
  };

  return (
    <section className="py-6">
      <div className="w-[90%] sm:w-[85%] md:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
        {/* Sol kutu */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex">
            <div className="p-[2px] rounded-xl bg-gradient-to-r from-white/70 via-white/30 to-white/10">
              <motion.div
                variants={fromDepth(t.sidesStart)}
                initial="hidden"
                animate="visible"
                className="relative rounded-[10px] bg-gray-900 flex items-center justify-center overflow-hidden w-[450px] h-[250px]"
                style={{
                  willChange: "transform, filter, opacity",
                  perspective: 1000,
                }}
              >
                <img
                  src="/marka-photos/stec/sdiPro-redlaser.avif"
                  alt="RED LASER"
                  className="w-full h-full object-cover"
                />
                <motion.span
                  variants={titleFromDepth(t.titlesStart)}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0 flex items-center justify-center text-5xl sm:text-3xl md:text-7xl font-semibold tracking-wide"
                  style={{ willChange: "transform, filter, opacity" }}
                >
                  RED LASER
                </motion.span>
              </motion.div>
            </div>
          </div>
          <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-90">
            Red Laser, yeşile göre daha kısa dalga boyuna sahiptir ve bu da onu
            uzun mesafelerde daha hassas kılar.
          </p>
        </div>

    {/* Orta kutu */}
<div className="flex items-center justify-center">
  <div style={{ perspective: 1200 }} className="w-full flex justify-center">
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.6,
        y: -160,
        rotateX: -12,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
        mass: 0.9,
      }}
      className="w-full max-w-[450px] h-[250px] flex items-center justify-center"
      style={{ willChange: "transform, filter, opacity" }}
    >
      <img
        src="/marka-photos/stec/sdiPro-orta.avif"
        alt="SDi Pro Merkez"
        className="w-full h-full object-contain"
      />
    </motion.div>
  </div>
</div>


        {/* Sağ kutu */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex">
            <div className="p-[2px] rounded-xl bg-gradient-to-r from-white/70 via-white/30 to-white/10">
              <motion.div
                variants={fromDepth(t.sidesStart + 0.1)}
                initial="hidden"
                animate="visible"
                className="relative rounded-[10px] bg-gray-900 flex items-center justify-center overflow-hidden w-[450px] h-[250px]"
                style={{
                  willChange: "transform, filter, opacity",
                  perspective: 1000,
                }}
              >
                <img
                  src="/marka-photos/stec/sdiPro-agc.avif"
                  alt="AGC"
                  className="w-full h-full object-cover"
                />
                <motion.span
                  variants={titleFromDepth(t.titlesStart + 0.15)}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0 flex items-center justify-center text-5xl sm:text-3xl md:text-7xl font-semibold tracking-wide"
                  style={{ willChange: "transform, filter, opacity" }}
                >
                  AGC
                </motion.span>
              </motion.div>
            </div>
          </div>
          <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-90">
            Total station’dan miras AGC, çok zayıf ya da çok güçlü yansımaları
            işleyerek doğru mesafe sonucu üretir.
          </p>
        </div>
      </div>
    </section>
  );
}
