import { Helmet } from "react-helmet-async"; // React Helmet'ı içeri aktarın
import Banner from "../components/homepage/Banner";
import Slider from "../components/homepage/Slider";
import ContactSection from "../components/homepage/ContactSection";
import MiddleSection from "../components/homepage/MiddleSection";

import InfoCards from "../components/where/InfoCards";
import TeamCards from "../components/where/TeamCards";
import TestimonialSlider from "../components/where/TestimonialSlider";
import { useLanguage } from "../context/LanguageContext"; // useLanguage kullanıyoruz
import InstaEmbedGrid from "../components/InstaEmbedGrid";

export default function HomePage() {

  const toSlug = (str) =>
    str
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
   
  const { data, language } = useLanguage(); // useLanguage'den veri ve dil alıyoruz

  const featuredProducts = data.products?.filter((product) => product.featured);

  const {
    newNavbar = [], // Boş bir dizi olarak default değer veriyoruz
    infoCards,
    teamCards,
    testimonials,
    references,
    pageSections,
  } = data; // LanguageContext'ten gelen veriyi kullanıyoruz

  const brands = newNavbar.map((brand) => ({
    name: brand.name,
    logo: brand.icon,
    path: `/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`,
    linkable: true, // 🔥 sadece burada ekliyoruz
  }));

const featuredSliderItems = featuredProducts.map((product) => ({
  name: product.name,
  logo:
    product.image ||
    product.images?.[0] ||
    "/logos/default-logo.png",
  path: `/category/${toSlug(product.category)}/${toSlug(product.brand)}/${toSlug(product.name)}`,
  linkable: true,
}));


  // ✅ Spesifik içerikleri çek
  const aboutUsSection = pageSections.find(
    (section) => section.type === "aboutus"
  );
  const marketingSection = pageSections.find(
    (section) => section.type === "marketing"
  );
  const categoriesSection = pageSections.find(
    (section) => section.type === "categories"
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ SEO Başlık ve Meta Açıklama Eklenmiştir */}
      <Helmet>
        <title>GNSS Teknik | GNSS, Total Station, Lidar ve İHA Çözümleri</title>
        <meta
          name="description"
          content="GNSS Teknik, profesyonel GNSS, Total Station, Lidar, İHA çözümleri sunar. İnşaat, haritacılık, mühendislik ve daha pek çok alanda yüksek hassasiyetli teknolojilerle veri toplama çözümleri."
        />
        <meta
          name="keywords"
          content="GNSS, Total Station, Lidar, İHA, Haritacılık, Mühendislik, Teknoloji"
        />
        <meta name="author" content="GNSS Teknik" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ✅ Banner */}
      <Banner />

      {featuredProducts?.length > 0 && (
  <Slider
    title={language === "tr" ? "Öne Çıkan Ürünler" : "Featured Products"}
    photos={featuredSliderItems}
    variant="featured" // 🔥 burada belirtiyoruz!
  />
)}

      {/* ✅ Marketing Section */}
      {marketingSection && (
        <MiddleSection
          title={marketingSection.title}
          subtitle={marketingSection.subtitle}
          description={marketingSection.description}
          paragraphs={marketingSection.paragraphs}
          imageLeft={marketingSection.imageLeft}
          imageRight={marketingSection.imageRight}
          buttonText={marketingSection.buttonText}
          buttonLink={marketingSection.buttonLink}
          layout={marketingSection.layout}
        />
      )}
      <InstaEmbedGrid />
      {/* ✅ Referanslar Slider */}
      <Slider
        title={language === "tr" ? "Referanslarımız" : "Our References"}
        photos={references}
      />

      {/* ✅ About Us Section */}
      {aboutUsSection && (
        <MiddleSection
          title={aboutUsSection.title}
          subtitle={aboutUsSection.subtitle}
          description={aboutUsSection.description}
          paragraphs={aboutUsSection.paragraphs}
          imageLeft={aboutUsSection.imageLeft}
          imageRight={aboutUsSection.imageRight}
          buttonText={aboutUsSection.buttonText}
          buttonLink={aboutUsSection.buttonLink}
          layout={aboutUsSection.layout}
        />
      )}

      {/* ✅ Markalar Slider */}
      <Slider
        title={language === "tr" ? "Markalarımız" : "Our Brands"}
        photos={brands}
      />

      {/* ✅ Kategoriler için MiddleSection */}
      {categoriesSection && (
        <MiddleSection
          title={categoriesSection.title}
          subtitle={categoriesSection.subtitle}
          description={categoriesSection.description}
          paragraphs={categoriesSection.paragraphs}
          imageLeft={categoriesSection.imageLeft}
          imageRight={categoriesSection.imageRight}
          buttonText={categoriesSection.buttonText}
          buttonLink={categoriesSection.buttonLink}
          layout={categoriesSection.layout}
        />
      )}

      {/* ✅ İletişim ve Sosyal Medya */}
      <ContactSection />
    </div>
  );
}
