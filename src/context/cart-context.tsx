import React from "react";
import type { CartItems } from "@/lib/definitions";
import { loadFromStorage, saveToLocalStorage } from "@/lib/storage";

const CART_KEY = "rental-cart";
const STATE_KEY = "shipping-state";
const DATES_KEY = "rental-dates";

interface CartContextValue {
  items: CartItems[];
  addItem: (item: Omit<CartItems, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = React.useState<CartItems[]>(() =>
    loadFromStorage<CartItems[]>(CART_KEY, []),
  );
  const [selectedState, setSelectedStateState] = React.useState<string>(
    loadFromStorage<string>(STATE_KEY, ""),
  );

  const setSelectedState = (state: string) => {
    setSelectedStateState(state);
    localStorage.setItem(STATE_KEY, state);
  };

  React.useEffect(() => {
    saveToLocalStorage(CART_KEY, items);
    saveToLocalStorage(STATE_KEY, selectedState);
  }, [items, selectedState]);

  const addItem = (item: Omit<CartItems, "id">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.title === item.title && i.type === item.type,
      );

      if (existing) {
        return prev.map((i) =>
          i.id === existing.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }

      return [...prev, { ...item, id: crypto.randomUUID() }];
    });
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    );

  const clearCart = () => {
    setItems([]);
    setSelectedStateState("");
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(STATE_KEY);
    localStorage.removeItem(DATES_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        removeItem,
        updateQuantity,
        addItem,
        setSelectedState,
        selectedState,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
