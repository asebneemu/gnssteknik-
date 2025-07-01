// src/components/AccordionMenu.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function AccordionMenu() {
  const { data } = useLanguage();
  const sections = data.accordionSections || [];

  return (
    <nav className="w-full bg-gray-100 py-12">
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {sections.map((sec, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">{sec.title}</h3>
            <ul className="space-y-2">
              {sec.items.map((item, j) => (
                <li key={j}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-red-600 transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
