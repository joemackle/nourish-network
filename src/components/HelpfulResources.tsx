import React from "react";

export default function HelpfulResources() {
  const resources = [
    { name: "Local Health Resources", link: "https://example.com/health" },
    { name: "Nutrition Tips", link: "https://example.com/nutrition" },
    { name: "Food Safety Guidelines", link: "https://example.com/food-safety" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Helpful Resources</h2>
      <ul className="mt-2 space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {resource.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
