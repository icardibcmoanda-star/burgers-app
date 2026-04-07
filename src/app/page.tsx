"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, Quote } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Burgers");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-24">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section - Visual Impact */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-red-600">
        <div className="absolute inset-0 opacity-25">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
            <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Burger Background" 
            />
        </div>
        <div className="relative z-10 text-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-4"
            >
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.4em] py-2 px-8 rounded-full border border-white/20">
                    SABOR DE BARRIO
                </span>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.8]"
            >
                COMADREJA <br /> <span className="text-white/90">BURGERS</span>
            </motion.h2>
        </div>
      </section>

      {/* Barrio Story Section - The Soul of the App */}
      <section className="bg-white py-16 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative"
            >
                <Quote className="absolute -top-8 -left-4 text-red-100 w-16 h-16 -z-10" />
                <p className="text-xl md:text-2xl font-black italic uppercase tracking-tight text-neutral-800 leading-tight italic">
                    "Algunos de los nombres de los sándwiches están relacionados a calles y lugares de nuestro barrio en los que durante todas las noches vemos pasar a este entrañable y mal visto animalito"
                </p>
                <div className="mt-6 flex justify-center items-center gap-4">
                    <div className="h-px w-12 bg-red-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Esencia Comadreja</span>
                    <div className="h-px w-12 bg-red-600" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* Floating Menu Header */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-red-50">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-2 bg-red-600 rounded-full" />
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-neutral-900">
                {activeCategory}
            </h3>
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Floating Cart Button for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-center z-30 md:hidden bg-gradient-to-t from-neutral-50 via-neutral-50/90 to-transparent">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="bg-red-600 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(220,38,38,0.4)] border-2 border-red-500 text-sm flex items-center justify-center gap-3"
        >
          <Star size={18} fill="currentColor" />
          VER MI PEDIDO
        </motion.button>
      </footer>
    </main>
  );
}
