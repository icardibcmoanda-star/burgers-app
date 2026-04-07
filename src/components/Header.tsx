"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

type HeaderProps = {
  onCartClick: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white text-red-600 shadow-sm border-b border-red-100">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 overflow-hidden rounded-full border border-neutral-100">
          <Image
            src="https://i.imgur.com/Ga49XLQ.png"
            alt="Comadreja Logo"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">
          Comadreja <span className="text-red-600 block text-[10px] tracking-[0.2em] not-italic font-bold -mt-1">BURGERS</span>
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
