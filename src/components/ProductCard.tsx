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
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-red-600 transition-all shadow-md hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-col p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-neutral-900 leading-tight uppercase tracking-tight">
            {product.name}
          </h3>
          <span className="text-red-600 font-black text-lg">
            ${product.price.toLocaleString("es-AR")}
          </span>
        </div>
        <p className="text-sm text-neutral-500 line-clamp-2 mb-4 font-medium">
          {product.description}
        </p>
        
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl font-black hover:bg-red-600 hover:text-white active:scale-[0.98] transition-all border border-red-100 uppercase tracking-widest text-xs"
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>
    </div>
  );
};
