import Banner from "../components/homepage/Banner";
import Slider from "../components/homepage/Slider";
import ContactSection from "../components/homepage/ContactSection";
import MiddleSection from "../components/homepage/MiddleSection";
import SocialSidebar from "../components/SocialLinks";
import InfoCards from "../components/where/InfoCards";
import TeamCards from "../components/where/TeamCards";
import TestimonialSlider from "../components/where/TestimonialSlider";
import { useLanguage } from "../context/LanguageContext"; // useLanguage kullanıyoruz

export default function HomePage() {
  const { data, language } = useLanguage(); // useLanguage'den veri ve dil alıyoruz

  const {
    newNavbar = [], // Boş bir dizi olarak default değer veriyoruz
    socialLinks,
    infoCards,
    teamCards,
    testimonials,
    references,
    pageSections,
  } = data; // LanguageContext'ten gelen veriyi kullanıyoruz

  const brands = newNavbar.map((brand) => ({
    name: brand.name,
    logo: brand.icon,
  }));

  // ✅ Spesifik içerikleri çek
  const aboutUsSection = pageSections.find((section) => section.type === "aboutus");
  const marketingSection = pageSections.find((section) => section.type === "marketing");
  const categoriesSection = pageSections.find((section) => section.type === "categories");

  return (
    <div className="min-h-screen flex flex-col">
      <Banner />

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

      {/*<InfoCards items={infoCards} />*/}

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

      {/*<TeamCards team={teamCards} />*/}
      {/*<TestimonialSlider testimonials={testimonials} />*/}
      <ContactSection />
      <SocialSidebar socialLinks={socialLinks} />
    </div>
  );
}
