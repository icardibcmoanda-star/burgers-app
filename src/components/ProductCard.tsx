"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const isBestseller = product.price > 15000;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {isBestseller && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/50">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-900">LO MÁS PEDIDO</span>
            </div>
        )}

        <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/50 hover:bg-red-600 hover:text-white">
            <Heart size={16} />
        </button>
      </div>

      <div className="flex flex-col p-6 flex-grow relative -mt-8 bg-white rounded-t-[2rem]">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-black text-neutral-900 leading-none uppercase italic tracking-tighter">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-red-600 font-black text-xl italic tracking-tighter leading-none">
                ${product.price.toLocaleString("es-AR")}
            </span>
            <span className="text-[8px] text-neutral-400 font-black uppercase mt-1">Precio Final</span>
          </div>
        </div>
        <p className="text-xs text-neutral-500 line-clamp-2 mb-6 font-medium leading-relaxed">
          {product.description}
        </p>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="mt-auto w-full flex items-center justify-center gap-3 py-4 bg-neutral-900 text-white rounded-2xl font-black hover:bg-red-600 active:scale-[0.98] transition-all border border-neutral-900 shadow-lg hover:shadow-red-200 uppercase tracking-[0.15em] text-[10px] italic"
        >
          <Plus size={14} />
          ME LO LLEVO
        </motion.button>
      </div>
    </motion.div>
  );
};
