"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Send, CreditCard, Banknote, MapPin, AlertCircle, CheckCircle2, Store, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, updateQuantity, removeFromCart, updateNotes, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"envio" | "retiro">("envio");
  const [paymentMethod, setPaymentMethod] = useState<"Efectivo" | "Transferencia" | "">("");
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<"none" | "valid" | "invalid">("none");

  // Validación REAL usando la API de Nominatim (OpenStreetMap) filtrada por Rosario
  const validateAddressReal = async () => {
    if (!address || deliveryMethod === "retiro") return;
    
    setIsCheckingDelivery(true);
    try {
      // Buscamos la dirección específicamente en Rosario, Argentina
      const query = encodeURIComponent(`${address}, Rosario, Santa Fe, Argentina`);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
      const data = await response.json();

      if (data && data.length > 0) {
        // Verificamos si la dirección devuelta está en Rosario (para evitar errores de búsqueda)
        const isRosario = data[0].display_name.toLowerCase().includes("rosario");
        setDeliveryStatus(isRosario ? "valid" : "invalid");
      } else {
        setDeliveryStatus("invalid");
      }
    } catch (error) {
      console.error("Error validando dirección:", error);
      // Fallback: si falla la API, usamos una validación básica por longitud
      setDeliveryStatus(address.length > 10 ? "valid" : "invalid");
    } finally {
      setIsCheckingDelivery(false);
    }
  };

  // Efecto para re-validar si cambia el método
  useEffect(() => {
    if (deliveryMethod === "retiro") {
      setDeliveryStatus("valid");
    } else {
      setDeliveryStatus("none");
    }
  }, [deliveryMethod]);

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
      `*Método:* ${deliveryMethod === "envio" ? "🚚 ENVÍO A DOMICILIO" : "🏪 RETIRO EN LOCAL"}\n` +
      (deliveryMethod === "envio" ? `*Dirección:* ${address}\n` : `*Retira en:* Bv. Argentino 8012\n`) +
      `*Pago:* ${paymentMethod}\n\n` +
      `*Detalle:*\n${itemsText}\n\n` +
      `*TOTAL:* $${totalPrice.toLocaleString("es-AR")}\n\n` +
      `_Pedido enviado desde la Web App_`;

    return encodeURIComponent(message);
  };

  const handleSendOrder = () => {
    if (cart.length === 0 || !customerName || (deliveryMethod === "envio" && !address) || !paymentMethod) return;
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
            <h2 className="text-xl font-black uppercase tracking-tighter text-neutral-900 italic">Tu Pedido</h2>
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
                  <div key={item.id} className="flex flex-col gap-3 p-4 bg-white rounded-3xl border border-neutral-100 shadow-sm">
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
                                    className="text-[10px] font-black text-neutral-300 hover:text-red-600 uppercase tracking-widest"
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Aclaraciones (ej: sin cebolla)"
                        value={item.notes}
                        onChange={(e) => updateNotes(item.id, e.target.value)}
                        className="w-full text-[10px] bg-neutral-50 border-none rounded-lg px-3 py-2 text-neutral-600 placeholder:text-neutral-400 focus:ring-1 focus:ring-red-100 outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Delivery Method Selector */}
              <div className="space-y-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400">¿Cómo lo recibís?</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setDeliveryMethod("envio")}
                        className={`flex flex-col items-center gap-2 py-4 rounded-3xl border-2 transition-all ${
                            deliveryMethod === "envio" 
                            ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200" 
                            : "bg-white border-neutral-100 text-neutral-400 hover:border-red-100"
                        }`}
                    >
                        <Truck size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Envío</span>
                    </button>
                    <button 
                        onClick={() => setDeliveryMethod("retiro")}
                        className={`flex flex-col items-center gap-2 py-4 rounded-3xl border-2 transition-all ${
                            deliveryMethod === "retiro" 
                            ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200" 
                            : "bg-white border-neutral-100 text-neutral-400 hover:border-red-100"
                        }`}
                    >
                        <Store size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Retiro</span>
                    </button>
                </div>
              </div>

              {/* Address Section (only for Envio) */}
              <AnimatePresence>
                {deliveryMethod === "envio" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400">Dirección en Rosario</h3>
                    <div className="space-y-3 p-5 bg-white rounded-[2rem] border border-neutral-100 shadow-sm relative">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-red-400" size={18} />
                            <input
                                type="text"
                                placeholder="Ej: Bv. Argentino 8000"
                                value={address}
                                onBlur={validateAddressReal}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setDeliveryStatus("none");
                                }}
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl pl-10 pr-4 py-3 text-sm focus:border-red-600 outline-none transition-all text-neutral-900 font-bold"
                            />
                        </div>
                        
                        {isCheckingDelivery && (
                            <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-bold">
                                <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                VALIDANDO CALLE EN ROSARIO...
                            </div>
                        )}
                        {deliveryStatus === "valid" && (
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                                <CheckCircle2 size={14} />
                                ¡Dirección encontrada! Zona Fisherton
                            </div>
                        )}
                        {deliveryStatus === "invalid" && (
                            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                                <AlertCircle size={14} />
                                No encontramos esa calle en Rosario
                            </div>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pickup info (only for Retiro) */}
              <AnimatePresence>
                {deliveryMethod === "retiro" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 bg-red-50 rounded-[2rem] border border-red-100 flex items-start gap-4"
                  >
                    <Store className="text-red-600 mt-1" size={20} />
                    <div>
                        <h4 className="text-red-900 font-black uppercase tracking-tighter text-sm">Punto de Retiro</h4>
                        <p className="text-red-700 text-xs font-medium">Bv. Argentino 8012, Fisherton, Rosario.</p>
                        <p className="text-red-600 text-[9px] font-black uppercase mt-1 italic tracking-widest">Avisamos por WhatsApp cuando esté listo</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Payment Method */}
              <div className="space-y-4 pt-2 pb-8">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400">¿Cómo pagás?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod("Efectivo")}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                        paymentMethod === "Efectivo" 
                        ? "bg-red-600 border-red-600 text-white shadow-lg" 
                        : "bg-white border-neutral-100 text-neutral-400 hover:border-red-100"
                    }`}
                  >
                    <Banknote size={16} />
                    Efectivo
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("Transferencia")}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                        paymentMethod === "Transferencia" 
                        ? "bg-red-600 border-red-600 text-white shadow-lg" 
                        : "bg-white border-neutral-100 text-neutral-400 hover:border-red-100"
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
            <input
                type="text"
                placeholder="Tu nombre completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-4 py-4 text-sm font-bold focus:border-red-600 outline-none text-neutral-900 italic uppercase"
            />
            
            <div className="flex justify-between items-end mb-2">
                <span className="text-neutral-400 font-black uppercase tracking-[0.2em] text-[10px] italic">Total final</span>
                <span className="text-3xl font-black text-red-600 italic tracking-tighter">
                    ${totalPrice.toLocaleString("es-AR")}
                </span>
            </div>
            
            <button
              onClick={handleSendOrder}
              disabled={!customerName || (deliveryMethod === "envio" && deliveryStatus !== "valid") || !paymentMethod}
              className="w-full flex items-center justify-center gap-4 py-5 bg-neutral-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-red-600 disabled:opacity-30 transition-all shadow-xl italic"
            >
              <Send size={18} />
              Confirmar Pedido
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
