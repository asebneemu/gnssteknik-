// src/pages/CustomersPage.jsx
import { useLanguage } from "../context/LanguageContext"; // useLanguage kullanıyoruz
import FeaturedSection from "../components/categorypage/FeaturedSection";

export default function CustomersPage() {
  const { data } = useLanguage(); // useLanguage hook'u ile data alıyoruz
  const { customerStories } = data;

  return (
    <div className="my-20">
      {customerStories.map((story, index) => (
        <FeaturedSection
          key={index}
          title={story.title}
          description={story.description}
          imageLeft={story.imageLeft}
          imageRight={story.imageRight}
          bottomText={story.bottomText}
        />
      ))}
    </div>
  );
}
