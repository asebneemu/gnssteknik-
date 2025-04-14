import { useLanguage } from "../context/LanguageContext";
import SectorCard from "../components/sectorspage/SectorCard";
import { motion } from "framer-motion";

export default function SectorsPage() {
  const { data } = useLanguage();

  return (
    <motion.div
      className="w-full flex justify-center px-4 py-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-[80%] max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-10 text-center">
          Sektörler
        </h1>
        <div className="grid grid-cols-1 gap-10">
          {data?.sectorDetails?.map((s, i) => (
            <SectorCard
              key={i}
              image={s.heroImage}
              title={s.title}
              summary={s.summary}
              id={s.id}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
