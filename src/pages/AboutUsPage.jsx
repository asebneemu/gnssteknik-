import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";

const AboutUsSection = ({ title, paragraphs }) => (
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

/*const PartnersSection = ({ logos, title }) => (
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
);*/

const StyledTable = ({ title, columns, rows, theme }) => {
  const borderMap = {
    green: "border-green-300",
    blue: "border-blue-300"
  };

  const headerColor =
    theme === "green" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";

  return (
    <div className="w-[80%] mx-auto mb-16">
      <h2 className="text-4xl font-bold mb-4 text-left">{title}</h2>
      <div className="overflow-auto rounded-xl border shadow-sm">
        <table className={`min-w-full text-sm text-gray-800 border ${borderMap[theme]}`}>
          <thead className={`${headerColor} font-semibold uppercase text-sm`}>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="p-3 text-left border-b border-gray-300">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50 border-b">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AboutUsPage() {
  const { data, language } = useLanguage();

  if (!data || !data.aboutUs) {
    return (
      <div className="text-center py-10">
        {language === "tr"
          ? "Hakkımızda bilgisi yüklenemedi."
          : "About Us information could not be loaded."}
      </div>
    );
  }

  const { aboutUs, vision, mission, values, partners, bankInfo } = data.aboutUs;

  const ibanColumns =
    language === "tr"
      ? [
          { label: "Banka", accessor: "banka" },
          { label: "Şube", accessor: "sube" },
          { label: "Şube Kodu", accessor: "subeKodu" },
          { label: "TL IBAN", accessor: "tlIban" }
        ]
      : [
          { label: "Bank", accessor: "banka" },
          { label: "Branch", accessor: "sube" },
          { label: "Branch Code", accessor: "subeKodu" },
          { label: "TL IBAN", accessor: "tlIban" }
        ];

  const swiftColumns =
    language === "tr"
      ? [
          { label: "Banka", accessor: "banka" },
          { label: "USD IBAN", accessor: "usdIban" },
          { label: "USD SWIFT", accessor: "usdSwift" },
          { label: "EUR IBAN", accessor: "eurIban" },
          { label: "EUR SWIFT", accessor: "eurSwift" }
        ]
      : [
          { label: "Bank", accessor: "banka" },
          { label: "USD IBAN", accessor: "usdIban" },
          { label: "USD SWIFT", accessor: "usdSwift" },
          { label: "EUR IBAN", accessor: "eurIban" },
          { label: "EUR SWIFT", accessor: "eurSwift" }
        ];

  return (
    <div className="py-10">
      {/* SEO Meta Etiketleri */}
      <Helmet>
        <title>{language === "tr" ? "Hakkımızda - Şirketimiz" : "About Us - Our Company"}</title>
        <meta
          name="description"
          content={
            language === "tr"
              ? "Şirketimiz hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz hakkında daha fazla bilgiye ulaşın."
              : "Learn about our company. Discover our mission, vision, and values."
          }
        />
        <meta name="keywords" content="Hakkımızda, Şirketimiz, Misyon, Vizyon, Değerler, Ortaklar" />
        <meta name="author" content="Şirket Adı" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Sayfa İçeriği */}
      <AboutUsSection title={aboutUs.title} paragraphs={aboutUs.paragraphs} />
      <AboutUsSection title={vision.title} paragraphs={vision.paragraphs} />
      <AboutUsSection title={mission.title} paragraphs={mission.paragraphs} />
      <AboutUsSection title={values.title} paragraphs={values.paragraphs} />
      {/*<PartnersSection title={partners.title} logos={partners.logos} />*/}

      <StyledTable
        title={language === "tr" ? bankInfo.title : "Bank Information"}
        columns={ibanColumns}
        rows={bankInfo.ibanTable}
        theme="green"
      />

      <StyledTable
        title={language === "tr" ? "Swift Bilgileri" : "Swift Information"}
        columns={swiftColumns}
        rows={bankInfo.swiftTable}
        theme="blue"
      />
    </div>
  );
}
