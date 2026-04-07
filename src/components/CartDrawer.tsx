"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Send, CreditCard, Banknote, MapPin, AlertCircle, CheckCircle2, Store, Truck, Search, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Coordenadas reales de Comadreja Burgers
const LOCAL_LAT = -32.9148;
const LOCAL_LON = -60.7511;
const MAX_DELIVERY_KM = 4; // Radio de entrega real en KM

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, updateQuantity, removeFromCart, updateNotes, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<"envio" | "retiro">("envio");
  const [paymentMethod, setPaymentMethod] = useState<"Efectivo" | "Transferencia" | "">("");
  const [isChecking, setIsChecking] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<"none" | "valid" | "invalid">("none");

  // Calcular distancia real entre dos puntos (KM)
  const calculateDistance = (lat: number, lon: number) => {
    const R = 6371; // Radio de la Tierra
    const dLat = (lat - LOCAL_LAT) * Math.PI / 180;
    const dLon = (lon - LOCAL_LON) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(LOCAL_LAT * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Buscar sugerencias reales mientras escribe
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (address.length > 4 && deliveryMethod === "envio" && deliveryStatus === "none") {
        try {
          const query = encodeURIComponent(`${address}, Rosario, Santa Fe, Argentina`);
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=4&addressdetails=1`);
          const data = await res.json();
          setSuggestions(data);
        } catch (e) { console.error(e); }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [address, deliveryMethod, deliveryStatus]);

  const selectSuggestion = (s: any) => {
    const lat = parseFloat(s.lat);
    const lon = parseFloat(s.lon);
    const distance = calculateDistance(lat, lon);
    
    setAddress(s.display_name.split(",")[0] + ", " + s.display_name.split(",")[1]);
    setSuggestions([]);
    
    if (distance <= MAX_DELIVERY_KM) {
      setDeliveryStatus("valid");
    } else {
      setDeliveryStatus("invalid");
    }
  };

  const formatWhatsAppMessage = () => {
    const itemsText = cart.map(i => `- ${i.quantity}x ${i.name}${i.notes ? ` (SIN: ${i.notes})` : ""}`).join("\n");
    const message = `*NUEVO PEDIDO - COMADREJA*\n\n*Cliente:* ${customerName}\n*Método:* ${deliveryMethod === "envio" ? "ENVÍO" : "RETIRO"}\n${deliveryMethod === "envio" ? `*Dirección:* ${address}\n` : ""}*Pago:* ${paymentMethod}\n\n*Pedido:*\n${itemsText}\n\n*TOTAL:* $${totalPrice.toLocaleString("es-AR")}`;
    return encodeURIComponent(message);
  };

  const handleSendOrder = () => {
    window.open(`https://wa.me/5493410000000?text=${formatWhatsAppMessage()}`, "_blank");
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-red-600" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-neutral-900 italic">Comadreja Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400"><X size={24} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 bg-neutral-50/30">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-300 gap-4 uppercase font-black italic tracking-widest text-xs opacity-50">
                <ShoppingBag size={80} strokeWidth={1} />
                <p>Carrito Vacío</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400 italic">Tus Elegidos</h3>
                {cart.map((item) => (
                  <div key={item.id} className="p-4 bg-white rounded-[2rem] border border-neutral-100 shadow-sm space-y-3">
                    <div className="flex gap-4">
                        <img src={item.image} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                        <div className="flex-grow flex flex-col justify-center">
                            <div className="flex justify-between items-start">
                                <h4 className="font-black text-sm uppercase italic tracking-tighter text-neutral-900">{item.name}</h4>
                                <span className="text-red-600 font-black text-sm">${(item.price * item.quantity).toLocaleString("es-AR")}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-3 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/50">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-neutral-500 hover:text-red-600"><Minus size={12} /></button>
                                    <span className="text-xs font-black text-neutral-900">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-neutral-500 hover:text-red-600"><Plus size={12} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-black text-neutral-300 uppercase hover:text-red-600 transition-colors">Quitar</button>
                            </div>
                        </div>
                    </div>
                    <input 
                      type="text" placeholder="¿Algo que quieras sacarle?" 
                      value={item.notes} onChange={(e) => updateNotes(item.id, e.target.value)}
                      className="w-full text-[10px] bg-neutral-50 border-none rounded-xl px-4 py-2 text-neutral-600 focus:ring-1 focus:ring-red-100 outline-none italic font-medium"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400 italic">¿Cómo te lo damos?</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setDeliveryMethod("envio")} className={`flex flex-col items-center gap-2 py-5 rounded-[2rem] border-2 transition-all ${deliveryMethod === "envio" ? "bg-red-600 border-red-600 text-white shadow-xl shadow-red-100" : "bg-white border-neutral-100 text-neutral-400"}`}>
                        <Truck size={20} /><span className="text-[10px] font-black uppercase italic tracking-widest">A Domicilio</span>
                    </button>
                    <button onClick={() => setDeliveryMethod("retiro")} className={`flex flex-col items-center gap-2 py-5 rounded-[2rem] border-2 transition-all ${deliveryMethod === "retiro" ? "bg-red-600 border-red-600 text-white shadow-xl shadow-red-100" : "bg-white border-neutral-100 text-neutral-400"}`}>
                        <Store size={20} /><span className="text-[10px] font-black uppercase italic tracking-widest">Retiro Local</span>
                    </button>
                </div>
              </div>

              {deliveryMethod === "envio" && (
                <div className="space-y-4">
                  <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400 italic">Dirección en Rosario</h3>
                  <div className="relative">
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-4 text-red-500 z-10" size={18} />
                        <input 
                            type="text" placeholder="Escribí tu calle y altura..." 
                            value={address} onChange={(e) => { setAddress(e.target.value); setDeliveryStatus("none"); }}
                            className="w-full bg-white border-2 border-neutral-100 rounded-3xl pl-12 pr-4 py-4 text-sm font-bold focus:border-red-600 outline-none transition-all shadow-sm"
                        />
                    </div>
                    
                    <AnimatePresence>
                        {suggestions.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden divide-y divide-neutral-50">
                                {suggestions.map((s, i) => (
                                    <button key={i} onClick={() => selectSuggestion(s)} className="w-full px-6 py-4 text-left hover:bg-red-50 transition-colors flex items-center gap-3">
                                        <Navigation size={14} className="text-red-400" />
                                        <span className="text-xs font-bold text-neutral-700 truncate">{s.display_name}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-3">
                        {deliveryStatus === "valid" && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase italic border border-green-100">
                                <CheckCircle2 size={16} /> ¡Llegamos! Estás en zona Fisherton
                            </div>
                        )}
                        {deliveryStatus === "invalid" && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase italic border border-red-100">
                                <AlertCircle size={16} /> Fuera de rango (Max 4km desde el local)
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              )}

              {deliveryMethod === "retiro" && (
                  <div className="p-6 bg-red-600 rounded-[2.5rem] text-white shadow-xl shadow-red-100 flex items-center gap-5">
                    <div className="bg-white/20 p-3 rounded-2xl"><Store size={24} /></div>
                    <div>
                        <h4 className="font-black uppercase italic tracking-tighter">Retiro en Comadreja</h4>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Bv. Argentino 8012, Fisherton</p>
                    </div>
                  </div>
              )}

              <div className="space-y-4 pb-12">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400 italic">¿Cómo pagás?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setPaymentMethod("Efectivo")} className={`py-4 rounded-[2rem] border-2 font-black uppercase text-[10px] tracking-widest transition-all ${paymentMethod === "Efectivo" ? "bg-black border-black text-white shadow-xl" : "bg-white border-neutral-100 text-neutral-400"}`}>Efectivo</button>
                  <button onClick={() => setPaymentMethod("Transferencia")} className={`py-4 rounded-[2rem] border-2 font-black uppercase text-[10px] tracking-widest transition-all ${paymentMethod === "Transferencia" ? "bg-black border-black text-white shadow-xl" : "bg-white border-neutral-100 text-neutral-400"}`}>Transferencia</button>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-white border-t border-neutral-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-4 rounded-t-[3rem]">
            <input 
              type="text" placeholder="TU NOMBRE COMPLETO" 
              value={customerName} onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm font-black focus:ring-2 focus:ring-red-600 outline-none text-neutral-900 placeholder:text-neutral-400 italic"
            />
            <div className="flex justify-between items-end mb-2">
                <span className="text-neutral-400 font-black uppercase text-[10px] italic tracking-widest">TOTAL A PAGAR</span>
                <span className="text-4xl font-black text-red-600 italic tracking-tighter">${totalPrice.toLocaleString("es-AR")}</span>
            </div>
            <button 
              onClick={handleSendOrder}
              disabled={!customerName || (deliveryMethod === "envio" && deliveryStatus !== "valid") || !paymentMethod}
              className="w-full py-5 bg-red-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] italic text-sm hover:bg-black transition-all shadow-2xl shadow-red-100 disabled:opacity-20"
            >
              Pedir Ahora
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
