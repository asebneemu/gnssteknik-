import { motion } from "framer-motion";

// 4. Kısım: Görünüm ortalandığında tetiklenen giriş animasyonları
// - Dikey etiket (soldan içeri)
// - Sağdaki büyük satırlar (sağdan içeri, küçük stagger ile)
// Not: Dosya adında Türkçe karakter varsa bazı editörlerde sorun olabilir. Sorun yaşarsanız
// dosyayı SdiProYaziliKisim4.jsx olarak yeniden adlandırın.

export default function SdiProYazılıKısım4() {
  // Soldaki dikey etiket için (soldan içeri)
  const leftIn = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  };

  // Sağdaki sayısal blok için (sağdan içeri) + satırlara küçük stagger
  const rightGroup = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const rightLine = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 18 },
    },
  };

  // Bölüm ekranın ortasına yaklaşınca tetikleme (yaklaşık %55 görünürlükte)
  const vp = { amount: 0.55, margin: "0px 0px -10% 0px", once: false };

  return (
    <section className="relative bg-black text-white py-14 sm:py-16 md:py-20">
      {/* üst blok */}
      <div className="w-[90%] sm:w-[85%] md:w-[70%] mx-auto">
        <div className="w-full flex justify-end">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Dikey yazı (soldan gelsin) */}
            <motion.span
              variants={leftIn}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="font-black text-xs sm:text-sm md:text-base lg:text-2xl tracking-widest"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              Konumlama Hassasiyeti
            </motion.span>

            {/* Sağdaki büyük satırlar (sağdan gelsin) */}
            <motion.div
              variants={rightGroup}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="text-left leading-none"
            >
              <motion.span
                variants={rightLine}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                20m
              </motion.span>
              <motion.span
                variants={rightLine}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                kadar
              </motion.span>
              <motion.span
                variants={rightLine}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                3cm
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* alt blok */}
      <div className="w-[90%] sm:w-[85%] md:w-[70%] mx-auto mt-16 sm:mt-20 md:mt-24">
        <div className="w-full flex justify-start">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Dikey yazı (soldan gelsin) */}
            <motion.span
              variants={leftIn}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="font-black text-xs sm:text-sm md:text-base lg:text-2xl tracking-widest"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              Mesafe Aralığı
            </motion.span>

            {/* Sağdaki büyük satırlar (sağdan gelsin) */}
            <motion.div
              variants={rightGroup}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="text-left leading-none"
            >
              <motion.span
                variants={rightLine}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                150m-
              </motion.span>
              <motion.span
                variants={rightLine}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                200m
              </motion.span>
              <motion.span
                variants={rightLine}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                max.
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
