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
    name: "Classic Burger",
    description: "Beef patty, cheddar cheese, lettuce, tomato, and special sauce on a brioche bun.",
    price: 8500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
  },
  {
    id: "b2",
    name: "Double Cheese",
    description: "Two beef patties, double cheddar cheese, onions, and pickles.",
    price: 10500,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: "b3",
    name: "Bacon Delight",
    description: "Beef patty, crispy bacon, cheddar, and BBQ sauce.",
    price: 11000,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "s1",
    name: "French Fries",
    description: "Classic crispy golden fries.",
    price: 3500,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "s2",
    name: "Onion Rings",
    description: "Crispy battered onion rings.",
    price: 4000,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "d1",
    name: "Coca Cola",
    description: "500ml bottle.",
    price: 2500,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "d2",
    name: "Water",
    description: "Sparkling or Still.",
    price: 2000,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "c1",
    name: "Mega Combo",
    description: "Classic Burger + Fries + Drink.",
    price: 12000,
    category: "Combos",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop",
  },
];
