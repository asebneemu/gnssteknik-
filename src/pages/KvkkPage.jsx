import React from "react";
import { useLanguage } from "@/LanguageContext";

const KvkkPage = () => {
  const { data } = useLanguage();
  const kvkk = data.kvkk;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{kvkk.title}</h1>
      <h2 className="text-xl text-gray-700 mb-6">{kvkk.subtitle}</h2>

      {kvkk.text.map((block, index) => {
        switch (block.type) {
          case "title":
            return <h3 key={index} className="text-2xl font-semibold my-6">{block.content}</h3>;
          case "paragraph":
            return <p key={index} className="mb-4 leading-relaxed text-gray-800">{block.content}</p>;
          case "table":
            return (
              <table key={index} className="table-auto w-full mb-8 border border-gray-300">
                <thead>
                  <tr>
                    {block.headers.map((header, i) => (
                      <th key={i} className="border px-4 py-2 bg-gray-100 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border px-4 py-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case "list-title":
            return <h4 key={index} className="text-lg font-medium mt-6 mb-2">{block.content}</h4>;
          case "list":
            return (
              <ul key={index} className="list-disc list-inside mb-6">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default KvkkPage;
