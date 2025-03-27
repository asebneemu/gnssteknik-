import React from "react";
import { useLanguage } from "../context/LanguageContext"; // useLanguage hook'unu ekledik

const AboutUsSection = ({ title, paragraphs }) => {
  return (
    <div className="w-[80%] mx-auto mb-16">
      <h2 className="text-4xl font-bold mb-8 text-left">{title}</h2>
      <div className="flex flex-col gap-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-base leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </div>
  );
};

const PartnersSection = ({ logos, title }) => {
  return (
    <div className="w-[80%] mx-auto mb-16">
      <h2 className="text-4xl font-bold mb-8 text-left">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-full h-auto object-contain max-h-24"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default function AboutUsPage() {
  const { data, language } = useLanguage(); // Dil ve veri alınıyor

  if (!data || !data.aboutUs) {
    return (
      <div className="text-center py-10">
        {language === "tr"
          ? "Hakkımızda bilgisi yüklenemedi."
          : "About Us information could not be loaded."}
      </div>
    );
  }

  const { aboutUs, vision, mission, values, partners } = data.aboutUs;

  return (
    <div className="py-10">
      <AboutUsSection title={aboutUs.title} paragraphs={aboutUs.paragraphs} />

      <AboutUsSection title={vision.title} paragraphs={vision.paragraphs} />

      <AboutUsSection title={mission.title} paragraphs={mission.paragraphs} />

      <AboutUsSection title={values.title} paragraphs={values.paragraphs} />

      <PartnersSection title={partners.title} logos={partners.logos} />
    </div>
  );
}
