"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-600 transition-all shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white leading-tight uppercase tracking-tight">
            {product.name}
          </h3>
          <span className="text-red-500 font-extrabold text-lg">
            ${product.price.toLocaleString("es-AR")}
          </span>
        </div>
        <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-neutral-800 text-white rounded-xl font-bold hover:bg-red-600 active:scale-[0.98] transition-all group-hover:bg-red-600/20 group-hover:border-red-600/50 border border-transparent"
        >
          <Plus size={18} />
          AGREGAR
        </button>
      </div>
    </div>
  );
};
