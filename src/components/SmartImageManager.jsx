import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SmartImageManager = () => {
  const location = useLocation();

  useEffect(() => {
    const images = document.querySelectorAll("img:not([data-smart])");

    images.forEach((img) => {
      if (!img.dataset.src && img.src) {
        img.dataset.src = img.src;
        img.src = "";
        img.dataset.smart = "true";
      }
    });

    const lazyImages = document.querySelectorAll("img[data-smart='true']");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              obs.unobserve(img);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    lazyImages.forEach((img) => observer.observe(img));

    return () => {
      observer.disconnect();
    };
  }, [location]);

  return null;
};

export default SmartImageManager;
