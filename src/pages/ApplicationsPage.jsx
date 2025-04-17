import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function ApplicationsPage() {
  const { data, language } = useLanguage(); // Dil bilgisi alınıyor
  const applications = data.applications;

  // Başlık ve buton metni dil koduna göre ayarlanıyor
  const applicationsTitle =
    language === "tr" ? "Uygulama Alanları" : "Application Areas";
  const moreInfoText = language === "tr" ? "Daha Fazla Bilgi →" : "Learn More →";

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-10 pb-20 pt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-12">
        {applicationsTitle}
      </h1>

      <div className="w-full flex justify-center">
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:border-orange-500 hover:scale-[1.015] transition-all duration-300 flex flex-col items-start gap-4 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 before:content-[''] before:absolute before:-top-1/2 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:rotate-12 before:scale-x-150 before:animate-shimmer" />

              <div className="text-orange-600 z-10">
                <img src={app.icon} alt={app.title} className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 z-10">
                {app.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify z-10">
                {app.description}
              </p>
              {app.link && (
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-orange-600 text-sm font-medium hover:underline z-10"
                >
                  {moreInfoText}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
