import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType(); // 👈 geçiş türünü al

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0); // 🔥 sadece yeni bir tıklama olduğunda başa dön
    }
  }, [pathname, navigationType]);

  return null;
}
