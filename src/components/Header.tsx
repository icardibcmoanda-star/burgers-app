"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

type HeaderProps = {
  onCartClick: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white text-red-600 shadow-sm border-b border-red-100">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">
          Comadreja <span className="text-red-600">Burgers</span>
        </h1>
      </div>
      <button
        onClick={onCartClick}
        className="relative p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors text-white"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
};
