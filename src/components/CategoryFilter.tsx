"use client";

import React from "react";

const categories = ["Burgers", "Sides", "Drinks", "Combos"];

type CategoryFilterProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto gap-3 py-4 px-6 no-scrollbar bg-black/95">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
            activeCategory === category
              ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              : "bg-transparent border-neutral-700 text-neutral-400 hover:border-neutral-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
