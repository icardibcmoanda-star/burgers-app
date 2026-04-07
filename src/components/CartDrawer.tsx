"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Send, CreditCard, Banknote, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, updateQuantity, removeFromCart, updateNotes, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Efectivo" | "Transferencia" | "">("");
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<"none" | "valid" | "invalid">("none");

  // Simulación de chequeo de zona de entrega en Rosario
  const checkDeliveryZone = () => {
    if (!address) return;
    setIsCheckingDelivery(true);
    setTimeout(() => {
      // Validamos que sea una dirección razonable de Rosario
      setDeliveryStatus(address.length > 8 ? "valid" : "invalid");
      setIsCheckingDelivery(false);
    }, 800);
  };

  const formatWhatsAppMessage = () => {
    const itemsText = cart
      .map((item) => {
        let text = `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString("es-AR")})`;
        if (item.notes) text += `\n  ⚠️ NOTAS: ${item.notes}`;
        return text;
      })
      .join("\n");

    const message = `*NUEVO PEDIDO - COMADREJA BURGERS*\n\n` +
      `*Cliente:* ${customerName}\n` +
      `*Dirección:* ${address}\n` +
      `*Pago:* ${paymentMethod}\n\n` +
      `*Detalle:*\n${itemsText}\n\n` +
      `*TOTAL:* $${totalPrice.toLocaleString("es-AR")}\n\n` +
      `_Enviado desde Bv. Argentino 8012, Rosario_`;

    return encodeURIComponent(message);
  };

  const handleSendOrder = () => {
    if (cart.length === 0 || !customerName || !address || !paymentMethod) return;
    // El número de Comadreja debería ir aquí
    const whatsappUrl = `https://wa.me/5493410000000?text=${formatWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-red-600" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-neutral-900">Tu Pedido</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar bg-neutral-50/30">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400 gap-4 opacity-50">
              <ShoppingBag size={80} strokeWidth={1} />
              <p className="font-black uppercase tracking-widest text-xs italic">El carrito está vacío</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400">Productos Seleccionados</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-3 p-4 bg-white rounded-3xl border border-neutral-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-neutral-100 border border-neutral-50">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-0.5">
                            <div className="flex justify-between items-start">
                                <h4 className="font-black text-sm uppercase tracking-tight text-neutral-900 italic">{item.name}</h4>
                                <span className="text-red-600 font-black text-sm italic">
                                ${(item.price * item.quantity).toLocaleString("es-AR")}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-3 bg-neutral-100 px-3 py-1 rounded-full">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-neutral-500 hover:text-red-600 transition-colors">
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-xs font-black w-4 text-center text-neutral-900">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-neutral-500 hover:text-red-600 transition-colors">
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-[10px] font-black text-neutral-300 hover:text-red-600 uppercase tracking-widest transition-colors"
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Personalización por item */}
                    <div className="pt-2 border-t border-dashed border-neutral-100">
                        <input
                            type="text"
                            placeholder="¿Sacar algún ingrediente? (Ejem: sin cebolla)"
                            value={item.notes}
                            onChange={(e) => updateNotes(item.id, e.target.value)}
                            className="w-full text-[10px] bg-neutral-50 border-none rounded-lg px-3 py-2 text-neutral-600 placeholder:text-neutral-400 focus:ring-1 focus:ring-red-100 outline-none transition-all"
                        />
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Zone Check */}
              <div className="space-y-4 pt-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400">Entrega desde Fisherton</h3>
                <div className="space-y-3 p-5 bg-white rounded-[2rem] border border-neutral-100 shadow-sm relative overflow-hidden">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-red-400" size={18} />
                    <input
                        type="text"
                        placeholder="Tu dirección en Rosario"
                        value={address}
                        onBlur={checkDeliveryZone}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setDeliveryStatus("none");
                        }}
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl pl-10 pr-4 py-3 text-sm focus:border-red-600 outline-none transition-all placeholder:text-neutral-400 text-neutral-900 font-bold"
                    />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {isCheckingDelivery && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            className="flex items-center gap-2 text-neutral-500 text-[10px] font-bold"
                        >
                            <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            CALCULANDO DISTANCIA DESDE BV. ARGENTINO...
                        </motion.div>
                    )}
                    {deliveryStatus === "valid" && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="bg-green-50 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-wider"
                        >
                            <CheckCircle2 size={14} />
                            ¡Llegamos! Delivery desde Bv. Argentino 8012
                        </motion.div>
                    )}
                    {deliveryStatus === "invalid" && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="bg-red-50 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-wider"
                        >
                            <AlertCircle size={14} />
                            Fuera de rango o dirección incompleta
                        </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="mt-2 h-32 bg-neutral-100 rounded-xl overflow-hidden relative shadow-inner border border-neutral-200">
                     <img 
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
                        className="w-full h-full object-cover opacity-80" 
                        alt="Map Rosario" 
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 text-white p-2 rounded-full shadow-lg animate-bounce">
                            <MapPin size={20} />
                        </div>
                     </div>
                     <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest text-neutral-500">
                        Zona: Fisherton, Rosario
                     </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-2 pb-8">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400">¿Cómo pagás?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod("Efectivo")}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                        paymentMethod === "Efectivo" 
                        ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200" 
                        : "bg-white border-neutral-100 text-neutral-400 hover:border-red-100 hover:text-red-400"
                    }`}
                  >
                    <Banknote size={16} />
                    Efectivo
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("Transferencia")}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                        paymentMethod === "Transferencia" 
                        ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200" 
                        : "bg-white border-neutral-100 text-neutral-400 hover:border-red-100 hover:text-red-400"
                    }`}
                  >
                    <CreditCard size={16} />
                    Transferencia
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-neutral-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Tu nombre (para el pedido)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-4 py-4 text-sm font-bold focus:border-red-600 outline-none transition-all placeholder:text-neutral-400 text-neutral-900 italic uppercase"
                />
                
                <div className="flex justify-between items-end mb-2">
                    <span className="text-neutral-400 font-black uppercase tracking-[0.2em] text-[10px] italic">Total del pedido</span>
                    <span className="text-3xl font-black text-red-600 italic tracking-tighter">
                        ${totalPrice.toLocaleString("es-AR")}
                    </span>
                </div>
            </div>
            
            <button
              onClick={handleSendOrder}
              disabled={!customerName || !address || !paymentMethod || deliveryStatus !== "valid"}
              className="w-full flex items-center justify-center gap-4 py-5 bg-neutral-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-red-600 disabled:opacity-30 disabled:hover:bg-neutral-900 transition-all shadow-xl group active:scale-[0.98] italic"
            >
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Pedir por WhatsApp
            </button>
            
            {!customerName && <p className="text-[9px] text-center text-red-400 font-black uppercase tracking-widest">Falta tu nombre</p>}
            {customerName && !address && <p className="text-[9px] text-center text-red-400 font-black uppercase tracking-widest">Falta tu dirección</p>}
            {address && !paymentMethod && <p className="text-[9px] text-center text-red-400 font-black uppercase tracking-widest">Elegí un método de pago</p>}
          </div>
        )}
      </motion.div>
    </div>
  );
};
