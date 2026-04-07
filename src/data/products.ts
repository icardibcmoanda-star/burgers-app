export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Burgers" | "Sides" | "Drinks" | "Combos";
  image: string;
};

export const products: Product[] = [
  {
    id: "b1",
    name: "Black Truffle",
    description: "Medallón doble, queso cheddar, chutney de portobello, panceta crocante y lactonesa trufada en pan brioche.",
    price: 14500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
  },
  {
    id: "b2",
    name: "Biggie Burger",
    description: "Triple medallón, doble cheddar, pepino, lechuga, cebolla morada, panceta y mayonesa ahumada.",
    price: 13500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: "b3",
    name: "Honey Bastard",
    description: "Doble medallón, muzzarella, coleslaw, honey mustard y aros de cebolla.",
    price: 12500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "b4",
    name: "Classic Cheese",
    description: "Doble medallón de carne, doble cheddar, cebolla y aderezo Roses.",
    price: 10500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1780&auto=format&fit=crop",
  },
  {
    id: "s1",
    name: "Papas Roses",
    description: "Papas fritas con triple cheddar, panceta crocante y verdeo.",
    price: 6500,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "s2",
    name: "Onion Rings",
    description: "Aros de cebolla súper crocantes con salsa BBQ.",
    price: 5500,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "d1",
    name: "Coca Cola",
    description: "Sabor original 500ml.",
    price: 2500,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "d2",
    name: "Sprite",
    description: "Lima limón 500ml.",
    price: 2500,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "c1",
    name: "Combo Black Truffle",
    description: "Black Truffle + Papas Fritas + Bebida.",
    price: 18500,
    category: "Combos",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "c2",
    name: "Combo Biggie",
    description: "Biggie Burger + Papas Fritas + Bebida.",
    price: 17500,
    category: "Combos",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2000&auto=format&fit=crop",
  },
];
