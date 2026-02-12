import type { CartItems } from "./definitions";
import { calculateBoxes } from "./shipping";

export const getTotalBoxes = (items: CartItems[]): number =>
  items.reduce((sum, item) => sum + calculateBoxes(item), 0);
