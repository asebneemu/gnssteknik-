import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function AccordionMenu() {
  const { data, resetSelections } = useLanguage();
  const sections = data.accordionSections || [];
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.href === "/category") {
      resetSelections();
    }

    if (item.external) {
      window.open(item.href, "_blank", "noopener noreferrer");
    } else {
      navigate(item.href);
    }
  };

  return (
    <nav className="bg-gray-100 py-8 w-full">
      <div className="flex w-full">
        <div className="w-[10%] hidden lg:block" />

        <div className="w-[80%] mx-auto px-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {sections.map((sec, idx) => {2
              const isGNSSBlock =
                sec.title === "GNSS HARİTA TEKNİK DAN. SAN. VE TİC. A.Ş.";

              return (
                <div key={idx} className="space-y-3">
                  <h3 className="text-md font-semibold text-gray-800 uppercase relative inline-block whitespace-nowrap">
                    {sec.title}
                    {isGNSSBlock && (
                      <span
                        className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white, gray, black, gray, white)",
                        }}
                      />
                    )}
                  </h3>

                  <ul className="space-y-1 text-md">
                    {sec.items.map((item, j) => (
                      <li key={j}>
                        {isGNSSBlock ? (
                          <span className="text-gray-500 cursor-default">
                            {item.label}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClick(item)}
                            className="text-left text-gray-600 hover:text-red-600 transition"
                          >
                            {item.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[10%] hidden lg:block" />
      </div>
    </nav>
  );
}
