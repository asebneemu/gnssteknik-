import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SectorDetailPage() {
  const { id } = useParams();
  const { data } = useLanguage();
  const [sector, setSector] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const found = data.sectorDetails.find((s) => s.id === id);
    setSector(found);
  }, [id, data]);

  // Sıra sıra animasyon
  useEffect(() => {
    if (!sector) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sector.benefits.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [sector]);

  if (!sector) return <div className="text-center py-10 text-xl">Yükleniyor...</div>;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-10 pb-20 pt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO */}
      <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12">
        <img
          src={sector.heroImage}
          alt={sector.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            className="text-white text-3xl md:text-5xl font-bold text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {sector.title}
          </motion.h1>
        </div>
      </div>

      {/* AÇIKLAMALAR */}
      <motion.div
        className="space-y-6 text-base text-gray-700 leading-relaxed whitespace-pre-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>{sector.summary}</p>
        <p>{sector.overview}</p>
      </motion.div>

      {/* NASIL ÇALIŞIR */}
      <motion.div
        className="mt-16 space-y-6 text-base text-gray-700 leading-relaxed whitespace-pre-line"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex justify-center">
          <img
            src={sector.howItWorks.image}
            alt="Nasıl çalışır görseli"
            className="w-full md:w-2/3 rounded-xl object-cover"
          />
        </div>
        <p className="text-justify">{sector.howItWorks.description}</p>
      </motion.div>

      {/* FAYDALAR SLOGAN */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mt-20 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Senceive ile Sahada Her Şey Kontrol Altında
      </motion.h2>

      {/* FAYDALAR LİSTESİ */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sector.benefits.map((b, i) => (
          <motion.li
            key={i}
            className={`flex items-start gap-3 p-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-500
              ${i === activeIndex ? "ring-2 ring-green-500 bg-green-50 scale-[1.02]" : "bg-white"}`}
          >
            <CheckCircle className="text-green-600 shrink-0 mt-1" size={22} />
            <span className="text-gray-800 font-medium leading-relaxed">{b}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
