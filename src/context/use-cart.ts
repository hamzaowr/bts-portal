import React from "react";
import { CartContext } from "./cart-context";

export const useCart = () => {
  const ctx = React.useContext(CartContext);

  if (!ctx) throw new Error("useCart must be used inside CartProvider");

  return ctx;
};
