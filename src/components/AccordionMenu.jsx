// src/components/AccordionMenu.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function AccordionMenu() {
  const { data } = useLanguage();
  const sections = data.accordionSections || [];

  return (
    <nav className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-md font-semibold text-gray-800 uppercase">
              {sec.title}
            </h3>
            <ul className="space-y-1">
              {sec.items.map((item, j) => (
                <li key={j}>
                  <a
                    href={item.href}
                    className="text-md text-gray-600 hover:text-red-600 transition"
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
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
