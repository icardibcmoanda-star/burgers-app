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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="relative w-full max-w-md h-full bg-neutral-950 shadow-2xl flex flex-col border-l border-neutral-800 animate-in slide-in-from-right duration-300">
        <div className="p-6 flex items-center justify-between border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-yellow-500" />
            <h2 className="text-xl font-black uppercase tracking-tighter">Tu Pedido</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 gap-4 opacity-50">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="font-medium">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-neutral-900/50 rounded-2xl border border-neutral-800/50">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm uppercase tracking-tight">{item.name}</h4>
                        <span className="text-yellow-500 font-bold text-sm">
                          ${(item.price * item.quantity).toLocaleString("es-AR")}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-700">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-neutral-400 hover:text-white transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-neutral-400 hover:text-white transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs font-bold text-neutral-500 hover:text-red-500 uppercase tracking-widest transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info */}
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-500">Datos de Entrega</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-yellow-600 outline-none transition-colors placeholder:text-neutral-600"
                  />
                  <input
                    type="text"
                    placeholder="Dirección / Comentarios"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-yellow-600 outline-none transition-colors placeholder:text-neutral-600"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-neutral-900 border-t border-neutral-800 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-neutral-400 font-medium">Subtotal</span>
              <span className="text-2xl font-black text-white">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </div>
            <button
              onClick={handleSendOrder}
              disabled={!customerName}
              className="w-full flex items-center justify-center gap-3 py-4 bg-yellow-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-700 disabled:opacity-50 disabled:hover:bg-yellow-600 transition-all shadow-[0_4px_20px_rgba(202,138,4,0.3)] group active:scale-[0.98]"
            >
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Finalizar Pedido
            </button>
            {!customerName && (
              <p className="text-[10px] text-center text-yellow-500/80 uppercase font-bold tracking-widest">
                Ingresa tu nombre para continuar
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
