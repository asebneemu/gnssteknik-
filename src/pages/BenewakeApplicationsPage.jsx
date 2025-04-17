import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function BenewakeApplicationsPage() {
  const { language, data } = useLanguage();
  const applications = data.benewakeApplications || [];

  return (
    <motion.div
      className="w-full px-4 py-12 flex justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-12 text-center">
          {language === "tr" ? "Uygulama Alanları" : "Application Areas"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {applications.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-xl shadow hover:shadow-lg p-6 transition text-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {language === "tr" ? "Detaylı Bilgi" : "More Info"}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
