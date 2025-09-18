import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Tailwind ikonları gibi çalışan güzel bir ok

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        aria-label="Yukarı çık"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
}
