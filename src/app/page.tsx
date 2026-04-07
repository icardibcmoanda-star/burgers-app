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
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-24">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      <div className="px-6 py-8 max-w-7xl mx-auto">
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
      <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-30 md:hidden bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-red-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-xl shadow-red-200 active:scale-95 transition-all border-2 border-red-500 text-sm"
        >
          Ver mi carrito
        </button>
      </footer>
    </main>
  );
}
