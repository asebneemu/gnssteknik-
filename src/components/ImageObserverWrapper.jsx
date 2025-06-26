import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const observeImages = () => {
  const images = document.querySelectorAll("img[data-smart='true']");

  images.forEach((img) => {
    const wrapper = img.parentElement;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(wrapper);
  });
};

const ImageObserverWrapper = ({ children }) => {
  useEffect(() => {
    observeImages();
  }, []);

  return children;
};

export default ImageObserverWrapper;
