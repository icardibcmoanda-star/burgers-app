"use client";

import React from "react";

const categories = ["Burgers", "Especiales", "Sandwiches", "Adicionales", "Bebidas"];

type CategoryFilterProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto gap-3 py-4 px-6 no-scrollbar bg-white/95 border-b border-neutral-100">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
            activeCategory === category
              ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200"
              : "bg-transparent border-neutral-200 text-neutral-500 hover:border-red-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
