export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Burgers" | "Especiales" | "Sandwiches" | "Adicionales" | "Bebidas";
  image: string;
};

export const products: Product[] = [
  // HAMBURGUESAS (Con papas fritas)
  {
    id: "h1",
    name: "Tarragona",
    description: "Pan de papa, Medallón 100g x2, Cheddar, Lechuga, tomate, cebolla morada, Aderezo Tasty. Incluye papas fritas.",
    price: 13500,
    category: "Burgers",
    image: "https://i.imgur.com/lrDxwzN.jpg",
  },
  {
    id: "h2",
    name: "Wilcor",
    description: "Pan de papa, Medallón 100g x2, Aros de cebolla rebozados, Panceta crocante, Aderezo mostaza dulce. Incluye papas fritas.",
    price: 14500,
    category: "Burgers",
    image: "https://i.imgur.com/10uJzet.jpg",
  },
  {
    id: "h3",
    name: "Mostrame Tus Dientes",
    description: "Pan de papa, Medallón 100g x3, Cheddar, Laminas de panceta, Mayonesa, mostaza y kétchup. Incluye papas fritas.",
    price: 15500,
    category: "Burgers",
    image: "https://i.imgur.com/sT10qhk.jpg",
  },
  {
    id: "h4",
    name: "La Ahumada 8013",
    description: "Dos medallones, Cheddar, lardon de panceta, Realish, mayonesa ahumada con ciboullete. Incluye papas fritas.",
    price: 17500,
    category: "Burgers",
    image: "https://i.imgur.com/WIjJvK7.jpg",
  },
  {
    id: "h5",
    name: "Cheese Comadreja",
    description: "Pan de papa, Medallón 100g, Cheddar. Incluye papas fritas.",
    price: 9500,
    category: "Burgers",
    image: "https://i.imgur.com/lrDxwzN.jpg", // Usamos Tarragona como base si no hay foto específica
  },
  {
    id: "h6",
    name: "Veggie",
    description: "Pan de papa, Medallón de garbanzo, hierbas y corazón de provolone, Lechuga, tomate, zanahoria, Alioli. Incluye papas fritas.",
    price: 12500,
    category: "Burgers",
    image: "https://i.imgur.com/7qFIQ5T.jpg",
  },
  {
    id: "h7",
    name: "Box Amiguero",
    description: "2 Wilcor + 2 Tarragona + Papas fritas + Extra Cheddar + Extra Barbacoa.",
    price: 49500,
    category: "Burgers",
    image: "https://i.imgur.com/sT10qhk.jpg",
  },

  // BURGERS ESPECIALES
  {
    id: "e1",
    name: "Patagónica",
    description: "Medallón de cordero 120g, Queso pasta de cabra con menta, Lechuga y Tomate, Hongos y pimiento asado, Aderezo tasty.",
    price: 19500,
    category: "Especiales",
    image: "https://i.imgur.com/A3XoSRj.jpg",
  },
  {
    id: "e2",
    name: "De Barrio",
    description: "Pan de papa, Milanesa de entrecot apanado, Chiminesa, muzzarella y jamón, Lechuga y tomate.",
    price: 17500,
    category: "Especiales",
    image: "https://i.imgur.com/WIjJvK7.jpg",
  },

  // SANDWICHES
  {
    id: "sw1",
    name: "Chicken Boulevard",
    description: "Pan de papa, Tender de pollo x2, Extra muzzarella, Lechuga, tomate, cebolla morada, Aderezo Buffalo. Incluye papas fritas.",
    price: 13500,
    category: "Sandwiches",
    image: "https://i.imgur.com/4rx5wHE.jpg",
  },
  {
    id: "sw2",
    name: "Pulled Pork",
    description: "Pan de papa, Bondiola braseada, Cebolla caramelizada, Extra muzarella, BBQ. Incluye papas fritas.",
    price: 15500,
    category: "Sandwiches",
    image: "https://i.imgur.com/oXgK6F5.jpg",
  },
  {
    id: "sw3",
    name: "Fisher Cheese Steak",
    description: "Pan de papa, Laminas de entrecot, Cebolla caramelizada, Extra cheddar, Extra muzzarella. Incluye papas fritas.",
    price: 15500,
    category: "Sandwiches",
    image: "https://i.imgur.com/WIjJvK7.jpg",
  },

  // ADICIONALES
  {
    id: "ad1",
    name: "Papas Cheddar",
    description: "Porción de papas fritas con extra cheddar.",
    price: 7500,
    category: "Adicionales",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "ad2",
    name: "Papas Fritas",
    description: "Porción de papas fritas clásicas.",
    price: 5500,
    category: "Adicionales",
    image: "https://images.unsplash.com/photo-1630384066242-17a1780ef427?q=80&w=1973&auto=format&fit=crop",
  },
  {
    id: "ad3",
    name: "Aros de Cebolla",
    description: "Porción de aros de cebolla rebozados.",
    price: 8500,
    category: "Adicionales",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=1964&auto=format&fit=crop",
  },

  // BEBIDAS
  {
    id: "d1",
    name: "Gaseosa 500cc",
    description: "Coca Cola o Sprite.",
    price: 2200,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "d2",
    name: "Cerveza Imperial 473cc",
    description: "Lager, Roja o IPA.",
    price: 3500,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: "d3",
    name: "Levite 500cc",
    description: "Limonada, Pera o Pomelo Rosado.",
    price: 2500,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=1887&auto=format&fit=crop",
  },
];
