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
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black text-white shadow-md">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
          Roses <span className="text-red-600">Burgers</span>
        </h1>
      </div>
      <button
        onClick={onCartClick}
        className="relative p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
};
