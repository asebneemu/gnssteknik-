// src/pages/AboutUsPage.jsx
import { useData } from "../context/DataContext";

export default function AboutUsPage() {
  const { pageSections } = useData();
  const aboutUsData = pageSections.find(section => section.type === "aboutus");

  if (!aboutUsData) return <div>Yükleniyor...</div>;

  const { title, description, paragraphs, otherp } = aboutUsData;

  // 🔥 İlk paragraf: description + paragraphs birleşimi
  const firstParagraph = [description, ...paragraphs].join(" ");

  // 🔥 Toplam 6 paragraf (ilk ve diğer 5)
  const allParagraphs = [firstParagraph, ...otherp];

  return (
    <div className="w-[80%] mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-left">Hakkımızda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          {allParagraphs.slice(0, 3).map((text, index) => (
            <p key={index} className="text-base leading-relaxed text-gray-700">
              {text}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {allParagraphs.slice(3, 6).map((text, index) => (
            <p key={index} className="text-base leading-relaxed text-gray-700">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
