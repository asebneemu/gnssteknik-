// src/pages/CustomersPage.jsx
import { useData } from "../context/DataContext";
import FeaturedSection from "../components/categorypage/FeaturedSection";

export default function CustomersPage() {
  const { customerStories } = useData();

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
