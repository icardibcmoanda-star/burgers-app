"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Send } from "lucide-react";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const formatWhatsAppMessage = () => {
    const itemsText = cart
      .map((item) => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString("es-AR")})`)
      .join("\n");

    const message = `*NUEVO PEDIDO - COMADREJA BURGERS*\n\n` +
      `*Cliente:* ${customerName || "No especificado"}\n` +
      `*Dirección:* ${address || "Retiro en local"}\n\n` +
      `*Detalle:*\n${itemsText}\n\n` +
      `*TOTAL:* $${totalPrice.toLocaleString("es-AR")}\n\n` +
      `_Enviado desde la Web App_`;

    return encodeURIComponent(message);
  };

  const handleSendOrder = () => {
    if (cart.length === 0) return;
    const whatsappUrl = `https://wa.me/5491100000000?text=${formatWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 flex items-center justify-between border-b border-neutral-100 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-red-600" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-neutral-900">Tu Pedido</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-neutral-50/50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400 gap-4">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="font-bold uppercase tracking-widest text-xs">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-sm uppercase tracking-tight text-neutral-900">{item.name}</h4>
                        <span className="text-red-600 font-black text-sm">
                          ${(item.price * item.quantity).toLocaleString("es-AR")}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-neutral-100 px-3 py-1 rounded-full">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-neutral-500 hover:text-red-600 transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-black w-4 text-center text-neutral-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-neutral-500 hover:text-red-600 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-black text-neutral-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info */}
              <div className="space-y-4 pt-6 border-t border-neutral-200">
                <h3 className="font-black text-xs uppercase tracking-widest text-neutral-400">Datos para el envío</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400 shadow-sm text-neutral-900"
                  />
                  <input
                    type="text"
                    placeholder="Dirección o Localidad"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400 shadow-sm text-neutral-900"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-neutral-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Total a pagar</span>
              <span className="text-3xl font-black text-red-600">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </div>
            <button
              onClick={handleSendOrder}
              disabled={!customerName}
              className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 transition-all shadow-lg shadow-red-200 group active:scale-[0.98]"
            >
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Enviar a WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
