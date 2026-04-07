"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Burgers");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <div className="sticky top-[72px] z-40 bg-black/95 backdrop-blur-md">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Floating Cart Button for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-30 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-yellow-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all border-2 border-yellow-500"
        >
          Ver mi pedido
        </button>
      </footer>
    </main>
  );
}
