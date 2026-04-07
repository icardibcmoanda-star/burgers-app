"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Star, Trophy } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Burgers");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-24">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section - The "WOW" Factor */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-red-600">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-30" />
            <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Burger Background" 
            />
        </div>
        <div className="relative z-10 text-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center mb-4"
            >
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] py-2 px-6 rounded-full border border-white/30 flex items-center gap-2">
                    <Trophy size={14} className="text-yellow-400" />
                    EL SABOR QUE MANDA
                </span>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85]"
            >
                LA MEJOR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-100">BURGER</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-white/80 max-w-md mx-auto font-medium text-lg"
            >
                No es solo carne y pan. Es una Comadreja. <br /> Pedí la tuya en un par de clics.
            </motion.p>
        </div>
        
        {/* Animated Badge */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -right-16 w-48 h-48 bg-white rounded-full hidden lg:flex items-center justify-center border-8 border-red-500 shadow-2xl z-20"
        >
            <div className="text-red-600 font-black text-center uppercase tracking-tighter text-sm">
                100%<br />CALIDAD<br />PREMIUM
            </div>
        </motion.div>
      </section>

      {/* Floating Menu Header */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-red-50">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-2 bg-red-600 rounded-full" />
            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-neutral-900">
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

      {/* Trust Badges */}
      <section className="bg-white py-16 border-t border-neutral-100 mb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                    <Flame size={32} />
                </div>
                <h4 className="font-black uppercase italic">Parrilla a Leña</h4>
                <p className="text-sm text-neutral-500">Sabor ahumado real en cada bocado.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                    <Star size={32} />
                </div>
                <h4 className="font-black uppercase italic">Ingredientes Top</h4>
                <p className="text-sm text-neutral-500">Solo usamos carne de exportación y pan artesanal.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                    <Trophy size={32} />
                </div>
                <h4 className="font-black uppercase italic">Envío Express</h4>
                <p className="text-sm text-neutral-500">Llega caliente o es gratis. (Casi siempre caliente).</p>
            </div>
        </div>
      </section>

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
