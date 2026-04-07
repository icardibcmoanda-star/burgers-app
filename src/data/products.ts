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
    image: "https://i.imgur.com/Tarragona.jpg",
  },
  {
    id: "h2",
    name: "Wilcor",
    description: "Pan de papa, Medallón 100g x2, Aros de cebolla rebozados, Panceta crocante, Aderezo mostaza dulce. Incluye papas fritas.",
    price: 14500,
    category: "Burgers",
    image: "https://i.imgur.com/Wilcor.jpg",
  },
  {
    id: "h3",
    name: "Mostrame Tus Dientes",
    description: "Pan de papa, Medallón 100g x3, Cheddar, Laminas de panceta, Mayonesa, mostaza y kétchup. Incluye papas fritas.",
    price: 15500,
    category: "Burgers",
    image: "https://i.imgur.com/MostrameTusDientes.jpg",
  },
  {
    id: "h4",
    name: "La Ahumada 8013",
    description: "Dos medallones, Cheddar, lardon de panceta, Realish, mayonesa ahumada con ciboullete. Incluye papas fritas.",
    price: 17500,
    category: "Burgers",
    image: "https://i.imgur.com/LaAhumada8013.jpg",
  },
  {
    id: "h5",
    name: "Cheese Comadreja",
    description: "Pan de papa, Medallón 100g, Cheddar. Incluye papas fritas.",
    price: 9500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "h6",
    name: "Veggie",
    description: "Pan de papa, Medallón de garbanzo, hierbas y corazón de provolone, Lechuga, tomate, zanahoria, Alioli. Incluye papas fritas.",
    price: 12500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=1780&auto=format&fit=crop",
  },
  {
    id: "h7",
    name: "Box Amiguero",
    description: "2 Wilcor + 2 Tarragona + Papas fritas + Extra Cheddar + Extra Barbacoa.",
    price: 49500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop",
  },

  // BURGERS ESPECIALES
  {
    id: "e1",
    name: "Patagónica",
    description: "Medallón de cordero 120g, Queso pasta de cabra con menta, Lechuga y Tomate, Hongos y pimiento asado, Aderezo tasty.",
    price: 19500,
    category: "Especiales",
    image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "e2",
    name: "De Barrio",
    description: "Pan de papa, Milanesa de entrecot apanado, Chiminesa, muzzarella y jamón, Lechuga y tomate.",
    price: 17500,
    category: "Especiales",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop",
  },

  // SANDWICHES
  {
    id: "sw1",
    name: "Chicken Boulevard",
    description: "Pan de papa, Tender de pollo x2, Extra muzzarella, Lechuga, tomate, cebolla morada, Aderezo Buffalo. Incluye papas fritas.",
    price: 13500,
    category: "Sandwiches",
    image: "https://i.imgur.com/ChickenBoulevard.jpg",
  },
  {
    id: "sw2",
    name: "Pulled Pork",
    description: "Pan de papa, Bondiola braseada, Cebolla caramelizada, Extra muzarella, BBQ. Incluye papas fritas.",
    price: 15500,
    category: "Sandwiches",
    image: "https://i.imgur.com/PulledPork.jpg",
  },
  {
    id: "sw3",
    name: "Fisher Cheese Steak",
    description: "Pan de papa, Laminas de entrecot, Cebolla caramelizada, Extra cheddar, Extra muzzarella. Incluye papas fritas.",
    price: 15500,
    category: "Sandwiches",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=2076&auto=format&fit=crop",
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
